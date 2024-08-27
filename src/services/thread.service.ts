import { Request } from "express";
import { thread } from "../repositories";

export const service = {
    list: async () => {
        const result = await thread.repository.getAll();

        return result;
    },

    create: async (req: Request) => {
        return await thread.repository.create(req.body);
    }
}