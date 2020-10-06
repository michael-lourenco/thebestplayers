import React, { useState, useEffect } from "react";
import "./NewRank.css";

import Api from "../Api";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import imageChallenger from '../Emblem_Challenger.png';

export default ({ ranklist, user, show, setShow }) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const getList = async () => {
      if (user !== null) {
        let results = await Api.getRankList();
        setList(results);
      }
    };
    getList();
  }, [user]);

  const addNewRank = async (user2) => {
    await Api.addNewRank(user, user2);

    handleClose();
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div className="new-rank">
      <div className="new-rank-head">
        <p>data</p>
        <p>pote</p>
        <div onClick={handleClose} className="new-rank-backbutton">
          <ArrowBackIcon style={{ color: "#fff" }} />
        </div>
        <div className="new-rank-headtitle">Ranking</div>
      </div>
      <div className="new-rank-list">
        {list.map((item, key) => (
          <div
            onClick={() => addNewRank(item)}
            className="new-rank-item"
            key={key}
          >
            <img className="new-rank-item-avatar" src={imageChallenger} alt="" />
            <div className="new-rank-item-name">{item.position} - LP - {item.leaguePoints} - {item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
