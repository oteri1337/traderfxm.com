const hdkey = require("ethereumjs-wallet/hdkey");

function deriveEthereumAddress(extendedPublicKey, path) {
  let instance = hdkey.fromExtendedKey(extendedPublicKey);
  instance = instance.deriveChild(0).deriveChild(path);
  instance = instance.getWallet();
  return "0x" + instance.getAddress().toString("hex");
}

module.exports = deriveEthereumAddress;
