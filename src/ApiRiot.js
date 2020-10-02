import Api from "./Api";
const fetch = require("node-fetch");


const getRanks = async () => {
  const result = await fetch(
    `${process.env.REACT_APP_BASE_URL_API_RIOT}/ranks`
  );
  const data = await result.json();
  console.log(data)
  for(let item of data){
      Api.addRank(item)
  }
  return data;
};

export default getRanks;
