require("dotenv").config();
const deriveBitcoinAddress = require("./deriveBitcoinAddress");
const getBitcoinAddressTransactions = require("./getBitcoinAddressTransactions");

async function deriveBitcoinPaymentAddress(path) {
  console.log(path);

  const extendedPublicKey = process.env.BITCOIN_XPUB;

  let address = deriveBitcoinAddress(extendedPublicKey, path);

  const transactions = await getBitcoinAddressTransactions(address);

  if (transactions == -1) {
    address = -1;
  } else {
    if (transactions.length > 0) {
      const data = await deriveBitcoinPaymentAddress(path + 1);
      return data;
    }
  }

  return { address, path };
}

module.exports = deriveBitcoinPaymentAddress;
