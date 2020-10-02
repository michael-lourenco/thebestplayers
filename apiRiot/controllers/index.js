const fetch = require("node-fetch");
const packageJSon = require("../package.json");
const { reponseErrorJson, responseJson } = require("../utils/controller");
const REGION_URL = require("../utils/region-url");

function toJson(data) {
  return data.json();
}

function myMap(funcao) {
  return function (array) {
    return array.map(funcao);
  };
}

function extractAllSummonerInfo(item) {
  return item;
}

function extractSummonerNameAndLeaguePoints(item) {
  const summonerNameAndLeaguePoints = {
    leaguePoints: item.leaguePoints,
    summonerName: item.summonerName,
  };
  return item;
}


async function getOnlyFirstWorldRankSolo5x5() {
  const allFirstOfWorld = REGION_URL.map((item) => {
    return fetch(
      `https://${item}.${process.env.API_BASE_URL}/lol/league-exp/v4/entries/RANKED_SOLO_5x5/CHALLENGER/I?page=1&api_key=${process.env.API_KEY}`
    )
      .then(toJson)
      .then(myMap(extractSummonerNameAndLeaguePoints))
      .then((first) => {
        return {...first[0],
                region:item
        };
      });
  });
  return allFirstOfWorld;
}

const get = async (req, res) => {
  const getRank = await getOnlyFirstWorldRankSolo5x5();
  const payload = [];
  for (let i = 0; i < getRank.length; i++) {
    console.log("RANK LENGHT", getRank.length);
    const player = await getRank[i];
    console.log("RANK", player);
    payload.push(player);
  }

  console.log(payload);
  res.send(JSON.stringify(payload));
};

module.exports = {
  get,
};
