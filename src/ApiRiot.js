import Api from "./Api";
const fetch = require("node-fetch");


const updateRanks = async () => {
  const data = await fetch(`${process.env.REACT_APP_BASE_URL_API_RIOT}/br`);
  const result = await data.json();
  console.log('resultado',JSON.stringify(result))
  for(let item of result){
      Api.addRank(item)
      console.log(item)
  }
  return result;
};

export default updateRanks;
