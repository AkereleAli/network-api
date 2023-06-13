const bcrypt = require('bcrypt');
const saltRounds = 10;
const {v4:uuidv4} = require("uuid")
const sendEmail = require('../services/sengrid')
const validateVisitors = require('../validations/visitorsValidation')
const validateVisitorsLogin = require('../validations/visitorsLoginValidation')
const generateOtp = require('../services/sendOtp')
const {getVisitorFromDB, insertVisitorToDB} = require('../models/visitorsModel')



const newVisitor = async(req,res)=>{
    try{
        const { username, password, email, phone} = req.body
        const { error, value } = validateVisitors(req.body)
    if(error !== undefined) {
         res.status(400).json({
            status: "false",
            msg: error.details[0].message 

        })
        return
    }

    const userAlreadyExists = await getVisitorFromDB(email)
    if(userAlreadyExists.length !==0) {
       return  res.status(400).json({
            status: "false",
            msg: "User already exists"
        })
    }

    const passwordSalt = await bcrypt.genSalt(saltRounds)
    if (!passwordSalt) {
        res.status(500).json({
            status: false,
            message: 'Sorry , we cannot create account this time, try again later'
        })
        return
    }
    const passwordHarsh  = await bcrypt.hash(password, passwordSalt)
    //console.log(passwordHarsh)
    if (!passwordHarsh) {
        res.status(500).json({
            status: false,
            message: 'Sorry , we cannot create account this time, try again later'
        })
        return
    }
    const visitor_id = uuidv4()
    await insertVisitorToDB(visitor_id, username, email, passwordSalt, passwordHarsh, phone)
    
    const otp = generateOtp()
    sendEmail(email, 'OTP Verification', `Hi ${username}, Your OTP is ${otp}. Kindly note that this OTP expires in 5 minutes.`)
    res.status(201).json({
        status: true,
        message: 'An otp has been sent to your email, use that to complete your registration',
        
    })

    }catch(error){
        console.log(error)

    }
}


const visitorLogin = async(req,res)=>{
    try{
        const{email, password} = req.body
        const { error, value } = validateVisitorsLogin(req.body)
    if(error !== undefined) {
         res.status(400).json({
            status: "false",
            msg: error.details[0].message 

        })
        return
    }
    const findVisitor = await getVisitorFromDB(email)
    if(findVisitor.length == 0) {
       return  res.status(400).json({
            status: "false",
            msg: "invalid email or password"
        })
    }
    const visitorHash = findVisitor.map(item=> item.passwordHarsh)
    const comparePassword = await bcrypt.compare(password,visitorHash[0])
    if(!comparePassword) {
        return  res.status(400).json({
             status: "false",
             msg: "invalid email or password"
         })
     }

     res.status(200).json({
        status: true,
        message: 'Login successful'
    })

    }catch(error){
        console.log(error)
    }
}




module.exports = {newVisitor, visitorLogin}



