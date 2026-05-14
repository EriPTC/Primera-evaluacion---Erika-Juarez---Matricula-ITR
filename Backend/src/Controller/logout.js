const logoutController = {}

logoutController.logout = (req, res) => {
    try{
        res.clearCookies("authCookie")
        return res.status(200).json({message: "Sesion Cerrada con exito"})

    }catch(error){
        console.log("Error " +error)
        return res.status(500).json
        ({message: "Internal Server Error"})
    }
}

export default logoutController