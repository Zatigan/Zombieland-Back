import { Router } from "express";
import {router as attractionsRouter} from './attraction.router.js';
import {router as homeRouter} from './home.router.js'
import {router as usersRouter} from './user.router.js'
import {router as formRouter} from './form.router.js'

export const router = Router();

router.use(formRouter);
router.use(homeRouter);
router.use(attractionsRouter);
router.use(usersRouter);


