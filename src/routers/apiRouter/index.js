import { Router } from "express";
import {router as attractionRouter} from"./attraction.router.js"

export const router = Router();

router.use(attractionRouter);