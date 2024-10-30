import { Router } from "express";


import * as categoryController from "../../controllers/apiControllers/category.controller.js";

import { controllerWrapper as cw } from "./controller-wrapper.js";

export const router = Router();

router.get("/attractions/categories", cw(categoryController.getAllCategories));