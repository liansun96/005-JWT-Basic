const jwt = require('jsonwebtoken')
const {customAPIError, BadRequestError} = require('../errors')

const login = async (req , res) => {
    // console.log(req.body);    
    const {username , password} = req.body    
    const id = new Date().getDate()

    if(!username || !password){
        throw new BadRequestError('Please Provided username & password')
    }

    const token = jwt.sign({id , username} , process.env.JWT_SECRET , {expiresIn : '30d'})       
    
    res.status(201).json({ msg : 'User Created' , token})
}

const dashboard = async (req , res) => {   
    console.log(req.user);    
    const luckyNumber = Math.floor(Math.random()*100)    
    
    res.status(200).json({
        msg:`Hello , ${req.user.username}.` , 
        secret : `Here is your authorized data , your lucky number is ${luckyNumber}`
    })   
}

module.exports = {login , dashboard}






















