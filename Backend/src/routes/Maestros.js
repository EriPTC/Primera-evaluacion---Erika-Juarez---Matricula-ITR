import express from "express";
import maestroController from "../Controller/maestroContoller.js";

const router = express.Router()

router.route("/")
.get(maestroController.getMaestro)


router.route("/:id")
.put(maestroController.updateMaestro)
.delete(maestroController.deleteMaestros)

export default router