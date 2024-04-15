import Joi from "joi";
import { emailRegex, subscriptionList } from "../constants/userConstants.js";

export const userSignupSchema = Joi.object({
    password: Joi.string().required().min(6),
    email: Joi.string().pattern(emailRegex).required(),
    subscription: Joi.string().valid(...subscriptionList)
});

export const userSigninSchema = Joi.object({
    password: Joi.string().required().min(6),
    email: Joi.string().pattern(emailRegex).required(),
})

export const userEmailSchema = Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
})