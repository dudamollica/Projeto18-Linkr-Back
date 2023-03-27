import { STATUS_CODE } from "../enums/statusCode.js";
import { selectUserByEmail, searchToken, searchUser } from "../repositories/authRepository.js";
import * as authRepository from "../repositories/authRepository.js";

export async function validateUser(req, res, next) {
  const { path } = req.route;

  try {
    const { rows: user } = await authRepository.selectUserByEmail(
      req.body.email
    );

    if (user.length !== 0 && path === "/signup") {
      return res.sendStatus(STATUS_CODE.CONFLICT);
    }
    if (user.length === 0 && path === "/signin") {
      return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
    }

    res.locals.user = user[0];
  } catch (error) {
    return res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }

  next();
}

async function authUser(req, res, next) {
  const authorization = req.headers.authorization;
  
  if(!authorization) {
    return res.sendStatus(401)
  } 

  const token = authorization?.replace("Bearer ", "");

  if(!token) {
    return res.senStatus(401)
  };

  try {
    const tokenExists = await searchToken(token);

    if (tokenExists.rowCount === 0) {
      return res.sendStatus(401);
    }

    const userId = tokenExists.rows[0].user_id;

    const tokenValide = await searchUser(userId);

    const userInfo = tokenValide.rows[0];

    if (!tokenValide) {
      return res.status(401);
    }

    res.locals.userInfo = userInfo
    console.log(userInfo);

    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export const validate = {
  validateUser,
  authUser
}

export async function authenticateUser(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const { rows } = await authRepository.selectUserByToken(token);
    if (rows.length === 0) {
      return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
    }

    res.locals.user = rows[0].user_id;
    res.locals.token = token;
    next();
  } catch (error) {
    return res.status(STATUS_CODE.SERVER_ERROR).send(error.message);
  }
}