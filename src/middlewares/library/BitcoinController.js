require("dotenv").config();
const bip39 = require("bip39");
const bitcore = require("bitcore-lib");
const fetch = require("isomorphic-fetch");
var validate = require("bitcoin-address-validation");

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

BitcoinController.createPayment = async function (path) {
  const { publicKey } = bitcore
    .HDPublicKey(process.env.BITCOIN_XPUB)
    .derive(0)
    .derive(path);
  const address = publicKey.toAddress().toString();

  console.log("deriving with ", path, " ", address);

  const url = `https://api.smartbit.com.au/v1/blockchain/address/${address}`;
  let response = await fetch(url);
  response = await response.json();

  if (response.address.total.received_int > 0) {
    return BitcoinController.createPayment(path + 1);
  }

  return { address, path };
};

BitcoinController.createPaymentAddress = function (path) {
  const { publicKey } = bitcore
    .HDPublicKey(process.env.BITCOIN_XPUB)
    .derive(0)
    .derive(path);
  const address = publicKey.toAddress().toString();
  return address;
};

BitcoinController.getUsdRate = async function () {
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
};

BitcoinController.getUnspent = async function (address, sats) {
  // let url = `https://api.cryptoapis.io/v1/bc/btc/${network}/address/${address}/unspent-transactions`;

  // let response = await fetch(url, {
  //   headers: {
  //     "Content-Type": "application/json",
  //     "X-API-Key": "2a8b24f26842601aa183172d38d919ca20657547",
  //   },
  // });

  // response = await response.json();

  // return response.payload;

  try {
    let url = `https://api.smartbit.com.au/v1/blockchain/address/${address}/unspent`;
    if (network === "testnet") {
      url = `https://testnet-api.smartbit.com.au/v1/blockchain/address/${address}/unspent`;
    }
    console.log("fetching unspent");
    let response = await fetch(url);

    response = await response.json();

    let unspent_sats = 0;
    let unspent = [];
    let item;

    for (let i = 0; i < response.unspent.length; i++) {
      item = response.unspent[i];

      if (unspent_sats <= sats) {
        unspent.push({
          address,
          txid: item.txid,
          vout: item.n,
          scriptPubKey: item.script_pub_key.hex,
          amount: item.value,
          satoshis: item.value_int,
          confirmations: item.confirmations,
        });

        unspent_sats += item.value_int;
      } else {
        break;
      }
    }

    console.log("returned outputs", response.unspent.length);
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
  console.log(" ");
  console.log("broadcating transaction");
  try {
    let url = "https://api.smartbit.com.au/v1/blockchain/pushtx";
    if (network == "testnet") {
      url = "https://testnet-api.smartbit.com.au/v1/blockchain/pushtx";
    }
    let response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ hex }),
    });
    response = await response.json();
    console.log("brodcast succssful", response);
    return response;
  } catch (error) {
    console.log(" ");
    console.log(error.code);

    if (error.code == "ETIMEDOUT" || error.code == "ECONNRESET") {
      console.log("broadcast error", error.code);
      console.log("trying to re broadcast");
      const data = await this.broadcast(hex);
      return data;
    }
  }
};

BitcoinController.getPrivateKey = function (phrase, path) {
  path = parseInt(path);
  const seed = bip39.mnemonicToSeedSync(phrase);
  const node = bitcore.HDPrivateKey.fromSeed(seed, network);
  return node.derive(root).derive(path).privateKey.toString();
};
// prettier-ignore
BitcoinController.createTransaction = function (unspent,from,to,sats,privateKey, fee) {
    const tx = bitcore.Transaction();
    tx.from(unspent);
    tx.to(to, sats);
    tx.change(from);
    tx.sign(privateKey);
    tx.serialize();
    return tx.toString("hex");
};

module.exports = BitcoinController;
