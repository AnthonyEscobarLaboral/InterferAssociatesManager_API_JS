import { Router } from "express"
import {registerCompany,companiesReportGenerator} from "./company.controller.js"
import {registerCompanyValidator,companiesReportGeneratorValidator } from "../middlewares/company-validators.js"

const router = Router()

router.post("/registerCompany",registerCompanyValidator,registerCompany)

router.get("/companiesReport",companiesReportGeneratorValidator,companiesReportGenerator)

export default router