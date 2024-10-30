import { Router } from "express";
import * as attractionController from "../../controllers/apiControllers/attraction.controller.js"

export const router = Router();

router.get ("/attractions", attractionController.getAllAttractions);
