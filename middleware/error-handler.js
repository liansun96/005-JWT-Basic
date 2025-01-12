const customAPIError = require("../errors/custom-error")

const errorHandlerMiddleware = (err , req , res , next) => {
    if(err instanceof customAPIError){
        return res.status(err.statusCode).json({msg : err.message})
    }

    return res.status(500).send('Somethings went wrong please try again later')
}

module.exports = errorHandlerMiddleware