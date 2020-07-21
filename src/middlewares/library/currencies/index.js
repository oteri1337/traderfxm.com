// testing tools
// (xpub analyzer) https://blockpath.com/wallets/local/101?action=appxpub

// ====== create bitcoin extended keys test
// const createBitcoinExtendedKeys = require("./bitcoin/createBitcoinExtendedKeys");

// console.log(createBitcoinExtendedKeys());

// ====== derive bitcoin address test
// const deriveBitcoinAddress = require("./bitcoin/deriveBitcoinAddress");
// const bitcoinExtendedPublicKey =
//   "xpub661MyMwAqRbcF5BwAbnKQb9u9NewMV5xSeLJBEeFjksKA3xQ7FFX5yLkai6TTgmuhDV9hq3nWo1dFdMKWLYjEPm6V6AcYo7CjoG8Rc2GjLb";
// console.log(deriveBitcoinAddress(bitcoinExtendedPublicKey, 0, 0));
// console.log(deriveBitcoinAddress(bitcoinExtendedPublicKey, 0, 1));

// // ====== derive bitcoin address test
// const deriveBitcoinPrivateKey = require("./bitcoin/deriveBitcoinPrivateKey");
// const bitcoinExtendedPrivateKey =
//   "xprv9s21ZrQH143K2b7U4aFK3TDAbLpSx2N75RQhNrEeBRLLHFdFZhwGYB2GjREBbN492dswebV4L7EZWpfjAAaoY6PhwJNEGsRjdGkdTkMDvyW";
// console.log(deriveBitcoinPrivateKey(bitcoinExtendedPrivateKey, 0, 0));
// console.log(deriveBitcoinPrivateKey(bitcoinExtendedPrivateKey, 0, 1));

// ====== read bitcoin address balance test
// const readBitcoinAddressBalance = require("./bitcoin/readBitcoinAddressBalance");

// const address = "142wG62jLHTPpUFq97Z1tgJdkdtvJs2Mh3";

// readBitcoinAddressBalance(address, (r) => console.log(r));

//======= read bitcoin usd balance test
// const readBitcoinUsdRate = require("./bitcoin/readBitcoinUsdRate");

// readBitcoinUsdRate((r) => console.log(r));

// ====== read bitcoin address transactions test
// const readBitcoinAddressTransactions = require("./bitcoin/readBitcoinAddressTransactions");

// readBitcoinAddressTransactions("1LpbtwVwYhCBpRryvWXyHPiDTSJmdQDCt");

// ====== send bitcoin to address
// const sendBitcoinToAddress = require("./bitcoin/sendBitcoinToAddress");

// sendBitcoinToAddress(
//   "148gyqs8CXuEshBQeKi8wu8cvTSvQgvrLp",
//   "854f6e30640987fcd517cf9fe11c24427cb603d627da2c5262f5c0f66a52fb79",
//   "1DTok2JK7UZGv7xuRn3oGTADoqXMn5aeyD",
//   8000
// );

// ====== derive ethereum address
const deriveEthereumAddress = require("./ethereum/deriveEthereumAddress");

const ethereumExtendedPublicKey =
  "xpub6EjhCu3dRWsUr7UPpnCNbfMZ6JLwZvicpzcFeRZ7imoqceKvPC4PihNhGGY75xxRAcQxriwjEzFCB8DCk2vMwb8Ws8xSsuj9M1i4TTmy8BY";

console.log(deriveEthereumAddress(ethereumExtendedPublicKey, 0));

// ==== read ethereum address transactions count
// const readEthereumAddressTransactionsCount = require("./ethereum/readEthereumAddressTransactionsCount");

// async function run() {
//   console.log(
//     await readEthereumAddressTransactionsCount(
//       "0x259fF0d15aE8E7ACaF143c1302b44D2ca96A1948"
//     )
//   );
// }

// run();
