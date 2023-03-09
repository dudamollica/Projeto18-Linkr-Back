import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chalk from "chalk";

import authRouter from "./routers/authRouter.js";
import searchRouter from "./routers/searchRouter.js";

dotenv.config();
const server = express();
server.use(cors());
server.use(express.json());

server.use(authRouter);
server.use(searchRouter);

server.listen(process.env.PORT, () =>
  console.log(chalk.cyan("Servidor Funfou!"))
);