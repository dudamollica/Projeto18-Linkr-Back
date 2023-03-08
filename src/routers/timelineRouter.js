import { Router } from "express";
import { postPublish } from "../controllers/timelineController.js";
import { schemasValidation } from "../middlewares/schemas.validation.js";

const timelineRouter = Router();

timelineRouter.post("/timeline", schemasValidation, postPublish);

export default timelineRouter;