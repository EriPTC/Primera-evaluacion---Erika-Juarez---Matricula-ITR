/*
nombre,
apellido,
password,
email,
fechaNacimiento,
especialidad_id,
carnet,
telefono,
isVerified,
loginAttemps,
timeout,
*/


import { Schema, model } from "mongoose"

const estudianteSchema = new Schema(
    {
        nombre: { type: String },
        apellido: { type: String },
        email: { type: String },
        password: { type: String },
        fechaNacimiento: { type: Date },
        especialidad_id: { type: String },
        carnet: { type: Number },
        telefono: { type: String },
        isVerified: { type: Boolean },
        loginAttemps: { type: Number },
        timeout: { type: Date }
    },
    {
        timestamps: true,
        strict: false,
    }
)

export default model("estudiantes", estudianteSchema)
