import { Router } from "express";
import * as reservationController from '../../controllers/adminControllers/reservation.controller.js';
import { isAdmin } from "../../middleware/isAdmin.js";
import { controllerWrapper as cw } from "./controller.wrapper.js";

export const router = Router();

router.get("/reservations",isAdmin, cw(reservationController.reservationPage))
router.get("/reservations/add",isAdmin, cw(reservationController.addReservationPage))
router.post("/reservations/add",isAdmin, cw(reservationController.addReservation))
router.get("/reservations/:id",isAdmin, cw (reservationController.getOneReservation))
router.post("/reservations/:id",isAdmin, cw(reservationController.updateReservation))
router.post("/reservations/del/:id",isAdmin, cw(reservationController.deleteReservation))