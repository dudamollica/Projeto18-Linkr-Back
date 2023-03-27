import { Router } from "express";
import { postFollowUser, getFollowedUser, getFollowers } from "../controllers/followController.js";
import { authenticateUser} from "../middlewares/auth.middleware.js";

const followRouter = Router();

followRouter.post("/follow", authenticateUser, postFollowUser);
followRouter.get("/followed/:id", authenticateUser, getFollowedUser);
followRouter.get("/followed", authenticateUser, getFollowers);

export default followRouter;