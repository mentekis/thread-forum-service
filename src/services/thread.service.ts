import { Request } from "express";
import { thread } from "../repositories";
import { threadRequest } from "../dto/thread.dto";
import { IUser } from "../dto/user.dto";
import { userService } from "./user.service";

export const service = {
    list: async () => {
        const result = await thread.repository.getAll();

        return result;
    },

    create: async (data: threadRequest, user: IUser) => {
        // Find user by ID
        // Create user if not exists
        // Use user service
        // Communicate with other data using servicem not repository
        let currentUser = await userService.findById(user._id);

        if (!currentUser) {
            currentUser = await userService.create(user._id, user.name);
        }

        return await thread.repository.create(data);
    }
}