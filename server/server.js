require("dotenv").config();
const database = require("./databaseConnection")
const mongoose = require("mongoose");
// mongoose.connect(process.env.MONGO_URL, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
// });
//
// mongoose.connection.on("error", (err) => {
//     console.log("mongoose connection error" + err.message);
// })
// mongoose.connection.once('open', () => {
//     console.log("mongodb connected");
// })
database();
//Bring in the models
require("./models/User");
require("./models/Chatroom");
require("./models/Message");

const app = require("./app");
const PORT = process.env.PORT
const server = app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

const io = require("socket.io")(server, {
    allowEIO3: true,
    cors: {
        origin: "http://localhost/8000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
});

const jwt = require("jwt-then");

const Message = mongoose.model("Message");
const User = mongoose.model("User");

io.use(async (socket, next) => {
    try {
        const token = socket.handshake.query.token;
        const payload = await jwt.verify(token, process.env.SECRET);
        socket.userId = payload.id;
        next();
    } catch (err) {
    }
});
io.on("connection", (socket) => {
    console.log("Connected: " + socket.userId);

    socket.on("disconnect", () => {
        console.log("Disconnected: " + socket.userId);
    });
    socket.on("joinRoom", ({chatroomId}) => {
        socket.join(chatroomId);
        console.log("Odaya biri katıldı" + chatroomId);
    });
    socket.on("leaveRoom", ({chatroomId}) => {
        socket.join(chatroomId);
        console.log("Odadan biri ayrıldı" + chatroomId);
    });
    socket.on("chatroomMessage", async ({chatroomId, message}) => {
        if (message.trim().length > 0) {
            const user = await User.findOne({_id: socket.userId});
            const newMessage = new Message({
                chatroom: chatroomId, user: socket.userId, message
            });
            io.to(chatroomId).emit("newMessage", {
                message,
                name: user.name,
                userId: socket.userId
            });
            await newMessage.save();
        }
    });
});
