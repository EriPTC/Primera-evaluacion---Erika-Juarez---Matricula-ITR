import express from "express";
import MateriasController from "../Controller/MateriasController.js";

const router = express.Router()


router.route("/")
.get(MateriasController.getMaterias)
.post(MateriasController.insertEspecialidades)

router.route("/:id")
.put(MateriasController.UpdateMateria)
.delete(MateriasController.deleteMateria)


export default router