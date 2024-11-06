import { Router } from "express";
import * as attractionsRouter from "../../controllers/adminControllers/attraction.controller.js";
import imageUpload from "./multer.config.js";


export const router = Router();

router.get("/attractions", attractionsRouter.attractionPage)
router.get("/attractions/add", attractionsRouter.addAttractionPage)
router.post("/attractions/add", imageUpload, attractionsRouter.addAttraction)
router.post("/attractions/del/:id", imageUpload, attractionsRouter.delAttraction)
router.get("/attractions/:id", attractionsRouter.getOneAttraction)