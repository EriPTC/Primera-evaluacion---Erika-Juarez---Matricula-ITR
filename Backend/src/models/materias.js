/*
nombreMateria,
maestro_id,
isAvailable,
*/

import { Schema, model } from "mongoose"

const materiaSchema = new Schema(
    {
        nombreMateria: { type: String },
        maestro_id: { type: String },
        isAvailable: { type: Boolean },
    },
    {
        timestamps: true,
        strict: false,
    }
)

export default model("materias", materiaSchema)