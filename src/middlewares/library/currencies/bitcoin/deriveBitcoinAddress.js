const bitcore = require("bitcore-lib");

function deriveBitcoinAddress(extendedPublicKey, path2, path1 = 0) {
  extendedPublicKey = bitcore.HDPublicKey(extendedPublicKey);
  const publicKey = extendedPublicKey.derive(path1).derive(path2).publicKey;
  return publicKey.toAddress().toString();
}

module.exports = deriveBitcoinAddress;
