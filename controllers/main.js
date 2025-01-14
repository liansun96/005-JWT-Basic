const jwt = require('jsonwebtoken');
const customAPIError = require('../errors/custom-error');

const login = async (req , res) => {
    console.log(req.body);    
    const {username , password} = req.body
    console.log(username , password);
    const id = new Date().getDate()

    if(!username || !password){
        throw new customAPIError('Please Provided username & password' , 400)
    }

    const token = jwt.sign({id , username} , process.env.JWT_SECRET , {expiresIn : '30d'})
    console.log(token);    
    
    res.status(201).json({ msg : 'User Created' , token})
}

const dashboard = async (req , res) => {
    const authHeader = req.headers.authorization
    console.log(authHeader);
    
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new customAPIError('No Token Provided' , 400)
    }

    const token = authHeader.split(' ')[1]
    console.log(token);
    
    
    try {
        const luckyNumber = Math.floor(Math.random()*100)
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        console.log(decoded);
        res.status(200).json({msg:`Hello , ${decoded.username} .Here is your authorized data , your lucky number is ${luckyNumber}`})
        
    } catch (error) {
        throw new customAPIError('Not authorized to assess this route' , 401)
    }  

    
}

module.exports = {login , dashboard}






















