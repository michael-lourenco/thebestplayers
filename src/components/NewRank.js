import React, { useState, useEffect } from "react";
import "./NewRank.css";

import Api from "../Api";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";

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
    <div className="new-rank" style={{ left: show ? "0px" : "-415px" }}>
      <div className="new-rank-head">
        <div onClick={handleClose} className="new-rank-backbutton">
          <ArrowBackIcon style={{ color: "#fff" }} />
        </div>
        <div className="new-rank-headtitle">Nova Conversa</div>
      </div>
      <div className="new-rank-list">
        {list.map((item, key) => (
          <div
            onClick={() => addNewRank(item)}
            className="new-rank-item"
            key={key}
          >
            <img className="new-rank-item-avatar" src={item.avatar} alt="" />
            <div className="new-rank-item-name">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
