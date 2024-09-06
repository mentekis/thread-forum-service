import { Request, Response } from "express";
import { thread } from "../services";
import { responseGenerator } from "../utils";

const controller = {
    list: async (req: Request, res: Response) => {
        try {
            const result = await thread.service.list();
            console.log("list thread", result);

            const response = thread.service.mapThreadsResponse(result);

            return responseGenerator.generatedResponse(res, { data: response });
        } catch (error) {
            const issue = (error as Error).message;

            return responseGenerator.generatedResponse(res, { status: 400, message: issue });
        }
    },

    create: async (req: Request, res: Response) => {
        try {
            // Get data from request
            const { title, body } = req.body;

            // Get user ID from locals
            const user = res.locals.user;

            const result = await thread.service.create({
                body,
                title,
                userId: user._id
            }, user);

            const response = thread.service.mapSingleThreadResponse(result);

            return responseGenerator.generatedResponse(res, { data: response });
        } catch (error) {
            const issue = (error as Error).message;

            return responseGenerator.generatedResponse(res, { status: 400, message: issue });
        }
    }
}

export { controller };