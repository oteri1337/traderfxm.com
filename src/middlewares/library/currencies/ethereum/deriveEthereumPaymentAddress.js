require("dotenv").config();
const deriveEthereumAddress = require("./deriveEthereumAddress");
const getEthereumAddressTransactions = require("./getEthereumAddressTransactions");

async function deriveEthereumPaymentAddress(path) {
  console.log(path);

  const extendedPublicKey = process.env.ETHEREUM_XPUB;

  let address = deriveEthereumAddress(extendedPublicKey, path);

  const transactions = await getEthereumAddressTransactions(address);

  if (transactions == -1) {
    address = -1;
  } else {
    if (transactions.length > 0) {
      const data = await deriveEthereumPaymentAddress(path + 1);
      return data;
    }
  }

  return { address, path };
}

module.exports = deriveEthereumPaymentAddress;
