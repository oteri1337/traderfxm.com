require("dotenv").config();
const Web3 = require("web3");
const bip39 = require("bip39");
const fetch = require("isomorphic-fetch");
const hdkey = require("ethereumjs-wallet/hdkey");
const Transaction = require("ethereumjs-tx").Transaction;

const EthereumController = {};

const network = {
  ropsten: "https://ropsten.infura.io/v3/8cf9a54fb6ee4c36a1d416a9cb1d5389",
  mainnet: "https://mainnet.infura.io/v3/8cf9a54fb6ee4c36a1d416a9cb1d5389",
};

const web3 = new Web3(network.mainnet);

EthereumController.create = function (xpubkey, path) {
  let instance = hdkey.fromExtendedKey(xpubkey);
  instance = instance.deriveChild(path);
  instance = instance.getWallet();
  return "0x" + instance.getAddress().toString("hex");
};

EthereumController.validate = function (address) {
  const data = web3.utils.isAddress(address);
  return data;
};

EthereumController.createPaymentAddress = function (path, xpub) {
  let instance = hdkey.fromExtendedKey(xpub || process.env.ETHEREUM_XPUB);
  instance = instance.deriveChild(0).deriveChild(path);
  return "0x" + instance.getWallet().getAddress().toString("hex");
};

EthereumController.createPayment = async function (path) {
  const address = EthereumController.createPaymentAddress(path);

  console.log("deriving with ", path, " ", address);

  const url = `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=QHC5B5ZS434HK6UFH26KS39DWG5E8RAT76`;
  let response = await fetch(url);
  response = await response.json();

  console.log(response);
  console.log(" ");

  if (parseInt(response.result) > 0) {
    return EthereumController.createPayment(path + 1);
  }

  return { address, path };
};

EthereumController.createUsdtPayment = async function (path) {
  const address = EthereumController.createPaymentAddress(path);

  console.log("deriving with ", path, " ", address);

  const url = `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0xdac17f958d2ee523a2206206994597c13d831ec7&address=${address}&tag=latest&apikey=QHC5B5ZS434HK6UFH26KS39DWG5E8RAT76`;
  let response = await fetch(url);
  response = await response.json();

  console.log(response);
  console.log(" ");

  if (parseInt(response.result) > 0) {
    return EthereumController.createPayment(path + 1);
  }

  return { address, path };
};

EthereumController.broadcast = async function (raw, callback) {
  console.log(" ");
  console.log("broadcasting transaction", raw);
  console.log(" ");

  web3.eth.sendSignedTransaction(raw, callback);
};

EthereumController.getPrivateKey = function (phrase, path) {
  const p = parseInt(path);
  const r = "m/44'/60'/0'/0";
  const seed = bip39.mnemonicToSeedSync(phrase);
  const hd = hdkey.fromMasterSeed(seed);
  return hd.derivePath(r).deriveChild(p).getWallet().getPrivateKey();
};

EthereumController.createTransaction = async function (from, to, amount, pKey) {
  const nonce = await web3.eth.getTransactionCount(from);

  const gasLimit = web3.utils.toHex(21000);

  const value = web3.utils.toHex(web3.utils.toWei(amount, "ether"));

  const gasPrice = web3.utils.toHex(web3.utils.toWei("60", "gwei"));

  const txObject = {
    to,
    value,
    nonce,
    gasLimit,
    gasPrice,
  };

  const tx = new Transaction(txObject, {
    chain: "mainnet",
    hardfork: "petersburg",
  });

  tx.sign(pKey);

  const serialized = tx.serialize();

  const raw = "0x" + serialized.toString("hex");

  return raw;
};

EthereumController.createUsdtTx = async function (from, to, amount, pKey) {
  amount = parseFloat(amount) * 1e6;

  let transferAbi = `[{\"constant\":true,\"inputs\":[],\"name\":\"name\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_upgradedAddress\",\"type\":\"address\"}],\"name\":\"deprecate\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_spender\",\"type\":\"address\"},{\"name\":\"_value\",\"type\":\"uint256\"}],\"name\":\"approve\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"deprecated\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_evilUser\",\"type\":\"address\"}],\"name\":\"addBlackList\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"totalSupply\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_from\",\"type\":\"address\"},{\"name\":\"_to\",\"type\":\"address\"},{\"name\":\"_value\",\"type\":\"uint256\"}],\"name\":\"transferFrom\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"upgradedAddress\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"address\"}],\"name\":\"balances\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"decimals\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"maximumFee\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"_totalSupply\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"unpause\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"_maker\",\"type\":\"address\"}],\"name\":\"getBlackListStatus\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"address\"},{\"name\":\"\",\"type\":\"address\"}],\"name\":\"allowed\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"paused\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"who\",\"type\":\"address\"}],\"name\":\"balanceOf\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"pause\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"getOwner\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"symbol\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_to\",\"type\":\"address\"},{\"name\":\"_value\",\"type\":\"uint256\"}],\"name\":\"transfer\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"newBasisPoints\",\"type\":\"uint256\"},{\"name\":\"newMaxFee\",\"type\":\"uint256\"}],\"name\":\"setParams\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"issue\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"redeem\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"_owner\",\"type\":\"address\"},{\"name\":\"_spender\",\"type\":\"address\"}],\"name\":\"allowance\",\"outputs\":[{\"name\":\"remaining\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"basisPointsRate\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"address\"}],\"name\":\"isBlackListed\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_clearedUser\",\"type\":\"address\"}],\"name\":\"removeBlackList\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"MAX_UINT\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnership\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_blackListedUser\",\"type\":\"address\"}],\"name\":\"destroyBlackFunds\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"name\":\"_initialSupply\",\"type\":\"uint256\"},{\"name\":\"_name\",\"type\":\"string\"},{\"name\":\"_symbol\",\"type\":\"string\"},{\"name\":\"_decimals\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"Issue\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"Redeem\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"newAddress\",\"type\":\"address\"}],\"name\":\"Deprecate\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"feeBasisPoints\",\"type\":\"uint256\"},{\"indexed\":false,\"name\":\"maxFee\",\"type\":\"uint256\"}],\"name\":\"Params\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"_blackListedUser\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"_balance\",\"type\":\"uint256\"}],\"name\":\"DestroyedBlackFunds\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"_user\",\"type\":\"address\"}],\"name\":\"AddedBlackList\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"_user\",\"type\":\"address\"}],\"name\":\"RemovedBlackList\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"spender\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Approval\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Transfer\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[],\"name\":\"Pause\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[],\"name\":\"Unpause\",\"type\":\"event\"}]`;

  transferAbi = JSON.parse(transferAbi);

  const contractAddress = "0xdac17f958d2ee523a2206206994597c13d831ec7";

  const contract = new web3.eth.Contract(transferAbi, contractAddress);

  const txCount = await web3.eth.getTransactionCount(from);

  const transfer = await contract.methods.transfer(to, amount).encodeABI();

  const txObject = {
    nonce: txCount,
    data: transfer,
    to: contractAddress,
    gasLimit: web3.utils.toHex(70000),
    value: web3.utils.toHex(web3.utils.toWei("0", "ether")),
    gasPrice: web3.utils.toHex(web3.utils.toWei("90", "gwei")),
  };

  const tx = new Transaction(txObject, {
    chain: "mainnet",
    hardfork: "petersburg",
  });

  tx.sign(pKey);

  const serialized = tx.serialize();

  const raw = "0x" + serialized.toString("hex");

  return raw;
};

EthereumController.checkUsdtBalance = async function (addresses) {
  const balanceAbi = [
    {
      payable: true,
      stateMutability: "payable",
      type: "fallback",
    },
    {
      constant: true,
      inputs: [
        {
          name: "user",
          type: "address",
        },
        {
          name: "token",
          type: "address",
        },
      ],
      name: "tokenBalance",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "users",
          type: "address[]",
        },
        {
          name: "tokens",
          type: "address[]",
        },
      ],
      name: "balances",
      outputs: [
        {
          name: "",
          type: "uint256[]",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
  ];

  const contractAddress = "0xb1f8e55c7f64d203c1400b9d8555d050f94adf39";

  const contract = new web3.eth.Contract(balanceAbi, contractAddress);

  const tokens = ["0xdac17f958d2ee523a2206206994597c13d831ec7"];

  const balances = await contract.methods.balances(addresses, tokens).call();

  let balance_map = {};

  let total = 0;

  for (let i = 0; i < addresses.length; i++) {
    balance_map[addresses[i]] = balances[i] / 1e6;
    total += parseFloat(balances[i]) / 1e6;
  }

  return { balance_map, total };
};

for (let key in EthereumController) {
  if (typeof EthereumController[key] == "function" && key != "model") {
    EthereumController[key] = EthereumController[key].bind(EthereumController);
  }
}

module.exports = EthereumController;
