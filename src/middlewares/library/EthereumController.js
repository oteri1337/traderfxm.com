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

const abiArray = [
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        name: "success",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

const erc20TokenContractAbi = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "spender", type: "address" },
      { name: "tokens", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "success", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "from", type: "address" },
      { name: "to", type: "address" },
      { name: "tokens", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "success", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ name: "amount", type: "uint256" }],
    name: "withdrawEther",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "_totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "tokenOwner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "owner",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { name: "a", type: "uint256" },
      { name: "b", type: "uint256" },
    ],
    name: "safeSub",
    outputs: [{ name: "c", type: "uint256" }],
    payable: false,
    stateMutability: "pure",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "to", type: "address" },
      { name: "tokens", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "success", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { name: "a", type: "uint256" },
      { name: "b", type: "uint256" },
    ],
    name: "safeDiv",
    outputs: [{ name: "c", type: "uint256" }],
    payable: false,
    stateMutability: "pure",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "spender", type: "address" },
      { name: "tokens", type: "uint256" },
      { name: "data", type: "bytes" },
    ],
    name: "approveAndCall",
    outputs: [{ name: "success", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { name: "a", type: "uint256" },
      { name: "b", type: "uint256" },
    ],
    name: "safeMul",
    outputs: [{ name: "c", type: "uint256" }],
    payable: false,
    stateMutability: "pure",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "newOwner",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "tokenAddress", type: "address" },
      { name: "tokens", type: "uint256" },
    ],
    name: "transferAnyERC20Token",
    outputs: [{ name: "success", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { name: "tokenOwner", type: "address" },
      { name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "remaining", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { name: "a", type: "uint256" },
      { name: "b", type: "uint256" },
    ],
    name: "safeAdd",
    outputs: [{ name: "c", type: "uint256" }],
    payable: false,
    stateMutability: "pure",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ name: "_newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  { payable: true, stateMutability: "payable", type: "fallback" },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "_from", type: "address" },
      { indexed: true, name: "_to", type: "address" },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "from", type: "address" },
      { indexed: true, name: "to", type: "address" },
      { indexed: false, name: "tokens", type: "uint256" },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "tokenOwner", type: "address" },
      { indexed: true, name: "spender", type: "address" },
      { indexed: false, name: "tokens", type: "uint256" },
    ],
    name: "Approval",
    type: "event",
  },
];

EthereumController.create = function (xpubkey, path) {
  let instance = hdkey.fromExtendedKey(xpubkey);
  instance = instance.deriveChild(path);
  instance = instance.getWallet();
  return "0x" + instance.getAddress().toString("hex");
};

EthereumController.validate = function (address) {
  const data = web3.utils.isAddress(address);

  console.log(data);

  return data;
};

EthereumController.createPayment = async function (path) {
  let instance = hdkey.fromExtendedKey(process.env.ETHEREUM_XPUB);
  instance = instance.deriveChild(0).deriveChild(path);
  instance = instance.getWallet();
  const address = "0x" + instance.getAddress().toString("hex");

  console.log("deriving with ", path, " ", address);

  const url = `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=QHC5B5ZS434HK6UFH26KS39DWG5E8RAT76`;

  let response = await fetch(url);

  response = await response.json();

  if (parseInt(response.result) > 0) {
    return EthereumController.createPayment(path + 1);
  }

  return { address, path };
};

EthereumController.getUsdRate = async function () {
  try {
    let response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
    );
    response = await response.json();
    return response.ethereum.usd;
  } catch (error) {
    console.log(error);
    return -1;
  }
};

EthereumController.broadcast = async function (raw) {
  console.log("broadcasting transaction", raw);

  let data = {};
  let errors = [];
  let message = "";

  await web3.eth.sendSignedTransaction(raw, (error, txHash) => {
    console.log(error, txHash);

    if (error) {
      errors = ["failed to broadcast transaction"];
    } else {
      data = { txid: txHash };
      message = `Ethers sent your transaction hash is ${txHash}`;
    }
  });

  return { errors, data, message };
};

EthereumController.getPrivateKey = function (phrase, path) {
  const p = parseInt(path);
  const r = "m/44'/60'/0'/0";
  const seed = bip39.mnemonicToSeedSync(phrase);
  const hd = hdkey.fromMasterSeed(seed);
  return hd.derivePath(r).deriveChild(p).getWallet().getPrivateKey();
};

EthereumController.createTransaction = async function (from, to, amount, pKey) {
  const txCount = await web3.eth.getTransactionCount(from);

  const nonce = web3.utils.toHex(txCount);

  const gasLimit = web3.utils.toHex(21000);

  const gasPrice = web3.utils.toHex(web3.utils.toWei("1", "gwei"));

  const value = web3.utils.toHex(web3.utils.toWei(amount, "ether"));

  const txObject = {
    to,
    value,
    nonce,
    gasPrice,
    gasLimit,
  };

  const tx = new Transaction(txObject, {
    chain: "ropsten",
    hardfork: "petersburg",
  });

  tx.sign(pKey);

  const serialized = tx.serialize();

  const raw = "0x" + serialized.toString("hex");

  return raw;
};

EthereumController.createUsdtTx = async function (from, to, amount, pKey) {
  const txCount = await web3.eth.getTransactionCount(from);

  const nonce = web3.utils.toHex(txCount);

  const gasLimit = web3.utils.toHex(52000);

  const value = web3.utils.toHex(web3.utils.toWei("0", "ether"));

  const gasPrice = web3.utils.toHex(web3.utils.toWei("1", "gwei"));

  const contractAddress = "0xfab46e002bbf0b4509813474841e0716e6730136";

  const contract = new web3.eth.Contract(abiArray, contractAddress, { from });

  const data = contract.methods
    .transfer(to, web3.utils.toHex(web3.utils.toWei(amount, "ether")))
    .encodeABI();

  const txObject = {
    data,
    value,
    nonce,
    gasPrice,
    gasLimit,
    to: contractAddress,
  };

  const tx = new Transaction(txObject, {
    chain: "ropsten",
    hardfork: "petersburg",
  });

  tx.sign(pKey);

  const serialized = tx.serialize();

  const raw = "0x" + serialized.toString("hex");

  return raw;

  // const chainId = 0x01;

  // const gasLimit = web3.utils.toHex(22000);

  // const gasPrice = web3.utils.toHex(web3.utils.toWei("1", "gwei"));

  // // let response = await fetch(
  // //   `http://api-ropsten.etherscan.io/api?module=account&action=txlist&address=${from}&startblock=0&endblock=99999999&sort=desc&apikey=QHC5B5ZS434HK6UFH26KS39DWG5E8RAT76`
  // // );

  // let response = await fetch(
  //   `https://api-ropsten.etherscan.io/api?module=account&action=tokentx&address=${from}&startblock=0&endblock=999999999&sort=asc&apikey=QHC5B5ZS434HK6UFH26KS39DWG5E8RAT7`
  // );

  // response = await response.json();

  // const txCount = response.result.length;

  // // const txCount = 1000000000;

  // const nonce = web3.utils.toHex(txCount);

  // const contract = new web3.eth.Contract(abiArray, contractAddress, { from });

  // console.log("contract", contract);

  // const txObject = {
  //   from,
  //   nonce,
  //   chainId,
  //   gasPrice,
  //   gasLimit,
  //   to: contractAddress,
  // data: contract.methods.transfer(to, web3.utils.toHex(1)).encodeABI(),
  // };

  // const tx = new Transaction(txObject, {
  //   chain: "ropsten",
  //   hardfork: "petersburg",
  // });

  // tx.sign(pKey);

  // const serialized = tx.serialize();

  // const raw = "0x" + serialized.toString("hex");

  // return raw;
};

for (let key in EthereumController) {
  if (typeof EthereumController[key] == "function" && key != "model") {
    EthereumController[key] = EthereumController[key].bind(EthereumController);
  }
}

module.exports = EthereumController;
