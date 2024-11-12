import { Router } from "express";
import { controllerWrapper as cw } from "./controller-wrapper.js";
import * as authRouter from "../../controllers/apiControllers/auth.controller.js"

export const router = Router();

router.post("/signup", cw(authRouter.createUser));
router.post("/login", cw(authRouter.loginUser));
router.post("/lostpassword", cw(authRouter.lostPassword));