import { Router } from "express";
import { router as attractionsRouter} from "./attraction.router.js"
import { router as categoryRouter} from "./category.router.js"

export const router = Router();

router.use(categoryRouter);
router.use(attractionsRouter);
