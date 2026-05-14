import express from "express";
import recuperarContraMaestro from "../Controller/RecuperarContraMaestros.js";

const router = express.Router()

router.route("/")
.post(recuperarContraMaestro.recuperarContra)
router.route("/verificarCodigo")
.post(recuperarContraMaestro.verificarCodigo)
router.route("/newPassword")
.post(recuperarContraMaestro.NewPassword)

export default router