import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chalk from "chalk";

import authRouter from "./routers/authRouter.js";
import searchRouter from "./routers/searchRouter.js";
import timelineRouter from "./routers/timelineRouter.js";
import hashtagsRouter from './routers/hashtagsRouters.js'

dotenv.config();
const server = express();
server.use(cors());
server.use(express.json());

server.use(authRouter);
server.use(searchRouter);
server.use([authRouter, timelineRouter]);
server.use(searchRouter);
server.use([authRouter, hashtagsRouter]);

server.listen(process.env.PORT, () =>
  console.log(chalk.cyan("Servidor Funfou!"))
);