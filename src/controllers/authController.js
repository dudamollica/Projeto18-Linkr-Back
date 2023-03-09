import { STATUS_CODE } from "../enums/statusCode.js";
import * as authRepository from "../repositories/authRepository.js";

import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signUp(req, res) {
  const { username, email, picture_url, password } = req.body;
  const hashPassword = bcrypt.hashSync(password, 10);

  try {
    const { rowCount } = await authRepository.insertUserIntoUsers(
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

export async function signIn(req, res) {
  const { password } = req.body;
  const { user } = res.locals;
  console.log(user)
  console.log(user.password)
  const validPassword = bcrypt.compareSync(password, user.password);

  try {
    if (!validPassword) {
      return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
    }

    const token = uuid();

    const { rows: sessionExists } = await authRepository.selectUserFromSessions(
      user.id
    );

    if (sessionExists.length !== 0) {
      await authRepository.deleteUserFromSessions(sessionExists[0].token);
    }

    await authRepository.insertUserIntoSessions(user.id, token);
    return res.status(STATUS_CODE.OK).send({ token });
  } catch (error) {
    return res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}