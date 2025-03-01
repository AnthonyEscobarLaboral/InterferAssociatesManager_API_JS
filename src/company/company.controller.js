import Company from "../company/company.model.js";
import ExcelJS from "exceljs";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from "fs";

export const registerCompany = async (req, res) => {
    try {
        const registrationYear = new Date().getFullYear();
        const companyReceived = req.body;

        if (typeof companyReceived.creation !== 'number' || companyReceived.creation < 1850 || companyReceived.creation >= registrationYear) {
            return res.status(400).json({
                success: false,
                message: "creation year of the company needs to be a number & a valid year"
            });
        };

        companyReceived.yearsInBusiness = (registrationYear - companyReceived.creation)

        const companyCreated = await Company.create(companyReceived);

        return res.status(201).json({
            message: "Company registered successfully",
            companyCreated
        });
    } catch (err) {
        return res.status(500).json({
            message: "Company registration has failed",
            error: err.message
        });
    }
};


export const companiesReportGenerator = async (req, res) => {
    try {
        const { impact, category, order, yearsInBusiness } = req.body;

        let filterParameter = {};

        if (impact) filterParameter.impact = impact;
        if (category) filterParameter.category = category;
        if (yearsInBusiness) filterParameter.yearsInBusiness = yearsInBusiness;

        let companiesReport = await Company.find(filterParameter).sort({ 
            name: order === "A-Z" ? 1 : -1 
        });

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Report");

        worksheet.columns = [
            { header: 'Company Name', key: 'name', width: 30 },
            { header: 'Location / Address', key: 'location', width: 30 },
            { header: 'Creation year', key: 'creation', width: 30 },
            { header: 'Category', key: 'category', width: 30 },
            { header: 'Years in business', key: 'yearsInBusiness', width: 30 },
            { header: 'Impact Level', key: 'impact', width: 30 }
        ];

        companiesReport.forEach(company => {
            worksheet.addRow({
                name: company.name,
                location: company.location,
                creation: company.creation,
                category: company.category,
                yearsInBusiness: company.yearsInBusiness,
                impact: company.impact
            });
        });

        const rootDir = process.cwd();

        const reportDirectory = join(rootDir, 'public', 'uploads', 'reports');

        const filePath = join(reportDirectory, 'companiesReport.xlsx');


        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await workbook.xlsx.writeFile(filePath);

        return res.status(200).json({
            success: true,
            message: "Report generated successfully",
            companiesReport
        });

    } catch (err) {
        console.error("Error:", err.message);
        return res.status(500).json({
            success: false,
            message: "Failed to generate report",
            error: err.message,
        });
    }
};

export const editCompany = async (req, res) => {
    try {
        const { cid } = req.params;
        const editionYear = new Date().getFullYear();
        const companyReceived = req.body;

        if (typeof companyReceived.creation !== 'number' || companyReceived.creation < 1850 || companyReceived.creation >= editionYear) {
            return res.status(400).json({
                success: false,
                message: "creation year of the company needs to be a number or/and a valid year not post actual year"
            });
        };

        companyReceived.yearsInBusiness = (editionYear - companyReceived.creation)

        const companyUpdated = await Company.findByIdAndUpdate(cid, companyReceived, { new: true });


        return res.status(201).json({
            message: "Company updated successfully",
            companyUpdated
        });
    } catch (err) {
        return res.status(500).json({
            message: "Company information update failed",
            error: err.message
        });
    }
};