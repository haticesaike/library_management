import joi from "joi";

export const registerSchema = joi.object({
  name: joi.string().alphanum().required(),
  email: joi.string().email().required(),
  password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,12}$")).required(),
});
