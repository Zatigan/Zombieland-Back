import { Router } from "express";
import { controllerWrapper as cw } from "./controller-wrapper.js";
import * as userRouter from "../../controllers/apiControllers/users.controller.js"

export const router = Router();

router.get("/user", cw(userRouter.getAllUsers));
router.post("/signup", cw(userRouter.createUser));
/* router.post("/signin", cw(userRouter.createUser)); */
router.get("/user/:id", cw(userRouter.getOneUser));