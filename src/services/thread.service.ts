import { Request } from "express";
import { thread } from "../repositories";
import { threadRequest } from "../dto/thread.dto";
import { IUser } from "../dto/user.dto";

export const service = {
    list: async () => {
        const result = await thread.repository.getAll();

        return result;
    },

    create: async (data: threadRequest, user: IUser) => {
        // Find user by ID
        // Create user if not exists
        // Logic here...

        return await thread.repository.create(data);
    }
}