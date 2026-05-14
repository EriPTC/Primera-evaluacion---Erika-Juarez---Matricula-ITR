import matriculaModel from "../models/matricula.js";

const matriculaController = {}

matriculaController.getMatricula = async (req, res) => {
    try {

        const Matricula = await matriculaModel.find()

        return res.status(200).json(Matricula)


    } catch (error) {
        console.log("Error " + error)
        return res.status(500).json
            ({ message: "Internal Server Error" })
    }

}

matriculaController.insertMatricula = async (req, res) => {
    try {
        let {
            estudiante_id,
            monto,
            diaPago,
            metodo,
            status,
            numeroReferencia,
        } = req.body

        numeroReferencia = numeroReferencia?.trim()

        if (!estudiante_id || !monto || !diaPago || !metodo || !status) {
            return res.status(400).json({ message: "Campos requeridos" })
        }

        const NewMatricula = new matriculaModel({
            estudiante_id,
            monto,
            diaPago,
            metodo,
            status,
            numeroReferencia,
        })

        await NewMatricula.save()

        return res.status(200).json("Matricula guardada exitosamente")


    } catch (error) {
        console.log("Error " + error)
        return res.status(500).json
            ({ message: "Internal Server Error" })
    }

}

matriculaController.updateMatricula = async (req, res) => {
    try {

         let {
            estudiante_id,
            monto,
            diaPago,
            metodo,
            status,
            numeroReferencia,
        } = req.body

        numeroReferencia = numeroReferencia?.trim()

        if (!estudiante_id || !monto || !diaPago || !metodo || !status) {
            return res.status(400).json({ message: "Campos requeridos" })
        }


        const updateMatricula = await matriculaModel.findByIdAndUpdate(
            req.params.id,
            {
                estudiante_id,
                monto,
                diaPago,
                metodo,
                status,
                numeroReferencia,
            },
            { new: true }
        )

        if (!updateMatricula) {
            return res.status(400).json({ message: "Matricula no encontrada" })
        }

        return res.status(200).json({ message: "Matricula actualizada correctamente" })

    } catch (error) {
        console.log("Error " + error)
        return res.status(500).json
            ({ message: "Internal Server Error" })
    }

}

matriculaController.deleteMatricula = async (req, res) => {
    try {

        const deleteMatricula = await matriculaModel.findByIdAndDelete(
            req.params.id

        )

        if (!deleteMatricula) {
            return res.status(400).json({ message: "Matricula no encontrada" })
        }

        return res.status(200).json({ message: "Matricula eliminada correctamente" })


    } catch (error) {
        console.log("Error " + error)
        return res.status(500).json
            ({ message: "Internal Server Error" })
    }

}

export default matriculaController