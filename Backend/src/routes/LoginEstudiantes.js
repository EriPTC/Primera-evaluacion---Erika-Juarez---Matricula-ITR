import express from "express";
import LoginEstudiante from "../Controller/LoginEstudiante.js";

const router = express.Router()

router.route("/")
.post(LoginEstudiante.login)


export default router