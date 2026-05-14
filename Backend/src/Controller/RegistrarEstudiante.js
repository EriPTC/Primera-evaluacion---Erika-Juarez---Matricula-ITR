import nodemailer from "nodemailer"
import crypto from "crypto"
import JsonWebToken from "jsonwebtoken"
import bcrypt from "bcryptjs"
import estudiantesModel from "../models/estudiantes.js"
import { config } from "../../config.js"


const registrarEstudiante = {}

registrarEstudiante.registrar = async (req, res) => {
    const {
        nombre,
        apellido,
        password,
        email,
        fechaNacimiento,
        especialidad_id,
        carnet,
        telefono,
        isVerified,
        loginAttemps,
        timeout,
    } = req.body

    try {
        const existEstudiante = await estudiantesModel.findOne({ email })

        if (existEstudiante) {
            return res.status(404).json({ message: "Estudiante existente" })
        }

        const passwordHash = await bcrypt.hash(password, 10)

        const verificationCode = crypto.randomBytes(3).toString("hex")

        const tokenCode = JsonWebToken.sign(
            {
                nombre,
                apellido,
                password: passwordHash,
                email,
                fechaNacimiento,
                especialidad_id,
                carnet,
                telefono,
                isVerified,
                loginAttemps,
                timeout,
            },
            config.JWT.SECRET,
            { expiresIn: "15m" }

        )

        res.cookie("verificationToken", tokenCode, { maxAge: 15 * 60 * 1000 })


        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.USER_EMAIL,
                pass: config.email.USER_PASSWORD
            }
        })

        const mailOption = {
            from: config.email.USER_EMAIL,
            to: email,
            subject: "Verificar Correo",
            text: "Utiliza este codigo: " + verificationCode + " para verificar su correo. Expira en 15 minutos"
        }

        transporter.sendMail(mailOption, (error, info) => {
            if (error) {
                console.log(error)
                return res.status(500).json({ message: "error al enviar el email" })
            }
            return res.status(200).json({ message: "Correo enviado" })
        })


    } catch (error) {
        console.log("Error " + error)
        return res.status(500).json
            ({ message: "Internal Server Error" })
    }
}




registrarEstudiante.verificarCodigo = async (req, res) => {
    try {
        const { verificationCodeRequest } = req.body
        const token = req.cookies.verificationToken
        console.log(token)
        const decoded = JsonWebToken.verify(token, config.JWT.SECRET)

        const {
            nombre,
            apellido,
            password: passwordHash,
            verificationCodeRequest: storedCode,
            email,
            fechaNacimiento,
            especialidad_id,
            carnet,
            telefono,
            isVerified,
            loginAttemps,
            timeout,
        } = decoded

        if (verificationCodeRequest !== storedCode) {
            return res.status(404).json({ message: "Codigo Invalido" })
        }

        const newEstudiante = new estudiantesModel({
            nombre,
            apellido,
            password: passwordHash,
            email,
            fechaNacimiento,
            especialidad_id,
            carnet,
            telefono,
            isVerified,
            loginAttemps,
            timeout,
        })

        await newEstudiante.save()

        const estudiantes = await estudiantesModel.findOne({ email })

        estudiantes.isVerified = true
        await estudiantes.save()

        res.clearCookie("verificationToken")

        return res.status(200).json({ message: "Estudiante registrado" })


    } catch (error) {
        console.log("Error " + error)
        return res.status(500).json
            ({ message: "Internal Server Error" })
    }
}

export default registrarEstudiante