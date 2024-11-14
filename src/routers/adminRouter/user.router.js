import { Router } from "express";
import { isAdmin } from "../../middleware/isAdmin.js";
import * as usersController from "../../controllers/adminControllers/user.controller.js";
import { controllerWrapper as cw } from "./controller.wrapper.js";

export const router = Router();

router.get("/users", isAdmin, cw(usersController.userPage));
router.get("/users/add", isAdmin, cw(usersController.addUserPage));
router.post("/users/add", isAdmin, cw(usersController.addUser));
router.get("/users/:id", isAdmin, cw(usersController.getOneUser));
router.post("/users/del/:id", isAdmin, cw(usersController.delUser));
router.post("/users/:id", isAdmin, cw(usersController.updateUser));