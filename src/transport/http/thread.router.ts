import { Router } from "express";
import { thread } from "../../controllers";

export const threadRouter = Router();

threadRouter.get("/", thread.controller.list);
threadRouter.post("/", thread.controller.create);
threadRouter.patch("/:id");
