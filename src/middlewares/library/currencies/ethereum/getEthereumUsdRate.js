const fetch = require("isomorphic-fetch");

async function readEthereumUsdRate() {
  try {
    let response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
    );
    response = await response.json();
    return response.ethereum.usd;
  } catch (error) {
    console.log(error);
    return -1;
  }
}

module.exports = readEthereumUsdRate;
