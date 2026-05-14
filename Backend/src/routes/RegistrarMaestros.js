import express from "express";
import registrarMaestro from "../Controller/RegistrarMaestro.js";

const router = express.Router()

router.route("/")
.post(registrarMaestro.registrar)

router.route("/newPassword")
.post(registrarMaestro.verificarCodigo)


export default router