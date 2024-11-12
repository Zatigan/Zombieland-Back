import { Router } from "express";
import { controllerWrapper as cw } from "./controller-wrapper.js";
import * as userRouter from "../../controllers/apiControllers/users.controller.js";
import userLoggedIn from "../../middleware/userLoggedIn.js";


export const router = Router();

router.delete("/profile/delete", userLoggedIn, cw(userRouter.delProfile));
router.get("/profile", userLoggedIn, cw(userRouter.myProfile));
router.get("/profile/reservation",userLoggedIn, cw(userRouter.reservationByProfile))
router.delete("/profile/reservation/del",userLoggedIn, cw(userRouter.delReservationByProfile));
router.patch("/profile/reservation/update",userLoggedIn, cw(userRouter.updateReservationByProfile));
/* router.get("/user", cw(userRouter.getAllUsers));
router.get("/user/:id", cw(userRouter.getOneUser)); */
router.patch("/profile/update",userLoggedIn, cw(userRouter.updateUser));