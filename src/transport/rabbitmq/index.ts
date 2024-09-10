import { IUser } from "../../dto/user.dto";
import { thread, userService } from "../../services";
import { rabbitmq } from "../../utils";


// Create new connection
// Start to listening channel
export async function startListenMessage() {
    // Listen to channel
    await rabbitmq.listenTo("enrichUserThreadData", (msg) => { console.log(msg.content.toString()) })

    await rabbitmq.listenTo("updateUserData", async (msg) => {
        // Decode the data from message to object
        const user: IUser = JSON.parse(msg.content.toString());

        // Update data using user service
        await userService.update(user?._id, user?.name);
    });

    await rabbitmq.listenTo("newNotificationReply", async (msg) => {
        // Decode data
        const { threadId } = JSON.parse(msg.content.toString());

        // Get thread title by threadID to enrich the new reply event
        const data = await thread.service.findById(threadId);

        // return nothing if no data found
        if (data == null) {
            return;
        }

        // Emit event to enrich data for notification
        // Only send thread title
        await rabbitmq.emitEventTo("enrichThreadNotifData", {
            threadId: data._id,
            title: data.title,
        });

    })
}