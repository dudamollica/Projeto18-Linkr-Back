import { Router } from "express";
import { signUp, signIn } from "../controllers/authController.js";

import { validate } from "../middlewares/auth.middleware.js";
import { schemasValidation } from "../middlewares/schemas.validation.js";

const authRouter = Router();

authRouter.post("/signup", schemasValidation, validate.validateUser, signUp);
authRouter.post("/signin", schemasValidation, validate.validateUser, signIn);

export default authRouter;
