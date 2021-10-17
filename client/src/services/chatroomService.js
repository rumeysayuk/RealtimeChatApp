import api from "../lib/axios/axios";

export const getMessages = (chatroomId) => api.get("chatroom/getMessages/" + chatroomId)
