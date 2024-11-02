import { Router } from "express";
import { controllerWrapper as cw } from "./controller-wrapper.js";
import * as userRouter from "../../controllers/apiControllers/users.controller.js"
import userLoggedIn from "../../middleware/userLoggedIn.js";

export const router = Router();

router.get("/profile", userLoggedIn, cw(userRouter.myProfile));
router.get("/user", cw(userRouter.getAllUsers));
router.get("/user/:id", cw(userRouter.getOneUser));