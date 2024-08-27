import { Router } from "express";
import { thread } from "../../controllers";
import { jwtMiddleware } from "../../middleware/jwt-auth.middleware";

export const threadRouter = Router();

threadRouter.get("/", thread.controller.list);
threadRouter.post("/", jwtMiddleware, thread.controller.create);
threadRouter.patch("/:id");
