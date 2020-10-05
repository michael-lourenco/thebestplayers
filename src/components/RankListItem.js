import React, { useState, useEffect } from "react";
import "./RankListItem.css";

export default ({ onClick, active, data }) => {
  //const [time, setTime] = useState("");

//   useEffect(() => {
//     if (data.date > 0) {
//       let d = new Date(data.date.seconds * 1000);
//       let hours = d.getHours();
//       let minutes = d.getMinutes();
//       hours = hours < 10 ? "0" + hours : hours;
//       minutes = minutes < 10 ? "0" + minutes : minutes;
//       setTime(`${hours}:${minutes}`);
//     }
//   }, [data]);

  return (
    <div className={`rankListItem ${active ? "active" : ""}`} onClick={onClick}>
      <div className="rankListItem-lines">
        <div className="rankListItem-line">
          <div className="rankListItem-name">{data.name}</div>
          <div className="rankListItem-date">{data.leaguePoints}</div>
        </div>
        <div className="rankListItem-line">
          <div className="rankListItem-lastMsg">
            <p>{data.tier}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
