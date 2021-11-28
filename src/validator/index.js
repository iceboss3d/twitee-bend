import Joi from "joi";

export const AuthValidate = Joi.object({
  email: Joi.string()
    .email()
    .message("Provide a valid email")
    .lowercase()
    .required(),
  password: Joi.string()
    .min(6)
    .message("Password must be a minimum of 6 characters")
    .required(),
});

export const TwitValidate = Joi.object({
  twit: Joi.string()
    .min(1)
    .message("Twit empty")
    .max(140)
    .message("Twit exceeds maximum length"),
});

export const CommentValidate = Joi.object({
  comment: Joi.string()
    .min(1)
    .message("Comment empty")
    .max(140)
    .message("Comment exceeds maximum length"),
});
