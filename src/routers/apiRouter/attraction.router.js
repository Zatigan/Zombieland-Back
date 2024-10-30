import { Router } from "express";

import * as attractionsController from "../../controllers/apiControllers/attraction.controller.js";
import { controllerWrapper as cw } from "./controller-wrapper.js";

export const router = Router();

router.get("/attractions", cw(attractionsController.getAllAttractions));
router.get('/attractions/random', cw(attractionsController.getThreeRandomAttractions));
router.get("/attractions/:id", cw(attractionsController.getOneAttraction));
router.get("/attractions/category/:id", cw(attractionsController.getAttractionByCategory));
/*router.get("attractions/login, cw(je-sais-pas-encore.getLoggedIn));*/