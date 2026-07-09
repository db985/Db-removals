import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import quotesRouter from "./quotes";
import calendarRouter from "./calendar";
import uploadsRouter from "./uploads";

const router: IRouter = Router();

router.use(authRouter);
router.use(quotesRouter);
router.use(calendarRouter);
router.use(uploadsRouter);
router.use(healthRouter);

export default router;
