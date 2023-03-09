import { schemas } from "../schemas/schemas.js";
import { STATUS_CODE } from "../enums/statusCode.js";

export async function schemasValidation(req, res, next) {
  const { path } = req.route;
  let result;

  if (path === "/signup") {
    const { error } = schemas.signUpSchema.validate(req.body, {
      abortEarly: false,
    });
  }

  if (path === "/signin") {
    result = schemas.signInSchema.validate(req.body, {
      abortEarly: false,
    });
  }

  if (result?.error) {
    const message = result.error.details
      .map((detail) => detail.message)
      .join(",");
    return res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send(message);
  }

  next();

}


