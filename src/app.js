import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chalk from "chalk";

import authRouter from "./routers/authRouter.js";
import timelineRouter from "./routers/timelineRouter.js";

dotenv.config();
const server = express();
server.use(cors());
server.use(express.json());

server.use([authRouter, timelineRouter]);

server.listen(process.env.PORT, () =>
  console.log(chalk.cyan("Servidor Funfou!"))
);