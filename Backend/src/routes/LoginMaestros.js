import express from "express";
import loginMaestro from "../Controller/LoginMaestros.js";

const router = express.Router()

router.route("/")
.post(loginMaestro.login)


export default router