const express = require('express');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");
const UserModel = require("../models/User.js");

const router = express.Router();

const generateToken = (user = {}) => {
    return jwt.sign({
        id: user.id,
        username: user.name
    }, authConfig.secret , { 
        expiresIn: 86400
    });
}

router.post("/register", async(req, res) => {
   
    const {username} = req.body;

    if (await UserModel.findOne({username})){
        return res.status(400).json({
            error: true,
            message:"Usuario ja Existe",
        })
    }

    const user = await UserModel.create(req.body);

    user.password = undefined;

    return res.json({
        user,
        token: generateToken(user)
    });
})


router.post("/authenticate", async(req, res) =>{
    const {
        username, password
    } = req.body;

    const user = await UserModel.findOne({username}).select("+password");

    if(!user){
        return res.status(400).json({
            error: true,
            message:'Usuario não encontrado'    
        })
    }

    return res.json(user);


});

    if(!await bcrypt.compare(password, user.password)){
        return res.status(400).send({
            erro: true,
            message:'Senha Invalida'
        })
    }

    user.password = undefined;

    const token = jwt.sign({
        id: user.id,
        username: user.name
    }, authConfig.secret , { 
        expiresIn: 86400
    });


    return res.json({
        user,
        token: generateToken(user)
    });


module.exports = router;