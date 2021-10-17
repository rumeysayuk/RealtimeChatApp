const mongoose = require("mongoose");
const Chatroom = mongoose.model("Chatroom");
const Message = mongoose.model("Message")
const createChatroom = async (req, res) => {
    const {name} = req.body;
    const oldRoom = await Chatroom.findOne({name});
    if (oldRoom) {
        return res.status(400).json({
            message: "Bu oda adı kullanılıyor ..!"
        })
    }
    const chatroom = await Chatroom.create({
       name,
    });
        res.json({
            message: "Oda oluşturuldu...",
            chatroom
        });
};

const getAllChatrooms = async (req, res) => {
    const chatrooms = await Chatroom.find();
    return res.status(200).json({
        success: true,
         data: chatrooms,
    })
}

const getMessagesByChatroom = async (req, res) => {
    const {id } = req.params
    const messages = await Message.find({chatroom: id})
    return res.status(200).json({
        success: true,
         data: messages,
    })
}
module.exports = {
    createChatroom,
    getAllChatrooms,
    getMessagesByChatroom
}
