import express from "express";
import estudianteController from "../Controller/EstudianteController.js";

const router = express.Router()

router.route("/")
.get(estudianteController.getEstudiante)


router.route("/:id")
.put(estudianteController.updateEstudiante)
.delete(estudianteController.deleteEstudiante)

export default router