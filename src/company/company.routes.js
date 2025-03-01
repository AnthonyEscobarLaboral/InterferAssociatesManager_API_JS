import { Router } from "express";
import { registerCompany, companiesReportGenerator, editCompany } from "./company.controller.js";
import { registerCompanyValidator, companiesReportGeneratorValidator, editCompanyValidator } from "../middlewares/company-validators.js";

const router = Router();

/**
 * @swagger
 * /InterferAssociatesManager/v1/company/registerCompany:
 *   post:
 *     summary: Registra una nueva compañía
 *     description: Permite registrar una nueva compañía proporcionando el nombre, categoría, dirección, año de creación, impacto y más.
 *     tags: [Company]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la compañía
 *               category:
 *                 type: string
 *                 description: Categoría de la compañía
 *               location:
 *                 type: string
 *                 description: Dirección de la compañía
 *               creation:
 *                 type: number
 *                 description: Año de fundación de la compañía
 *               impact:
 *                 type: string
 *                 enum: [HIGH, MEDIUM, LOW]
 *                 description: Nivel de impacto de la compañía
 *               yearsInBusiness:
 *                 type: number
 *                 description: Años de operación de la compañía (calculado automáticamente)
 *     responses:
 *       201:
 *         description: Compañía registrada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Company registered successfully"
 *                 companyCreated:
 *                   $ref: '#/components/schemas/Company'
 *       400:
 *         description: Año de creación inválido o parámetros incorrectos
 *       500:
 *         description: Error en el servidor al registrar la compañía
 */
router.post("/registerCompany", registerCompanyValidator, registerCompany);

/**
 * @swagger
 * /InterferAssociatesManager/v1/company/companiesReport:
 *   get:
 *     summary: Genera un reporte de compañías
 *     description: Genera un reporte en formato Excel de las compañías según los parámetros de filtrado (impacto, categoría, años en negocio, orden).
 *     tags: [Company]
 *     parameters:
 *       - in: query
 *         name: impact
 *         required: false
 *         description: Filtro por nivel de impacto
 *         schema:
 *           type: string
 *           enum: [HIGH, MEDIUM, LOW]
 *       - in: query
 *         name: category
 *         required: false
 *         description: Filtro por categoría de la compañía
 *         schema:
 *           type: string
 *       - in: query
 *         name: yearsInBusiness
 *         required: false
 *         description: Filtro por años en negocio
 *         schema:
 *           type: number
 *       - in: query
 *         name: order
 *         required: false
 *         description: Orden de las compañías (A-Z o Z-A)
 *         schema:
 *           type: string
 *           enum: [A-Z, Z-A]
 *     responses:
 *       200:
 *         description: Reporte generado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Report generated successfully"
 *       500:
 *         description: Error al generar el reporte
 */
router.get("/companiesReport", companiesReportGeneratorValidator, companiesReportGenerator);

/**
 * @swagger
 * /InterferAssociatesManager/v1/company/editCompany/{cid}:
 *   put:
 *     summary: Editar información de una compañía
 *     description: Permite editar la información de una compañía existente proporcionando el ID de la compañía y los nuevos detalles.
 *     tags: [Company]
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         description: ID de la compañía a editar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la compañía
 *               category:
 *                 type: string
 *                 description: Categoría de la compañía
 *               location:
 *                 type: string
 *                 description: Dirección de la compañía
 *               creation:
 *                 type: number
 *                 description: Año de fundación de la compañía
 *               impact:
 *                 type: string
 *                 enum: [HIGH, MEDIUM, LOW]
 *                 description: Nivel de impacto de la compañía
 *               yearsInBusiness:
 *                 type: number
 *                 description: Años de operación de la compañía (calculado automáticamente)
 *     responses:
 *       201:
 *         description: Compañía actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Company updated successfully"
 *                 companyUpdated:
 *                   $ref: '#/components/schemas/Company'
 *       400:
 *         description: Año de creación inválido o parámetros incorrectos
 *       500:
 *         description: Error en el servidor al actualizar la compañía
 */
router.put("/editCompany/:cid", editCompanyValidator, editCompany);

export default router;
