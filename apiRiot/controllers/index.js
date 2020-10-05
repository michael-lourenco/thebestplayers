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

async function getOnlyFirstBrRankSolo5x5() {
  const allBr =  await fetch(
      `https://br1.${process.env.API_BASE_URL}/lol/league-exp/v4/entries/RANKED_SOLO_5x5/CHALLENGER/I?page=1&api_key=${process.env.API_KEY}`
    )
      .then(toJson)
      .then(myMap(extractSummonerNameAndLeaguePoints))
      .then((first) => {
        return {...first
        };
      });
    let allFirst3Br=[];
      for (let i=0;i<=2;i++){
      allFirst3Br.push(allBr[i])
    }
    // const arrayDez = Object.entries(allBr).slice(0,10)

    // const allFirst10Br = arrayDez.map(item=>{
    //  return item
    // })
  return allFirst3Br;
  
}

const getOnlyFirstWorldRank = async (req, res) => {
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

const getOnlyFirstBrRank = async (req, res) => {
  const payload = await getOnlyFirstBrRankSolo5x5();

  console.log(payload);
  res.send(JSON.stringify(payload));
};

module.exports = {
  getOnlyFirstWorldRank,
  getOnlyFirstBrRank
};
