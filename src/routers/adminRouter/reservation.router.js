import { Router } from "express";
import * as reservationController from '../../controllers/adminControllers/reservation.controller.js';
import { isAdmin } from "../../middleware/isAdmin.js";
import { controllerWrapper as cw } from "./controller.wrapper.js";

export const router = Router();

router.get("/reservations", cw(reservationController.reservationPage))
router.get("/reservations/:id", cw (reservationController.getOneReservation))
router.post("/reservations/:id", cw(reservationController.updateReservation))