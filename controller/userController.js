const {User} = require('../models/user');
const Token = require('../models/token');

const bcrypt = require('bcrypt');
const generateCode = require('../functions/generateCode');
const generateRefreshToken = require('../functions/generateRefreshToken');
const generateAccessToken = require('../functions/generateAccessToken');
const {validationResult} = require('express-validator');
const verifytoken = require('../functions/verifytoken');


const loginController = async (req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.send(errors.array()).status(404);
    const email = req.body.email;
    try{
    const user = await User.findOne({
        email:email
    }).select('email password name _id isVerfied');

    const check = bcrypt.compareSync(req.body.password,user.password);
    if(!check) return res.send({
        message:"password incorrect try again later",
    }).status(402);
    const userObject = {
        id:user._id,
        name:user.name,
        email:user.email,
        isVerfied:user.isVerified,
    }
    if(!user.isVerified){
        // do something
    }
    const token = await Token.findOne({userId:user._id}).select('accessToken refreshToken -_id');
    let refreshToken = token.refreshToken;
    let accessToken = token.accessToken;
    if(!verifytoken(refreshToken,process.env.REFRESH_TOKEN))refreshToken = generateRefreshToken(userObject);
    if(!verifytoken(accessToken,process.env.ACCESS_TOKEN)) accessToken = generateAccessToken(userObject);
    if(!refreshToken || !accessToken) return res.status(500).send({message:"something wrong"});
    return res.cookie('accessToken' , 'bearer ' + accessToken).cookie('refreshToken','bearer ' + refreshToken).send({message:"welcome"});
    }catch(err){
        return res.send({message:"something wrong"}).status(500);
    }
}


const registerController = async (req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty())  return res.send(errors.array()).status(404);
    
    const { email, password, name } = req.body;

    // bcrypting the password
    const salt = await bcrypt.genSalt(10);
    const bcryptedPassword = bcrypt.hashSync(password,salt);

    
        let user = new User({
            email,
            password:bcryptedPassword,
            confirmationCode:generateCode(),
            name,
            isVerified:true,
        });

        const userObject = {
            id:user._id,
            name:user.name,
            email:user.email,
            isVerfied:user.isVerified,
        }
        const refreshToken = generateRefreshToken(userObject);
        const accessToken = generateAccessToken(userObject);
        let token = new Token({
            userId:user._id,
            refreshToken,
            accessToken
    });
    await user.save();
    await token.save();
    return res
    .cookie('accessToken' , 'bearer ' + accessToken)
    .cookie(
        'refreshToken'
        ,refreshToken
    )
    .status(201)
    .send({ 
            message: "User has been created sucessfully" 
     })
}

const refreshAccessTokenController = (req,res)=>{
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.status(404).send({message:'refresh token not found'});
    const results = verifytoken(refreshToken,process.env.REFRESH_TOKEN);
    
    if(!results) return res.status(400).send({message:"refresh token is not valid"});
    const userObject = {
        id:results.id,
        name:results.name,
        email:results.email,
        isVerfied:results.isVerfied,
    }
    const accessToken = generateAccessToken(userObject);
    if(!accessToken) return res.status(500).send({message:"something happened"});
    return res.status(200).cookie('accessToken' , 'bearer ' + accessToken).send({message:"Token refreshed"});
}



const UserController = {
    loginController:loginController,
    registerController:registerController,
    refresh:refreshAccessTokenController,
}
module.exports = UserController;