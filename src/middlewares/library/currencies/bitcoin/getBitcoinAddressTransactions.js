const fetch = require("isomorphic-fetch");

async function getBitcoinAddressTransactions(address) {
  try {
    const url = `https://insight.bitpay.com/api/txs/?address=${address}`;
    let response = await fetch(url);
    response = await response.json();
    return response.txs;
  } catch (error) {
    console.log(error);
    return -1;
  }
}

module.exports = getBitcoinAddressTransactions;
