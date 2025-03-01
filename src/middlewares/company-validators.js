import { body, param } from "express-validator";
import { companyFound,impactFound,categoryFound,yearsFound,companyExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";

export const registerCompanyValidator = [
    validateJWT,
    body("name").notEmpty().withMessage("Company name is required"),
    body("name").custom(companyFound),
    body("category").notEmpty().withMessage("Company category is required"),
    body("location").notEmpty().withMessage("Locations address is required"),
    body("creation").notEmpty().withMessage("Company creation-foundation year is required"),
    body("impact").notEmpty().withMessage("Level of impact required, it can be: HIGH - MEDIUM - LOW "),
    validarCampos,
    handleErrors
]

export const companiesReportGeneratorValidator = [
    validateJWT,
    body("impact").optional().custom(impactFound),
    body("category").optional().custom(categoryFound),
    body("yearsInBusiness").optional().custom(yearsFound),
    validarCampos,
    handleErrors
]

export const editCompanyValidator = [
    validateJWT,
    param("cid").isMongoId().withMessage("The id provided is not vali"),
    param("cid").custom(companyExists),
    body("name").optional(),
    body("location").optional(),
    body("impact").optional().custom(impactFound),
    body("category").optional().custom(categoryFound),
    body("creation").optional(),
    validarCampos,
    handleErrors
]