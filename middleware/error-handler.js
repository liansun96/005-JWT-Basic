const { StatusCodes } = require("http-status-codes")
const {customAPIError} = require("../errors")

const errorHandlerMiddleware = (err , req , res , next) => {
    if(err instanceof customAPIError){
        return res.status(err.statusCode).json({msg : err.message})
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Somethings went wrong please try again later')
}

module.exports = errorHandlerMiddleware