import { useContext, useState } from "react";
import "./chat.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../api/apiRequest";
import { AuthContext } from "../../context/AuthContext";
import { format } from "timeago.js";

const Chat = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [receiver, setReceiver] = useState(null);
  const [chat, setChat] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const [text, setText] = useState("");
  const queryClient = useQueryClient();
  const { data: chats, isLoading } = useQuery({
    queryFn: async () => {
      try {
        const res = await apiRequest.get("/chat/getChats");
        return res.data;
      } catch (err) {
        console.log(err);
      }
    },
    queryKey: ["getChats"],
  });

  const { mutate, data: chatData } = useMutation({
    mutationFn: async (chatId) => {
      try {
        const res = await apiRequest.get(`/chat/getChat/${chatId}`);
        setChat(res.data);
        return res.data;
      } catch (err) {
        console.log(err);
      }
    },
    mutationKey: ["getChat"],
  });

  const sendMessage = useMutation({
    mutationFn: async (text) => {
      try {
        const res = await apiRequest.post(`/message/addMessage/${chat.id}`, {
          text,
        });
        return res.data;
      } catch (err) {
        console.log(err);
      }
    },
  });
  const handleChatClick = (chatId, e, receiver) => {
    setReceiver(receiver);
    if (!chatOpen) {
      mutate(chatId);
    }
    setChatOpen(!chatOpen);
    e.currentTarget.style.backgroundColor = "white";
  };

  const handleTextSubmit = async (e) => {
    e.preventDefault();
    if (!text) return;
    await sendMessage.mutateAsync(text);
    mutate(chat.id);
    queryClient.invalidateQueries({ queryKey: ["getChats"] });
    setText("");
  };

  if (isLoading) return <div>Loading ...</div>;
  return (
    <div className="chat">
      <h1>Messages</h1>
      <div className="messages">
        {chats &&
          chats.map((message) => {
            const { receiver } = message;
            return (
              <div
                className="message"
                key={message.id}
                onClick={(e) => handleChatClick(message.id, e, receiver)}
                style={{
                  backgroundColor: message.seenBy.includes(currentUser.id) ? "white" : "#fecd514e",
                }}
              >
                <img src={message.receiver.avatar || "/noavatar.jpg"} alt="img" />
                <span>{message.receiver.username}</span>
                <p>{message.lastMessage}</p>
              </div>
            );
          })}
      </div>
      {chatOpen && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img src={receiver.avatar || "/noavatar.jpg"} alt="img" />
              {receiver.username}
            </div>
            <span className="close" onClick={() => setChatOpen(!chatOpen)}>
              X
            </span>
          </div>
          <div className="center">
            {chatData &&
              chatData.Message.map((message) => {
                return (
                  <div
                    className={message.userId === currentUser.id ? "chatMessage own" : "chatMessage"}
                    key={message.id}
                  >
                    <p>{message.text}</p>
                    <span>{format(message.createdAt)}</span>
                  </div>
                );
              })}
          </div>
          <form className="bottom" onSubmit={handleTextSubmit}>
            <textarea name="text" value={text} onChange={(e) => setText(e.target.value)}></textarea>
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chat;
