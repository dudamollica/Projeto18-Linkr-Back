import { schemas } from "../schemas/schemas.js";
import { STATUS_CODE } from "../enums/statusCode.js";

export async function schemasValidation(req, res, next) {
  const { path } = req.route;

  if (path === "/signup") {
    const { error } = schemas.signUpSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const message = error.details
        .map((detail) => detail.message)
        .join(",")
        .replace("[ref:password]", "equal to password");
      return res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send({ message });
    }
    next();
  }

  /* if (path === "/signin") {
    result = schemas.signInSchema.validate(req.body, {
      abortEarly: false,
    });
  } */

  if (path === "/timeline"){
    const { error } = schemas.timelineSchema.validate(req.body, {
      abortEarly: false
    });
    if (error) {
      const message = error.details.map((detail) = detail.message);
      return res.send(STATUS_CODE.UNPROCESSABLE_ENTITY).send({ message });
    }
    next();
  }
}
