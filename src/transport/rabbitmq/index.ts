import { rabbitmq } from "../../utils";


// Create new connection
// Start to listening channel
export async function startListenMessage() {
    try {
        const conn = await rabbitmq.newConnection();

        // Listen to channel
        await rabbitmq.listenTo(conn, "enrichUserThreadData", (msg) => { console.log(msg.content.toString()) })

        await rabbitmq.listenTo(conn, "updateUserData", (msg) => { console.log(msg.content.toString()) })

    } catch (error) {
        throw error;
    }
}