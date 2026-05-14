/*
nombre,
apellido,
email,
password,
telefono,
fechaContrato,
isActive,
isVerified,
loginAttemps,
timeOut,
*/

import { Schema, model } from "mongoose"

const maestrosSchema = new Schema(
    {
        nombre :{type: String},
        apellido:{type: String},
        email:{type: String},
        password:{type: String},
        telefono:{type: String},
        fechaContrato:{type: Date},
        isActive: {type: Boolean},
        isVerified:{type: Boolean},
        loginAttemps:{type: Number},
        timeout:{type: Date}
    },
    {
        timestamps:true,
        strict: false,
    }
)

export default model ("maestros", maestrosSchema)