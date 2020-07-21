const fetch = require("isomorphic-fetch");

Object.defineProperty(global, "_bitcore", {
  get() {
    return undefined;
  },
  set() {},
});

const bitcore = require("bitcore-lib");
// const Insight = require("bitcore-explorers").Insight;

async function sendBitcoinToAddress(from, privateKey, toAddress, amount) {
  // const insight = new Insight("testnet");
  // insight.getUnspentUtxos(fromAddress, (error, utxos) => {
  //   if (error) {
  //     console.log("error", error);
  //     return false;
  //   }

  //   console.log("utox", utxos);

  try {
    const url = `https://testnet-api.smartbit.com.au/v1/blockchain/address/${from}/unspent`;
    let response = await fetch(url);
    response = await response.json();

    const transaction = bitcore.Transaction();
    transaction.from(response.unspent);
    transaction.fee(19);
    transaction.to(toAddress, amount);
    transaction.change(from);
    transaction.sign(privateKey);
    transaction.serialize();

    console.log(transaction);

    return { errors: [], data: {}, message: `${amount} BTC SENT` };
  } catch (error) {
    console.log(error);
    return { errors: [error.message], data: {}, message: "" };
  }

  // insight.broadcast(transaction, (error, transactionId) => {
  //   console.log(error);
  //   console.log(transactionId);
  // });

  // console.log(utxos);

  // transaction.change(fromAddress);
  // transaction.serialize();

  // console.log(transaction);
  // });
}

module.exports = sendBitcoinToAddress;
