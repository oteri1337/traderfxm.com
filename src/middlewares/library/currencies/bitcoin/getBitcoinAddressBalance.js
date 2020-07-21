const fetch = require("isomorphic-fetch");

async function getBitcoinAddressBalance(address) {
  try {
    let response = await fetch(
      `https://insight.bitpay.com/api/addr/${address}`
    );
    response = await response.json();
    return response.balance;
  } catch (error) {
    console.log(error);
    return -1;
  }
}

module.exports = getBitcoinAddressBalance;
