import { Router } from "express";
import { searchUsername, searchUsernameById, getPostById } from "../controllers/searchController.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const searchRouter = Router();

searchRouter.post("/timeline/user", authenticateUser, searchUsername);
searchRouter.get("/user/:id", searchUsernameById);
searchRouter.get("/timeline/user/:id", authenticateUser, getPostById);

export default searchRouter;