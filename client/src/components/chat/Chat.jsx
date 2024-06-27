import { useContext, useEffect, useRef, useState } from "react";
import "./chat.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../api/apiRequest";
import { AuthContext } from "../../context/AuthContext";
import { format } from "timeago.js";
import { SocketContext } from "../../context/SocketContext";
import { useNotificationStore } from "../../lib/useNotificationStore";

const Chat = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [receiver, setReceiver] = useState(null);
  const [chat, setChat] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const [text, setText] = useState("");
  const { decrease } = useNotificationStore((state) => state);
  const queryClient = useQueryClient();
  const messageEndRef = useRef();

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [chat]);

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
        if (!res.data.seenBy.includes(currentUser.id)) {
          decrease();
        }
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
        setChat((prev) => ({ ...prev, Message: [...prev.Message, res.data] }));
        socket.emit("sendMessage", {
          receiverId: receiver.id,
          data: res.data,
        });
        return res.data;
      } catch (err) {
        console.log(err);
      }
    },
  });

  useEffect(() => {
    if (chat && socket) {
      socket.on("getMessage", (data) => {
        if (chat.id === data.chatId) {
          setChat((prev) => ({ ...prev, Message: [...prev.Message, data] }));
        }
      });
    }
    return () => {
      socket.off("getMessage");
    };
  }, [chat, socket]);

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
    // mutate(chat.id);
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
              chat.Message.map((message) => {
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
            <div ref={messageEndRef}></div>
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
