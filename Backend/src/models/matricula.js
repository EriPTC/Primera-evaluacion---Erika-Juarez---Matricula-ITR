/*
estudiante_id,
monto,
diaPago,
metodo,
status,
numeroReferencia,
*/


import { Schema, model } from "mongoose"

const MatriculaSchema = new Schema(
    {
        estudiante_id: { type: String },
        monto: { type: String },
        diaPago: { type: Date },
        Metodo: { type: String },
        isAvailable: { type: String },
        numeroReferencia: { type: Number },
    },
    {
        timestamps: true,
        strict: false,
    }
)

export default model("matriculas", MatriculaSchema)