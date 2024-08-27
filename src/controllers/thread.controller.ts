import { Request, Response } from "express";
import { thread } from "../services";
import { responseGenerator } from "../utils";

const controller = {
    list: async (req: Request, res: Response) => {
        try {
            const result = await thread.service.list();

            return responseGenerator.generatedResponse(res, { data: result });
        } catch (error) {
            const issue = (error as Error).message;

            return responseGenerator.generatedResponse(res, { status: 400, message: issue });
        }
    },

    create: async (req: Request, res: Response) => {
        try {
            const result = await thread.service.create(req);

            return responseGenerator.generatedResponse(res, { data: result });
        } catch (error) {
            const issue = (error as Error).message;

            return responseGenerator.generatedResponse(res, { status: 400, message: issue });
        }
    }
}

export { controller };