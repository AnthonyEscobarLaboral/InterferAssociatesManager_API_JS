import { Router } from "express";
import { login } from "./auth.controller.js";
import { loginValidator } from "../middlewares/admin-validators.js";

const router = Router();

/**
 * @swagger
 * /InterferAssociatesManager/v1/auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     description: Permite a un usuario iniciar sesión proporcionando su nombre de usuario o correo electrónico y su contraseña. Devuelve un token JWT si las credenciales son correctas.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario del usuario
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 account_information:
 *                   type: object
 *                   properties:
 *                     completeName:
 *                       type: string
 *                       example: "Juan Pérez"
 *                     username:
 *                       type: string
 *                       example: "juan123"
 *                     email:
 *                       type: string
 *                       example: "juan@ejemplo.com"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-05-15T09:45:00.000Z"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Credenciales incorrectas (usuario/contraseña)
 *       500:
 *         description: Error interno en el servidor
 */
router.post("/login", loginValidator, login);

export default router;
