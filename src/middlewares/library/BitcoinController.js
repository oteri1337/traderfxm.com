require("dotenv").config();
const bip39 = require("bip39");
const bitcore = require("bitcore-lib");
const fetch = require("isomorphic-fetch");
var validate = require("bitcoin-address-validation");
const { response } = require("express");

const BitcoinController = {};

const network = "livenet";

const root = "m/44'/1'/0'/0";

BitcoinController.create = function (xpubkey, path) {
  path = parseInt(path);
  const { publicKey } = bitcore.HDPublicKey(xpubkey).derive(path);
  return publicKey.toAddress().toString();
};

BitcoinController.validate = function (address) {
  const data = validate(address);

  if (data.network == "mainnet") {
    return true;
  }

  return false;
};

BitcoinController.createPaymentAddress = function (path, xpub) {
  const { publicKey } = bitcore
    .HDPublicKey(xpub || process.env.BITCOIN_XPUB)
    .derive(0)
    .derive(path);
  const address = publicKey.toAddress().toString();
  return address;
};

BitcoinController.createPayment = async function (path) {
  const address = BitcoinController.createPaymentAddress(path);

  // console.log("deriving with ", path, " ", address);

  // const url = `https://insight.bitpay.com/api/addr/${address}/totalReceived`;
  const url = `https://blockchain.info/rawaddr/${address}`;
  let response = await fetch(url);
  response = await response.json();

  // console.log(response);

  if (response.total_received > 0) {
    return BitcoinController.createPayment(path + 1);
  }

  return { address, path };
};

BitcoinController.getUnspent = async function (address, sats) {
  console.log("fetching unspent");

  try {
    let url = `https://insight.bitpay.com/api/addr/${address}/utxo`;
    let response = await fetch(url);
    response = await response.json();

    let unspent_sats = 0;
    let unspent = [];
    // let item;

    for (let i = 0; i < response.length; i++) {
      // item = response[i];

      if (unspent_sats <= sats) {
        unspent.push(response[i]);

        unspent_sats += response[i].satoshis;
      } else {
        break;
      }
    }

    console.log("returned outputs", response.length);
    console.log("used outputs", unspent.length);

    return unspent;
  } catch (error) {
    console.log(" ");
    console.log(error.code);

    if (error.code == "ETIMEDOUT" || error.code == "ECONNRESET") {
      console.log("unspent error", error.code);
      console.log("trying to refetch unspent");
      const data = await this.getUnspent(address, sats);
      return data;
    }
  }
};

BitcoinController.broadcast = async function (hex) {
  if (hex === undefined) {
    return { errors: ["transaction hex is required"], data: {}, message: "" };
  }

  console.log("broadcating transaction ");
  const body = JSON.stringify({ rawtx: hex });
  console.log("body", body);

  try {
    let url = "https://insight.bitpay.com/api/tx/send";
    let response = await fetch(url, {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body,
    });

    response = await response.json();

    console.log("brodcast succssful", response);
    return response;
  } catch (error) {
    console.log("error broadcasting transaction", error);
    return { errors: ["broadcast error"], data: {}, message: "" };
  }
};

BitcoinController.getPrivateKey = function (phrase, path) {
  path = parseInt(path);
  const seed = bip39.mnemonicToSeedSync(phrase);
  const node = bitcore.HDPrivateKey.fromSeed(seed, network);
  return node.derive(root).derive(path).privateKey.toString();
};
// prettier-ignore
BitcoinController.createTransaction = function (unspent,from,to,sats,privateKey) {
    const tx = bitcore.Transaction();
    tx.from(unspent);
    tx.to(to, sats);
    tx.change(from);
    tx.sign(privateKey);
    tx.serialize();
    return tx.toString("hex");
};

module.exports = BitcoinController;
