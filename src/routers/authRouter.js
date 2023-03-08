import { Router } from "express";
import { signUp } from "../controllers/authController.js";

import { validateUser } from "../middlewares/auth.middleware.js";
import { schemasValidation } from "../middlewares/schemas.validation.js";

const authRouter = Router();

authRouter.post("/signup", schemasValidation, validateUser, signUp);

export default authRouter;
