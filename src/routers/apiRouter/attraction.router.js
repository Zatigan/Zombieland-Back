import { Router } from "express";

import * as attractionsController from "../../controllers/apiControllers/attraction.controller.js";
import { controllerWrapper as cw } from "./controller-wrapper.js";

export const router = Router();

router.get("/attractions", cw(attractionsController.getAllAttractions));
router.get("/attractions/:categoryId", cw(attractionsController.getAttractionByCategory));

