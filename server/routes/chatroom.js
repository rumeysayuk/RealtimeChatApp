const router = require("express").Router();
const {catchErrors} = require("../handlers/errorHandlers");
const chatroomController = require("../controllers/chatroomController");

const auth = require("../middlewares/auth");
router.get("/", auth, catchErrors(chatroomController.getAllChatrooms));
router.get("/getMessages/:id", auth, catchErrors(chatroomController.getMessagesByChatroom));
router.post("/", catchErrors(chatroomController.createChatroom));

module.exports = router;
