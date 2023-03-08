import { STATUS_CODE } from "../enums/statusCode.js";
import * as authRepository from "../repositories/authRepository.js";

import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signUp(req, res) {
  const { username, email, picture_url, password, confirmPassword } = req.body;
  const hashPassword = bcrypt.hashSync(password, 10);

  try {
    const { rowCount } = await authRepository.insertUserIntoUser(
      username,
      email,
      picture_url,
      hashPassword
    );
    if (rowCount === 1) return res.sendStatus(STATUS_CODE.CREATED);
    else return res.sendStatus(STATUS_CODE.CONFLICT);
  } catch (error) {
    return res.status(STATUS_CODE.SERVER_ERROR).send(error.message);
  }
}

export async function signIn(req, res) {}
