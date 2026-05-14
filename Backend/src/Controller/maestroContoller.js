import bcrypt from "bcryptjs";
import maestrosModel from "../models/maestros.js";

const maestroController = {}

maestroController.getMaestro = async (req, res) => {
    try {

        const Maestros = await maestrosModel.find()

        return res.status(200).json(Maestros)


    } catch (error) {
        console.log("Error " + error)
        return res.status(500).json
            ({ message: "Internal Server Error" })
    }

}

maestroController.deleteMaestros = async (req, res) => {
    try {

        const deleteMaestros = await maestrosModel.findByIdAndDelete(
            req.params.id

        )

        if (!deleteMaestros) {
            return res.status(400).json({ message: "Maestro no encontrado" })
        }

        return res.status(200).json({ message: "Maestro eliminado correctamente" })


    } catch (error) {
        console.log("Error " + error)
        return res.status(500).json
            ({ message: "Internal Server Error" })
    }

}

maestroController.updateMaestro = async (req, res) => {
    try {
        let {
            nombre,
            apellido,
            email,
            password,
            telefono,
            fechaContrato,


        } = req.body

        nombre = nombre?.trim()
        apellido = apellido?.trim()
        email = email?.trim()


        if (!nombre || !apellido || !email || !password || !fechaContrato || !telefono) {
            return res.status(400).json({ message: "Campos requeridos" })
        }

        if (nombre.legth < 3) {
            return res.status(400).json({ message: "Nombre invalido" })
        }

        if (apellido.legth < 3) {
            return res.status(400).json({ message: "Apellido invalido" })
        }

        if (fechaContrato > new Date()) {
            return res.status(400).json({ message: "Fecha de contrato Invalida" })
        }

        if (!email || !email.includes("@")) {
            return res.status(400).json({ message: "Correo Invalido" })

        }


        const updateMaestros = {
            nombre,
            apellido,
            email,
            password,
            telefono,
            fechaContrato,

        }

        if (password) {
            updateMaestros.password = await bcrypt.hash(password, 10)

        }

        const MaestrosUpdate = await maestrosModel.findByIdAndUpdate(
            req.params.id,
            updateMaestros,
            { new: true }
        )

        if (!MaestrosUpdate) {
            return res.status(400).json({ message: "Maestro no encontrad" })
        }

        return res.status(200).json({ message: "Maestro actualizado correctamente" })

    } catch (error) {
        console.log("Error " + error)
        return res.status(500).json
            ({ message: "Internal Server Error" })
    }

}

export default maestroController