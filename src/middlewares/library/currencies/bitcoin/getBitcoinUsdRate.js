const fetch = require("isomorphic-fetch");

async function getBitcoinUsdRate() {
  try {
    let response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
    );
    response = await response.json();
    return response.bitcoin.usd;
  } catch (error) {
    console.log(error);
    return -1;
  }
}

module.exports = getBitcoinUsdRate;
