import express from "express";
import matriculaController from "../Controller/MatriculaController.js";

const router = express.Router()


router.route("/")
.get(matriculaController.getMatricula)
.post(matriculaController.insertMatricula)

router.route("/:id")
.put(matriculaController.updateMatricula)
.delete(matriculaController.deleteMatricula)


export default router