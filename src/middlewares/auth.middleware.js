import { STATUS_CODE } from "../enums/statusCode.js";
import { selectUserByEmail } from "../repositories/authRepository.js";

async function validateUser(req, res, next) {
  const { path } = req.route;

  try {
    const { rows: user } = await selectUserByEmail(req.body.email);

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

export { validateUser };
