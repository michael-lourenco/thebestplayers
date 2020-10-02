import React, { useState, useEffect } from "react";
import "./App.css";

import Api from "./Api";

import ChatListItem from "./components/ChatListItem";
import ChatIntro from "./components/ChatIntro";
import ChatWindow from "./components/ChatWindow";
import Login from "./components/Login";
import NewChat from "./components/NewChat";
import NewRank from "./components/NewRank";
import RankListItem from "./components/RankListItem";

import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";

export default () => {

  const [chatList, setChatList] = useState([]);
  const [activeChat, setActiveChat] = useState({});

  const [rankList, setRankList] = useState([]);
  const [activeRank, setActiveRank] = useState({});


  const [user, setUser] = useState({
    id: "pby3eViMeRUgxAIlf3Rib8TV5x73",
    name: "michael",
    avatar:
      "https://web.whatsapp.com/img/intro-connection-light_c98cc75f2aa905314d74375a975d2cf2.jpg",
  });
  const [showNewChat, setShowNewChat] = useState(false);
  const [showNewRank, setShowNewRank] = useState(false);

  useEffect(() => {
    if (user !== null) {
      let unsub = Api.onChatList(user.id, setChatList);
      return unsub;
    }
  }, [user]);

  const handleNewChat = () => {
    setShowNewChat(true);
  };

  useEffect(() => {
    if (user !== null) {
      let unsub = Api.onRankList();
      return unsub;
    }
  }, [user]);

  const handleNewRank = () => {
    setShowNewRank(true);
  };

  const handleLoginData = async (u) => {
    let newUser = {
      id: u.uid,
      name: u.displayName,
      avatar: u.photoURL,
    };
    await Api.addUser(newUser);
    setUser(newUser);
  };

  if (user === null) {
    return <Login onReceive={handleLoginData} />;
  }

  return (
    <div className="app-window">
      <div className="sidebar">
        <NewRank
          chatList={rankList}
          user={user}
          show={showNewRank}
          setShow={setShowNewRank}
        />
        <header>
          <img className="header-avatar" src={user.avatar} alt="" />
          <div className="header-buttons">
            <div className="header-btn">
              <DonutLargeIcon style={{ color: "#919191" }} />
            </div>
            <div onClick={handleNewRank} className="header-btn">
              <ChatIcon style={{ color: "#919191" }} />
            </div>
            <div className="header-btn">
              <MoreVertIcon style={{ color: "#919191" }} />
            </div>
          </div>
        </header>
        <div className="search">
          <div className="search-input">
            <SearchIcon fontSize="small" tyle={{ color: "#919191" }} />
            <input
              type="search"
              placeholder="Procurar ou começar nova conversa"
            />
          </div>
        </div>
        {/* <div className="chatList">
          {chatList.map((item, key) => (
            <ChatListItem
              key={key}
              data={item}
              active={activeChat.chatId === chatList[key].chatId}
              onClick={() => setActiveChat(chatList[key])}
            />
          ))}
        </div> */}
        <div className="rankList">
          {rankList.map((item, key) => (
            <RankListItem
              key={key}
              data={item}
              active={activeRank.rankId === rankList[key].rankId}
              onClick={() => setActiveRank(rankList[key])}
            />
          ))}
        </div> 
      </div>
      <div className="contentarea">
        {activeChat.chatId !== undefined && (
          <ChatWindow user={user} data={activeChat} />
        )}
        {activeChat.chatId === undefined && <ChatIntro />}
      </div>
    </div>
  );
};
