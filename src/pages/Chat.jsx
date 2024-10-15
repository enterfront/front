import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Chat.css";
import { FaPaperPlane, FaSmile } from "react-icons/fa";
import { get, post } from "../backend/api";
import { displayMessage } from "../backend/notifications/notifications";
import { MessageType } from "../backend/notifications/message";
import io from "socket.io-client";

const emojis = [
  "😀",
  "😁",
  "😂",
  "🤣",
  "😃",
  "😄",
  "😅",
  "😆",
  "😉",
  "😊",
  "😋",
  "😎",
  "😍",
  "😘",
  "🥰",
  "😗",
  "😙",
  "😚",
  "🙂",
  "🤗",
  "🤩",
  "🤔",
  "😐",
  "😑",
  "😶",
  "🙄",
  "😏",
  "😣",
  "😥",
  "😮",
  "🤐",
  "😯",
  "😪",
  "😫",
  "😴",
  "😌",
  "😛",
  "😜",
  "🤪",
  "🤨",
  "😝",
  "🤑",
  "😒",
  "😓",
  "😔",
  "😕",
  "😖",
  "😞",
  "😟",
  "😠",
  "😡",
  "🤬",
  "😱",
  "😨",
  "😧",
  "😇",
  "🥳",
  "🥺",
  "😻",
  "😼",
  "😽",
  "🙈",
  "🙉",
  "🙊",
  "💀",
  "👻",
  "👽",
];

const Chat = () => {
  const [interlocutorId, setInterlocutorId] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const socket = useRef(null);
  const chatRef = useRef(null);
  const navigate = useNavigate();

  const [myId, setMyId] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("interlocutorId");
    setInterlocutorId(id);

    const username = localStorage.getItem("username");
    setMyId(username);

    if (!id || !username) {
      displayMessage("You are not logged in!", MessageType.WARN);
      return () => {};
    }

    socket.current = io("http://localhost:8099");

    socket.current.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.current.on("connect_error", (err) => {
      console.error("Connection Error:", err.message);
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    // retrieveMessages().then();
    const interval = setInterval(() => {
      retrieveMessages().then()
    }, 2000);

    return () => clearInterval(interval)
  }, [myId, interlocutorId]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  async function sendMessageToDB(messageData) {
    const { ok, data } = await post(
      "/chat/message/" + myId + "/" + interlocutorId,
      { message: messageData }
    );
    if (!ok) {
      displayMessage(data.message, MessageType.ERROR);
    }
  }

  async function retrieveMessages() {
    if (!myId || !interlocutorId) return;

    const { ok, data } = await get("/chat/item/" + myId + "/" + interlocutorId);
    if (!ok) {
      displayMessage(data.message, MessageType.ERROR);
      return;
    }
    setMessages(data.chat.messages);
  }

  const sendMessage = () => {
    if (newMessage.trim()) {
      const messageData = {
        senderId: myId,
        recipientId: interlocutorId,
        data: newMessage,
        timestamp: new Date().toLocaleString(),
      };
      socket.current.emit("sendMessage", messageData);
      setMessages((prev) => [...prev, messageData]);
      sendMessageToDB(messageData).then();
      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const handleEmojiSelect = (emoji) => {
    setNewMessage((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat with ... (id = {interlocutorId})</h2>
        <button
          onClick={() => navigate("/enterfront/home")}
          className="home-button"
        >
          Home
        </button>
      </div>
      <div className="chat-messages" ref={chatRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-bubble ${
              msg.senderId === myId ? "sent" : "received"
            }`}
          >
            <div className="message-content">
              <b>{msg.senderId === myId ? "You" : "They"}:</b> {msg.data}
            </div>
            <span className="message-timestamp">{msg.timestamp}</span>
          </div>
        ))}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="chat-input"
          onKeyDown={handleKeyPress}
        />
        <button
          className="emoji-button"
          onClick={() => setShowEmojiPicker((prev) => !prev)}
        >
          <FaSmile />
        </button>
        <button onClick={sendMessage} className="send-button">
          <FaPaperPlane />
        </button>
        {showEmojiPicker && (
          <div className="emoji-picker">
            {emojis.map((emoji, index) => (
              <span
                key={index}
                className="emoji"
                onClick={() => handleEmojiSelect(emoji)}
                style={{ cursor: "pointer", padding: "5px" }}
              >
                {emoji}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
