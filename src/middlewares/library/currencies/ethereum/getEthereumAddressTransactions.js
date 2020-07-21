const fetch = require("isomorphic-fetch");

async function getEthereumAddressTransactions(address) {
  try {
    const url = `https://api.ethplorer.io/getAddressTransactions/${address}?apiKey=freekey`;
    let response = await fetch(url);
    response = await response.json();
    return response;
  } catch (error) {
    console.log(error);
    return -1;
  }
}

module.exports = getEthereumAddressTransactions;
