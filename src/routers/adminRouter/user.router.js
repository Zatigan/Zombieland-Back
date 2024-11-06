import { Router } from "express";
import * as usersController from "../../controllers/adminControllers/user.controller.js";
import { controllerWrapper as cw } from "./controller.wrapper.js";

export const router = Router();

router.get("/users", cw(usersController.userPage));
router.get("/users/add", cw(usersController.addUserPage));
router.post("/users/add", cw(usersController.addUser));
router.get("/users/:id", cw(usersController.getOneUser));
router.post("/users/del/:id", cw(usersController.delUser));