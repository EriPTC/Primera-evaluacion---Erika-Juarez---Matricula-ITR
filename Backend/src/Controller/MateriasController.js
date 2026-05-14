import materiasModel from "../models/materias.js";

const MateriasController = {}

MateriasController.getMaterias = async (req, res) => {
    try {

        const materias = await materiasModel.find()

        return res.status(200).json(materias)


    } catch (error) {
        console.log("Error " + error)
        return res.status(500).json
            ({ message: "Internal Server Error" })
    }

}

MateriasController.insertEspecialidades = async (req, res) => {
    try {
        let {
            nombreMateria,
            maestro_id,
            isAvailable,
        } = req.body

        nombreMateria = nombreMateria?.trim()
        maestro_id = maestro_id?.trim()

        if (!nombreMateria || !isAvailable || !maestro_id) {
            return res.status(400).json({ message: "Campos requeridos" })
        }

        const newMateria = new materiasModel({
            nombreMateria,
            maestro_id,
            isAvailable,

        })

        await newMateria.save()

        return res.status(200).json("Materia guardada exitosamente")


    } catch (error) {
        console.log("Error " + error)
        return res.status(500).json
            ({ message: "Internal Server Error" })
    }

}

MateriasController.UpdateMateria = async (req, res) => {
    try {

        let {
            nombreMateria,
            maestro_id,
            isAvailable,
        } = req.body

        nombreMateria = nombreMateria?.trim()
        maestro_id = maestro_id?.trim()

        if (!nombreMateria || !isAvailable || !maestro_id) {
            return res.status(400).json({ message: "Campos requeridos" })
        }


        const UpdateMaterias = await materiasModel.findByIdAndUpdate(
            req.params.id,
            {
                nombreMateria,
                maestro_id,
                isAvailable,
            },
            { new: true }
        )

        if (!UpdateMaterias) {
            return res.status(400).json({ message: "Materia no encontrada" })
        }

        return res.status(200).json({ message: "Materia actualizada correctamente" })

    } catch (error) {
        console.log("Error " + error)
        return res.status(500).json
            ({ message: "Internal Server Error" })
    }

}

MateriasController.deleteMateria = async (req, res) => {
    try {

        const deleteMaterias = await materiasModel.findByIdAndDelete(
            req.params.id

        )

        if (!deleteMaterias) {
            return res.status(400).json({ message: "Materia no encontrada" })
        }

        return res.status(200).json({ message: "Materia eliminada correctamente" })


    } catch (error) {
        console.log("Error " + error)
        return res.status(500).json
            ({ message: "Internal Server Error" })
    }

}

export default MateriasController