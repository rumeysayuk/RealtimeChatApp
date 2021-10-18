import api from "../lib/axios/axios";

export const getMessages = (chatroomId) => api.get("chatroom/getMessages/" + chatroomId)
export const createChatroom = (data) => api.post("chatroom", {name: data})
export const getChatroom = () => api.get("chatroom")

