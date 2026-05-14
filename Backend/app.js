import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import limiter from "./src/middlewares/limiter.js"

//Rutas
import recuperarContraEstudiante from "./src/routes/ContraEstudiantes.js";
import recuperarContraMaestro from "./src/routes/ContraMaestros.js";
import especialidadesController from "./src/routes/Especialidades.js";
import estudianteController from "./src/routes/Estudiantes.js";
import LoginEstudiante from "./src/routes/LoginEstudiantes.js";
import loginMaestro from "./src/routes/LoginMaestros.js";
import logoutController from "./src/routes/logout.js";
import maestroController from "./src/routes/Maestros.js";
import MateriasController from "./src/routes/Materias.js";
import matriculaController from "./src/routes/Matricula.js";
import registrarEstudiante from "./src/routes/RegistararEstudiantes.js";
import registrarMaestro from "./src/routes/RegistrarMaestros.js";


const app = express ();

app.use (cors ({
    origin: [ 
        "http://localhost:5173",
        "http://localhost:5174"
    ],
    credentials: true
}));

app.use (cookieParser());

app.use (limiter);

app.use (express.json())


//Endporints
app.use("/api/recuperarContraseñaEstudiante",limiter,recuperarContraEstudiante)
app.use("/api/recuperarContraseñaMaestro",limiter,recuperarContraMaestro)
app.use("/api/especialidadesController",limiter,especialidadesController)
app.use("/api/estudianteController",limiter,estudianteController)
app.use("/api/LoginEstudiante",limiter,LoginEstudiante)
app.use("/api/loginMaestro",limiter,loginMaestro)
app.use("/api/logoutController",limiter,logoutController)
app.use("/api/maestroController",limiter,maestroController)
app.use("/api/MateriasController",limiter,MateriasController)
app.use("/api/matriculaController",limiter,matriculaController)
app.use("/api/registrarEstudiante",limiter,registrarEstudiante)
app.use("/api/registrarMaestro",limiter,registrarMaestro)


export default app;
