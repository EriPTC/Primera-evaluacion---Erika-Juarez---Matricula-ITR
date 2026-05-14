import express from "express";
import registrarEstudiante from "../Controller/RegistrarEstudiante.js";

const router = express.Router()

router.route("/")
.post(registrarEstudiante.registrar)

router.route("/newPassword")
.post(registrarEstudiante.verificarCodigo)

export default router