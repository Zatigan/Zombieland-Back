import { Router } from "express";
import * as attractionsController from "../../controllers/adminControllers/attraction.controller.js";
import imageUpload from "./multer.config.js";
import { controllerWrapper as cw } from "./controller.wrapper.js";

export const router = Router();

router.get("/attractions", cw(attractionsController.attractionPage))
router.get("/attractions/add", cw(attractionsController.addAttractionPage))
router.post("/attractions/add", imageUpload, cw(attractionsController.addAttraction))
router.post("/attractions/del/:id", imageUpload, cw(attractionsController.delAttraction))
router.get("/attractions/:id", cw(attractionsController.getOneAttraction))