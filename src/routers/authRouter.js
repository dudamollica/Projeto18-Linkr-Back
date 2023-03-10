import { Router } from "express";
import { signUp, signIn, signOut } from "../controllers/authController.js";

import { validate } from "../middlewares/auth.middleware.js";
import {
  validateUser,
  authenticateUser,
} from "../middlewares/auth.middleware.js";
import { schemasValidation } from "../middlewares/schemas.validation.js";

const authRouter = Router();

authRouter.post("/signup", schemasValidation, validate.validateUser, signUp);
authRouter.post("/signin", schemasValidation, validate.validateUser, signIn);
authRouter.post("/signup", schemasValidation, validateUser, signUp);
authRouter.post("/signin", schemasValidation, validateUser, signIn);
authRouter.delete("/signout", authenticateUser, signOut);

export default authRouter;
