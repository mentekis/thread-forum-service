import { threadRequest } from "../dto/thread.dto";
import { Thread } from "./models"

export const repository = {
    getAll: async () => {
        const result = await Thread.find().populate("user");

        return result;
    },

    findById: async (id: string) => {
        return await Thread.findById(id).populate("user");
    },

    create: async (data: threadRequest) => {
        const notification = new Thread(data);

        return (await notification.save()).populate("user");
    },

    update: async (id: string, data: threadRequest) => {
        return await Thread.findByIdAndUpdate(id, data);
    },
}