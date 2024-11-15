import { Router } from "express";
import { isAdmin } from "../../middleware/isAdmin.js";
import * as attractionsController from "../../controllers/adminControllers/attraction.controller.js";
import imageUpload from "./multer.config.js";
import { controllerWrapper as cw } from "./controller.wrapper.js";

export const router = Router();

router.get("/attractions", isAdmin, cw(attractionsController.attractionPage))
router.get("/attractions/add", isAdmin, cw(attractionsController.addAttractionPage))
router.post("/attractions/add", isAdmin, imageUpload, cw(attractionsController.addAttraction))
router.post("/attractions/del/:id", isAdmin, cw(attractionsController.delAttraction))
router.get("/attractions/:id", isAdmin, cw(attractionsController.getOneAttraction))
router.post("/attractions/:id", isAdmin, imageUpload, cw(attractionsController.updateAttraction))