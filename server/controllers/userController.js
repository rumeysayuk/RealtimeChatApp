const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const register = async (req, res) => {
    const {name, email, password} = req.body;
    const oldUser = await User.findOne({email})
    if (oldUser) return res.status(400).json({message: "Bu Email'e Kayıtlı Kullanıcı Mevcut"})
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
        email,
        password: hashedPassword,
        name,
    });
    const token = jwt.sign({email: result.email, id: result._id}, process.env.SECRET, {expiresIn: "5h"})
    return res.status(201).json({result, token, message: "Kayıt olma işlemi başarılı..."})
}

const login = async (req, res, next) => {
    const {email, password} = req.body;
    const oldUser = await User.findOne({email}).select("+password");
    if (!oldUser) return next("Böyle Bir Kullanıcı Bulunamadı", 400);
    if (!oldUser) {
        return next("Please Check Your Inputs!", 400);
    }
    const token = jwt.sign({email: oldUser.email, id: oldUser._id}, process.env.SECRET, {expiresIn: "5h"})

    return res.status(200).json({result: oldUser, token, message: "Giriş işlemi başarılı..."})
}


module.exports = {
    login,
    register,

}
