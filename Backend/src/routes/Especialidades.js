import express from "express";
import especialidadesController from "../Controller/EspecialidadesController.js";

const router = express.Router()

router.route("/")
.get(especialidadesController.getEspecialidades)
.post(especialidadesController.insertEspecialidades)

router.route("/:id")
.put(especialidadesController.updateEspecialidad)
.delete(especialidadesController.deleteEspecialidad)

export default router