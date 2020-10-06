import Api from "./Api";
const fetch = require("node-fetch");


const updateRanks = async () => {
  const data = await fetch(`${process.env.REACT_APP_BASE_URL_API_RIOT}/br`);
  const result = await data.json();
  console.log('resultado',JSON.stringify(result))
  for(let i=0;i<=result.length;i++){
      result[i].position=i+1;
      Api.addRank(result[i])
      console.log(result[i])
  }
  return result;
};

export default updateRanks;
