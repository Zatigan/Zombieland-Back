import { Router } from "express";

import * as reservationController from "../../controllers/apiControllers/reservation.controller.js";
import { controllerWrapper as cw } from "./controller-wrapper.js";


export const router = Router();

router.get("/reservation", cw(reservationController.getReservationPage));
router.post("/reservation", cw(reservationController.addReservation));