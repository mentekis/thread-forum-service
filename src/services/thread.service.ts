import { Request } from "express";
import { thread } from "../repositories";
import { threadRequest } from "../dto/thread.dto";
import { IUser } from "../dto/user.dto";
import { userService } from "./user.service";
import { z } from "zod";

// Thread validation
const threadValidatorSchema = z.object({
    title: z.string().min(5, { message: "Minimum thread title is 5 character" }),
    body: z.string().min(8, { message: "Minimum thread is 8 character" })
})

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

        // Validate request
        const validated = threadValidatorSchema.safeParse(data);

        if (!validated.success) {
            throw new Error(validated.error.errors.at(0)?.message)
            return;
        }

        return await thread.repository.create(data);
    }
} 