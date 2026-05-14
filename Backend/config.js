import dotenv from "dotenv";

dotenv.config()

export const config  = {
    db: {URI: process.env.DB_URI },

    JWT: {SECRET: process.env.JWT_SECRET_KEY},

    email:{
        USER_EMAIL:process.env.USER_EMAIL,
        USER_PASSWORD:process.env.USER_PASSWORD
    }

}