const web3 = require("web3");
const HDWalletProvider = require("truffle-hdwallet-provider");

const provider = new HDWalletProvider(
  "a6116be1c9504a6d9a2565fee811fb10",
  "https://mainnet.infura.io/v3/fe9235cb4c15462d88253cfa4d6e6fa9"
);

const ethereum = new web3(provider);

function createWallet() {
  const wallet = ethereum.eth.accounts.create();
  return {
    ethereum_key: wallet.privateKey,
    ethereum_address: wallet.address
  };
}

function getEmptyAddress() {
  return "1A5Mp8jHcMJEqZUmcsbmtqXfsiGdWYmp6y";
}

function getTransactions() {}

async function getUsdRate() {}

async function getBalance() {
  const balance = await ethereum.eth.getBalance(address);
  return ethereum.utils.fromWei(balance);
}

exports.getBalance = getBalance;
exports.createWallet = createWallet;
exports.getEmptyAddress = getEmptyAddress;
