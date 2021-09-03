// const mongoose = require("mongoose");
// const User = mongoose.model("User");
// const sha256 = require("js-sha256");
// const jwt = require("jwt-then")
//
// exports.register = async (req, res) => {
//     const {name, email, password} = req.body;
//     if (password.length < 6) throw ("Sifre minimum 6 karakter olmalıdır.")
//     const userExists = await User.findOne({
//         email,
//     });
//     if (userExists) throw "Kullanıcı zaten kayıtlı !..";
//     const user = new User({
//         name, email, password: sha256(password + process.env.SECRET),
//     });
//     await user.save();
//     res.json({
//         message: "[" + name + "] başarıyla kaydoldu...",
//
//     })
// };
//
// exports.login = async (req, res) => {
//     const {email, password} = req.body;
//     const user = await User.findOne({
//         email,
//         password: sha256(password + process.env.SALT),
//     });
//
//     // if (!user) throw "Email ve şifre eşleşmedi !..";
//
//     const token = await jwt.sign({id: user.id}, process.env.SECRET);
//
//     res.json({
//         message: "Başarıyla giriş yapıldı",
//         token,
//     });
// };
const User = require("../models/User");
const jwt = require('jsonwebtoken');

const login = (async (req, res, next) => {
    const {email, password} = req.body;
    const oldUser = await User.findOne({email}).select("+password");
    // if (!oldUser) return next(new CustomError("Böyle Bir Kullanıcı Bulunamadı", 400));
    if (!oldUser) {
        return next("Please Check Your Inputs!", 400);
    }

    // return res.status(400).json({message: "Hatalı Şifre"});
    const token = jwt.sign({email: oldUser.email, id: oldUser._id}, process.env.SECRET, {expiresIn: "1h"})

    return res.status(200).json({result: oldUser, token})
})

module.exports = {
    login,
    //signUp,
    //likeUndoLikePost
}
