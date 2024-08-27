import { threadRequest } from "../dto/thread.dto";
import { Thread } from "./models"

export const repository = {
    getAll: async () => {
        const result = await Thread.entity.find();

        return result;
    },

    findById: async (id: string) => {
        return await Thread.entity.findById(id);
    },

    create: async (data: threadRequest) => {
        const notification = new Thread.entity(data)

        return await notification.save();
    },

    update: async (id: string, data: threadRequest) => {
        return await Thread.entity.findByIdAndUpdate(id, data);
    },
}