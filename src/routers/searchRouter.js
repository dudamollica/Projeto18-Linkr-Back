import { Router } from "express";
import { searchUsername, UsernameById } from "../controllers/searchController.js";
import { validate } from "../middlewares/auth.middleware.js";

const searchRouter = Router();

searchRouter.post("/timeline/user", validate.authUser, searchUsername);
searchRouter.get("/user/:id", UsernameById);

export default searchRouter;