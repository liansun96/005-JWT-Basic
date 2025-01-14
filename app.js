require('express-async-errors')

require('dotenv').config()
const express = require('express')
const app = express() 

const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const mainRoute = require('./routes/main')


app.use(express.static('./public'))
app.use(express.json())
app.use('/api/v1' , mainRoute)
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async() => {
    try {
        app.listen(port , console.log(`Server is listening on ${port} . . . `))
    } catch (error) {
        console.log(error);
        
    }
}

start()