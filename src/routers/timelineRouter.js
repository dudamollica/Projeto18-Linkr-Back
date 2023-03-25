import { Router } from "express";
import { getPosts, postPublish } from "../controllers/timelineController.js";
import { validatePostTimeline } from "../middlewares/timelineValidate.js";

const timelineRouter = Router();

timelineRouter.post("/timeline", validatePostTimeline, postPublish);
timelineRouter.get("/timeline", getPosts);

export default timelineRouter;