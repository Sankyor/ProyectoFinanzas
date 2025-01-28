import Joi from "joi";

export const authLoginSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().trim().min(6).required(),
});

export const authRegisterSchema = Joi.object({
    name: Joi.string().trim().min(3).required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().trim().min(6).required(),
});

export const checkEmailSchema = Joi.object({
    email: Joi.string().email().lowercase(),
});