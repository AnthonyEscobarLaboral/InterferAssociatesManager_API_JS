import { body, param } from "express-validator";
import { usernameFound,emailFound } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";

export const loginValidator = [
    body("email").optional().custom(emailFound),
    body("email").optional().isEmail().withMessage("the email you provided is not valid"),
    body("username").optional().custom(usernameFound),
    body("username").optional().isString().withMessage("Username cannot be diferent but only text"),
    body("password").notEmpty().withMessage("Password is required"),
    body("password").isLength({min: 8}).withMessage("Password cannot contain less than 8 characters long"),
    validarCampos,
    handleErrors
]