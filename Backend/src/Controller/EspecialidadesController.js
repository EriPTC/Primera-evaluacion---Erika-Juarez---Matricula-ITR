import especialidadesModel from "../models/especialidades.js";

const especialidadesController = {}

especialidadesController.getEspecialidades = async (req, res) => {
    try {

        const especialidades = await especialidadesModel.find()

        return res.status(200).json(especialidades)

        
    } catch(error){
        console.log("Error " +error)
        return res.status(500).json
        ({message: "Internal Server Error"})
    }
    
}

especialidadesController.insertEspecialidades = async (req, res) => {
    try {
        let {
            nombreEspecialidad,
            isAvailable
        } = req.body

        nombreEspecialidad=nombreEspecialidad?.trim()

        if (!nombreEspecialidad || !isAvailable){
            return res.status(400).json({message: "Campos requeridos"})
        }

        const newEspecialidad = new especialidadesModel ({
            nombreEspecialidad,
            isAvailable
        })

        await newEspecialidad.save()

        return res.status(200).json("Especialidad guardada exitosamente")

        
    } catch(error){
        console.log("Error " +error)
        return res.status(500).json
        ({message: "Internal Server Error"})
    }
    
}

especialidadesController.updateEspecialidad = async (req, res) => {
    try {

         let {
            nombreEspecialidad,
            isAvailable
        } = req.body

        nombreEspecialidad=nombreEspecialidad?.trim()

        if (!nombreEspecialidad || !isAvailable){
            return res.status(400).json({message: "Campos requeridos"})
        }

        const updateEspecialidades = await especialidadesModel.findByIdAndUpdate(
            req.params.id,
            {nombreEspecialidad,
            isAvailable},
            {new: true}
        )

        if (!updateEspecialidades){
            return res.status(400).json({message: "especialidad no encontrada"})
        }

        return res.status(200).json({message: "Especialidad actualizada correctamente"})

    } catch(error){
        console.log("Error " +error)
        return res.status(500).json
        ({message: "Internal Server Error"})
    }
    
}

especialidadesController.deleteEspecialidad = async (req, res) => {
    try {

        const deleteEspecialidades = await especialidadesModel.findByIdAndDelete(
            req.params.id
        
        )

        if (!deleteEspecialidades){
            return res.status(400).json({message: "especialidad no encontrada"})
        }

        return res.status(200).json({message: "Especialidad eliminada correctamente"})

        
     } catch(error){
        console.log("Error " +error)
        return res.status(500).json
        ({message: "Internal Server Error"})
    }
    
}

export default especialidadesController