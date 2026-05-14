import bcrypt from "bcryptjs";
import JsonWebToken from "jsonwebtoken";
import estudiantesModel from "../models/estudiantes.js";
import { config } from "../../config.js";

const LoginEstudiante = {};

LoginEstudiante.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userFound = await estudiantesModel.findOne({ email });

        if (!userFound) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        if (userFound.timeOut && userFound.timeOut > Date.now()) {
            return res.status(403).json({ message: "Cuenta Bloqueada" })
        }

        const isMatch = await bcrypt.compare (password, userFound.password)

        if(!isMatch){
            userFound.loginAttemps = (userFound.loginAttemps || 0) +1

            if (userFound.loginAttemps >= 5) {
                userFound.timeOut = Date.now()+15*60*100 
                userFound.loginAttemps=0

                await userFound.save()
                return res.status(403).json({ message: "Cuenta Bloqueada" })
            }

            await userFound.save()
            return res.status(401).json({ message: "Contraseña incorrecta" })
        }

        const token = JsonWebToken.sign(
            {id:userFound._id, userType:"Estudiante"},
            config.JWT.SECRET,
            {expiresIn: "30d"}
        )

        res.cookies("authCookie", token)
        return res.status(200).json({ message: "Login Exitoso" })


    } catch (error) {
        console.log("Error " + error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


export default LoginEstudiante