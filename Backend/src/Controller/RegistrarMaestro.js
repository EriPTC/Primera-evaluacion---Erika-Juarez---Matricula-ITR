import nodemailer from "nodemailer"
import crypto from "crypto"
import JsonWebToken from "jsonwebtoken"
import bcrypt from "bcryptjs"
import maestrosModel from "../models/maestros.js"
import { config } from "../../config.js"


const registrarMaestro = {}

registrarMaestro.registrar = async (req, res) => {
    const {
        nombre,
        apellido,
        email,
        password,
        telefono,
        fechaContrato,
        isActive,
        isVerified,
        loginAttemps,
        timeOut,
    } = req.body

    try {
        const existMaestro = await maestrosModel.findOne({ email })

        if (existMaestro) {
            return res.status(404).json({ message: "Maestro existente" })
        }

        const passwordHash = await bcrypt.hash(password, 10)

        const verificationCode = crypto.randomBytes(3).toString("hex")

        const tokenCode = JsonWebToken.sign(
            {
                nombre,
                apellido,
                email,
                password: passwordHash,
                telefono,
                fechaContrato,
                isActive,
                isVerified,
                loginAttemps,
                timeOut,
            },
            config.JWT.SECRET,
            { expiresIn: "15m" }

        )

        res.cookies("verificationToken", tokenCode, { maxAge: 15 * 60 * 1000 })


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




registrarMaestro.verificarCodigo = async (req, res) => {
    try {
        const { verificationCodeRequest } = req.body
        const token = req.cookies.verificationToken
        console.log(token)
        const decoded = JsonWebToken.verify(token, config.JWT.SECRET)

        const {
            verificationCodeRequest: storedCode,
            nombre,
            apellido,
            email,
            password,
            telefono,
            fechaContrato,
            isActive,
            isVerified,
            loginAttemps,
            timeOut,

        } = decoded

        if (verificationCodeRequest !== storedCode) {
            return res.status(404).json({ message: "Codigo Invalido" })
        }

        const NewMaestro = new maestrosModel({
            nombre,
            apellido,
            email,
            password,
            telefono,
            fechaContrato,
            isActive,
            isVerified,
            loginAttemps,
            timeOut,
        })

        await NewMaestro.save()

        const maestros = await maestrosModel.findOne({ email })

        maestros.isVerified = true
        await maestros.save()

        res.clearCookie("verificationToken")

        return res.status(200).json({ message: "Maestro registrado" })


    } catch (error) {
        console.log("Error " + error)
        return res.status(500).json
            ({ message: "Internal Server Error" })
    }
}

export default registrarMaestro 