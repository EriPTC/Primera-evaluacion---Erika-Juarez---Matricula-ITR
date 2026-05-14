import bcrypt from "bcryptjs";
import estudiantesModel from "../models/estudiantes.js";

const estudianteController = {}

estudianteController.getEstudiante = async (req, res) => {
    try {

        const estudiantes = await estudiantesModel.find()

        return res.status(200).json(estudiantes)


    } catch (error) {
        console.log("Error " + error)
        return res.status(500).json
            ({ message: "Internal Server Error" })
    }

}

estudianteController.deleteEstudiante = async (req, res) => {
    try {

        const deleteEstudiantes = await estudiantesModel.findByIdAndDelete(
            req.params.id

        )

        if (!deleteEstudiantes) {
            return res.status(400).json({ message: "Estudiante no encontrado" })
        }

        return res.status(200).json({ message: "Estudiante eliminado correctamente" })


    } catch (error) {
        console.log("Error " + error)
        return res.status(500).json
            ({ message: "Internal Server Error" })
    }

}

estudianteController.updateEstudiante = async (req, res) => {
    try {
        let {
            nombre,
            apellido,
            password,
            email,
            fechaNacimiento,
            especialidad_id,
            carnet,
            telefono,

        } = req.body

        nombre = nombre?.trim()
        apellido = apellido?.trim()
        email = email?.trim()
        carnet = carnet?.trim()
        telefono = telefono?.trim()
        especialidad_id = especialidad_id?.trim()

        if (!nombre || !apellido || !email || !password || !fechaNacimiento || !especialidad_id || !carnet || !telefono) {
            return res.status(400).json({ message: "Campos requeridos" })
        }

        if (nombre.legth < 3) {
            return res.status(400).json({ message: "Nombre invalido" })
        }

        if (apellido.legth < 3) {
            return res.status(400).json({ message: "Apellido invalido" })
        }

        if (fechaNacimiento > new Date() || fechaNacimiento < new Date("2000-01-01")) {
            return res.status(400).json({ message: "Fecha de nacimiento Invalida" })
        }

        if (!email || !email.includes("@")) {
            return res.status(400).json({ message: "Correo Invalido" })

        }


        const updateEstudiantes = {
            nombre,
            apellido,
            email,
            password,
            fechaNacimiento,
            especialidad_id,
            carnet,
            telefono,

        }

        if (password) {
            updateEstudiantes.password = await bcrypt.hash(password, 10)

        }

        const estudiantesUpdate = await estudiantesModel.findByIdAndUpdate(
            req.params.id,
            updateEstudiantes,
            { new: true }
        )

        if (!estudiantesUpdate) {
            return res.status(400).json({ message: "Estudiante no encontrad" })
        }

        return res.status(200).json({ message: "Estudiante actualizado correctamente" })

    } catch (error) {
        console.log("Error " + error)
        return res.status(500).json
            ({ message: "Internal Server Error" })
    }

}

export default estudianteController