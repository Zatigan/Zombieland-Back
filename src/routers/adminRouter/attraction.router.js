import { Router } from "express";
import * as attractionsRouter from "../../controllers/adminControllers/attraction.controller.js";

export const router = Router();

router.get("/attractions", attractionsRouter.attractionPage)
router.get("/attractions/:id", attractionsRouter.getOneAttraction)