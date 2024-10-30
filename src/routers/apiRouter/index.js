import { Router } from "express";
import { router as attractionsRouter} from "./attraction.router.js"

export const router = Router();

router.use(attractionsRouter);
