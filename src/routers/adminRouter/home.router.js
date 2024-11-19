import { Router } from "express";
import { isAdmin } from "../../middleware/isAdmin.js";
import * as homeController from "../../controllers/adminControllers/home.controller.js";
import { controllerWrapper as cw } from "./controller.wrapper.js";

export const router = Router();

/*router.get("/", (req, res) => {
  res.render("home")
});*/

router.get("/", isAdmin, cw(homeController.displayHomePage));
