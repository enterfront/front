import React, { useEffect, useState } from "react";
import Card from "./Card.jsx";
import { get } from "../../backend/api";
import { displayMessage } from "../../backend/notifications/notifications";
import { MessageType } from "../../backend/notifications/message";

const ChatsList = (props) => {
  const { chats } = props;
  const [customChats, setCustomChats] = useState([]);

  const updateList = async () => {
    const username = localStorage.getItem("username");
    if (!username) return null;

    const updatedChats = await Promise.all(
      chats.map(async (chat) => {
        const interlocutorId = chat.id1 === username ? chat.id2 : chat.id1;

        const { ok, data } = await get("/auth/" + interlocutorId);
        if (!ok) {
          displayMessage(data.message, MessageType.ERROR);
          return null;
        }

        const interlocutor = data.user;

        const lastMessage =
          chat.messages.length > 0
            ? chat.messages[chat.messages.length - 1]
            : { data: "", timestamp: new Date(0).toISOString() };

        return {
          id: interlocutorId,
          name: interlocutor.nickname,
          lastMessageData: lastMessage.data,
          lastMessageTimestamp: lastMessage.timestamp,
        };
      })
    );

    const validChats = updatedChats.filter((chat) => chat !== null);

    validChats.sort(
      (a, b) =>
        new Date(b.lastMessageTimestamp) - new Date(a.lastMessageTimestamp)
    );

    setCustomChats(validChats);
  };

  useEffect(() => {
    updateList().then();
  }, [chats]);

  const colorMap = {
    orange: "FFA500FF",
    aqua: "00FFFFFF",
    crimson: "DC143CFF",
    red: "FF0000FF",
    violet: "8A2BE2FF",
    seagreen: "20B2AAFF",
    green: "ADFF2FFF",
    blue: "0000FFFF",
    pink: "FF1493FF",
    cyan: "72FAFAFF",
  };

  function getColor(chatId) {
    const keys = Object.keys(colorMap);
    const numericId = Array.from(chatId).reduce(
      (sum, char) => sum + char.charCodeAt(0),
      0
    );
    const index = numericId % keys.length;
    return colorMap[keys[index]];
  }

  return (
    <div className="ChatsList">
      {customChats.map((item, index) => (
        <Card
          key={index}
          name={item.name}
          lastMessage={item.lastMessageData}
          id={item.id}
          color={getColor(item.id)}
        />
      ))}
    </div>
  );
};

export default ChatsList;
