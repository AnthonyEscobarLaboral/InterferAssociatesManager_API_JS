import { Router } from "express"
import {registerCompany,companiesReportGenerator,editCompany} from "./company.controller.js"
import {registerCompanyValidator,companiesReportGeneratorValidator,editCompanyValidator} from "../middlewares/company-validators.js"

const router = Router()

router.post("/registerCompany",registerCompanyValidator,registerCompany)

router.get("/companiesReport",companiesReportGeneratorValidator,companiesReportGenerator)

router.put("/editCompany/:cid",editCompanyValidator,editCompany)

export default router