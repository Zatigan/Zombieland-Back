import { Router } from "express";
import { router as attractionsRouter} from "./attraction.router.js"
import { router as categoryRouter} from "./category.router.js"
import { router as reservationRouter} from "./reservation.router.js"

export const router = Router();

router.use(categoryRouter);
router.use(reservationRouter);
router.use(attractionsRouter);
