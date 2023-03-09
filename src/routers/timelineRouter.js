import { Router } from "express";
import { postPublish } from "../controllers/timelineController.js";
import { validatePostTimeline } from "../middlewares/timelineValidate.js";

const timelineRouter = Router();

timelineRouter.post("/timeline", validatePostTimeline, postPublish);

export default timelineRouter;