import React, { useEffect, useState } from "react";
import HomeTitle from "../components/home/HomeTitle.jsx";
import ChatsList from "../components/home/ChatsList.jsx";
import Header from "../components/home/Header.jsx";
import { displayMessage } from "../backend/notifications/notifications";
import { MessageType } from "../backend/notifications/message";
import { get, post } from "../backend/api";
import InputField from "../components/reg/InputField.jsx";
import Search from "../components/home/Search.jsx";
import { URLs } from "../__data__/urls";

const Home = () => {
  const [chats, setChats] = useState([]);
  const [interlocutor, setInterlocutor] = useState("");

  async function retrieveChats() {
    const username = localStorage.getItem("username");
    if (!username) {
      displayMessage("You're not logged in!", MessageType.WARN);
      return;
    }

    const { ok, data } = await get("/chat/list/" + username);
    if (!ok) {
      displayMessage(data.message, MessageType.ERROR);
      return;
    }

    const sortedChats = data.chats.sort((a, b) => {
      const lastMessageA = new Date(a.lastMessageTimestamp);
      const lastMessageB = new Date(b.lastMessageTimestamp);
      return lastMessageB - lastMessageA;
    });

    setChats(sortedChats);
  }

  async function createChat(alias) {
    const username = localStorage.getItem("username");
    if (!username) {
      displayMessage("You're not logged in!", MessageType.WARN);
      return;
    }

    displayMessage("Sent", MessageType.INFO);

    const { ok, data } = await post("/chat/item/" + username + "/" + alias);
    if (!ok) {
      displayMessage(data.message, MessageType.ERROR);
    } else {
      localStorage.setItem("message", "Successfully opened chat!");
      localStorage.setItem("interlocutorId", alias);
      window.location.href = URLs.chat.url;
    }
  }

  useEffect(() => {
    retrieveChats();
  }, []);

  return (
    <div className="homeWrapper">
      <div className="headerPos">
        <Header />
      </div>

      <HomeTitle />

      <div className="search-input">
        <InputField
          title="Create new chat"
          value={interlocutor}
          setValue={setInterlocutor}
          placeholder="Enter the username (id)"
        />
      </div>

      <Search search={createChat} item={interlocutor} />

      <p>Your chats</p>
      <ChatsList chats={chats} />
    </div>
  );
};

export default Home;
