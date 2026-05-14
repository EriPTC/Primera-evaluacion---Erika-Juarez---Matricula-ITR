import JsonWebToken from "jsonwebtoken";
import {config} from "../../config.js"
import bcrypt from "bcryptjs";
import estudiantesModel from "../models/estudiantes.js";
import crypto from "crypto"
import nodemailer from "nodemailer"


const recuperarContraEstudiante = {}

recuperarContraEstudiante.recuperarContra=async (req, res) => {
    try {

        const {email} = req.body
        const userFound = await estudiantesModel.findOne({email})
        
        if (!userFound) {
            return res.status(404).json({message: "Estudiante no encontrado"})            
        }

        const code = crypto.randomBytes(3).toString("hex")

        const token = JsonWebToken.sign(
            {email, code, userype: "Estudiante", verified:false},
            config.JWT.SECRET,
            {expiresIn: "15m"},
            res.cookies("recoveryCookie", token, {maxAge: 15*60*1000})
        )

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user: config.email.USER_EMAIL,
                pass: config.email.USER_PASSWORD
            }
        })

        const mailOption = {
            from : config.email.USER_EMAIL,
            to: email,
            subject: "Recuperar Contraseña",
            text: "Utiliza este codigo: " + code + " para recuperar tu contraseña. Expira en 15 minutos"
        }

        transporter.sendMail(mailOption, (error, info)=> {
            if(error){
                console.log(error)
                return res.status(500).json({message: "error al enviar el email"})
            }
            return res.status(200).json({message: "Correo enviado"})
        })
        
    } catch(error){
        console.log("Error " +error)
        return res.status(500).json
        ({message: "Internal Server Error"})
    }
    
}


recuperarContraEstudiante.verificarCodigo = async (req, res)=>{
    try {

        const {codeRequest} =req.body
        const token = req.cookies.recoveryCookie
        const decoded = JsonWebToken.verify(token, config.JWT.SECRET)

        if (decoded.code !==codeRequest){
            return res.status(400).json({message: "Codigo invalido"}) 
        }

        const newToken = JsonWebToken.sign(
            {email:decoded.email, userType:"Estudiante", verified: true},
            config.JWT.SECRET,
            {expiresIn: "15m"},
            res.cookies("recoveryCookie", newToken,{maxAge: 15*60*1000})
        )
        return res.status(200).json({message: "Codigo verificado"}) 
        
    }  catch(error){
        console.log("Error " +error)
        return res.status(500).json
        ({message: "Internal Server Error"})
    }
}


recuperarContraEstudiante.NewPassword = async (req, res) => {
    try {
        const {NewPassword, confirmNewPassword}= req.body

    if(NewPassword !== confirmNewPassword){
        return res.status(400).json({message: "Las contraseñas no coinciden"}) 
    }

    const Token = req.cookies.recoveryCookie
    const decoded = JsonWebToken.verify(token, config.JWT.SECRET)

    if (!decoded.verified){
        return res.status(400).json({message: "Codigo no verificado"}) 

    }

    const passwordHash = await bcrypt.hash(NewPassword,10)
    await estudiantesModel.findOneAndUpdate(
        {email:decoded.email},
        {password:passwordHash},
        {new: true}
    )
    res.cookies("recoveryCookie")
    return res.status(200).json({message: "Contraseña Actualizada"}) 
        
    } catch(error){
        console.log("Error " +error)
        return res.status(500).json
        ({message: "Internal Server Error"})
    }
}

export default recuperarContraEstudiante