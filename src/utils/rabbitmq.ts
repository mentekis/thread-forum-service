import amqplib from 'amqplib'
import { env } from './env'

type TQueueList =
    "newThread" |
    "enrichUserThreadData" |
    "updateUserData" |
    "newReply" |
    "enrichThreadNotifData"
    ;

let connection: amqplib.Connection | null = null;

export async function newConnection() {
    try {
        // Create new connection
        const conn = await amqplib.connect(env.RABBITMQ_URI);

        return conn;

    } catch (error) {
        console.log("Error connect to message broker : ", error);

        throw error;
    }
}

export async function listenTo(queue: TQueueList, duty: (msg: amqplib.Message) => void) {
    try {
        // Create new channel fro connection
        // Create new connection if caller use null connection
        if (connection == null) {
            connection = await newConnection();
        }

        const chan = await connection.createChannel();
        chan.assertQueue(queue)

        chan.consume(queue, (msg) => {
            if (msg !== null) {
                console.log(`message received : `, msg.content.toString())

                duty(msg);

                chan.ack(msg);
            } else {
                console.log("Consumer cancelled by server");
            }
        })
    } catch (error) {
        console.log(`Error consuming channel : ${queue} : `, error)
    }
}

export async function emitEventTo(queue: TQueueList, data: string) {
    try {
        // Create connection if no connection provided
        if (connection == null) {
            connection = await newConnection();
        }

        // Create sender channel
        const sendChan = await connection.createChannel();

        sendChan.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
    } catch (error) {
        console.log(`Emit process ${queue} failed`, error)
    }
}
