import React from "react";
import "./ChatIntro.css";
import updateRanks from '../ApiRiot';


//updateRanks()

export default () => {
  return (
    <div className="chatIntro">
      <img
        src="https://www.pinnacle.com/Cms_Data/Contents/Guest/Media/esports2017/Article-Images/LoL/2018-Worlds-Final/article-esports-lol-championship-2018-hero.jpg"
        alt=""
      />
      <h1>The Best Players</h1>
      <h2>
      Temos como objetivo incentivar os jogadores da Solo Queue BR a se empenharem ao máximo, de forma que o cenário melhore como um todo.
      </h2>
      <p>Obs: Este é apenas um conteúdo de estudos, não tem nenhum vinculo com a Riot ou qualquer empresa ligada ao LOL.</p>
    </div>
  );
};
