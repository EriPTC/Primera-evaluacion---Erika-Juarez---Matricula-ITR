/*
nombreEspecialidad,
isAvailable,
*/


import { Schema, model } from "mongoose"

const especialidadSchema = new Schema(
    {
        nombreEspecialidad: { type: String },
        isAvailable: { type: Boolean },
    },
    {
        timestamps: true,
        strict: false,
    }
)

export default model("especialidades", especialidadSchema)