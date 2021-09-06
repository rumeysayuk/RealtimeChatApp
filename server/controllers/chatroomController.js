const mongoose = require("mongoose");
const Chatroom = mongoose.model("Chatroom");

const createChatroom = async (req, res) => {
    const {name} = req.body;
    const oldRoom = await Chatroom.find({name});
    console.log(oldRoom)
    if (oldRoom) {
        return res.status(400).json({
            message: "Bu oda adı kullanılıyor ..!"
        })
    }
    const chatroom = await Chatroom.create({
        ...req.body,
    });
    chatroom.save().then(() => {
        res.status(201).json({
            message: "Oda oluşturuldu...",
            chatroom,
        });
    });
};

const getAllChatrooms = async (req, res) => {
    const chatrooms = await Chatroom.find();
    console.log(chatrooms)
    return res.status(200).json({
        success: true,
        data: chatrooms,
    })
}
module.exports = {
    createChatroom,
    getAllChatrooms,
}
