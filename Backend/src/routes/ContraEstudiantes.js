import express from "express";
import recuperarContraEstudiante from "../Controller/recuperarContraEstudiantes.js";

const router = express.Router()

router.route("/")
.post(recuperarContraEstudiante.recuperarContra)
router.route("/verificarCodigo")
.post(recuperarContraEstudiante.verificarCodigo)
router.route("/newPassword")
.post(recuperarContraEstudiante.NewPassword)


export default router