import Joi from "joi";

const schemas = {
  signUpSchema: Joi.object().keys({
    username: Joi.string().trim().required(),
    email: Joi.string().trim().required(),
    picture_url: Joi.string().trim().required(),
    password: Joi.string().trim().required(),
  }),
  signInSchema: Joi.object().keys({
    email: Joi.string().trim().required(),
    password: Joi.string().trim().required(),
  }),
  timelineSchema: Joi.object().keys({
    url: Joi.string().uri().required(),
    post_text: Joi.string().required()
  })
};

export { schemas };
