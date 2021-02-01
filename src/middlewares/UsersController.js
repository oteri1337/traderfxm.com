const bip39 = require("bip39");
const bitcore = require("bitcore-lib");
const model = require("../database/models").user;
const wallet = require("../database/models").wallet;
const account = require("../database/models").account;
const rawuser = require("../database/models").rawuser;
const AuthController = require("./library/AuthController");
const transaction = require("../database/models").transaction;
const BitcoinController = require("./library/BitcoinController");
const EthereumController = require("./library/EthereumController");
const nairatransaction = require("../database/models").nairatransaction;

const Controller = { ...AuthController };

Controller.model = model;

Controller.authKey = "user";

Controller.createInclude = "wallets";

Controller.readInclude = [
  "orders",
  "accounts",
  "referrals",
  "transactions",
  "nairatransactions",
  {
    model: wallet,
    as: "btc_wallets",
    required: false,
    where: {
      type: 1,
    },
  },
  {
    model: wallet,
    as: "eth_wallets",
    required: false,
    where: {
      type: 2,
    },
  },
  {
    model: wallet,
    as: "usdt_wallets",
    required: false,
    where: {
      type: 3,
    },
  },
];

Controller.readOrder = [
  [{ model: wallet, as: "btc_wallets" }, "createdAt", "DESC"],
  [{ model: wallet, as: "eth_wallets" }, "createdAt", "DESC"],
  [{ model: wallet, as: "usdt_wallets" }, "createdAt", "DESC"],
  [{ model: transaction, as: "transactions" }, "createdAt", "DESC"],
  [{ model: nairatransaction, as: "nairatransactions" }, "createdAt", "DESC"],
];

Controller.createBody = function (body) {
  const phrase = bip39.generateMnemonic();
  const usdt_phrase = bip39.generateMnemonic();

  const seed = bip39.mnemonicToSeedSync(phrase);
  const seed2 = bip39.mnemonicToSeedSync(usdt_phrase);

  const root = bitcore.HDPrivateKey.fromSeed(seed);
  const root2 = bitcore.HDPrivateKey.fromSeed(seed);
  const root3 = bitcore.HDPrivateKey.fromSeed(seed2);

  const bitcoin = root.derive("m/44'/1'/0'/0");
  const ethereum = root2.derive("m/44'/60'/0'/0");
  const tether = root3.derive("m/44'/60'/0'/0");

  const btc_xpub = bitcoin.xpubkey;
  const btc_address = bitcoin.derive(0).privateKey.toAddress().toString();

  const eth_xpub = ethereum.xpubkey;
  const eth_address = EthereumController.create(eth_xpub, 0);

  const usdt_xpub = tether.xpubkey;
  const usdt_address = EthereumController.create(usdt_xpub, 0);

  this.sendEmail(
    body.email,
    `<p>Welcome to TraderFXM</p>
    
    <p>Thank you for choosing us. We look forward to the opportunity to prove you have made the best decision for your trading activities. You now join the ranks of over thousand traders worldwide who use our services to make their trades more flexible and efficient.</p>
    
    <p>As a new member, we hope you'll use and invite to earn with close friends and acquaintances - sharing your recommendations, and moments of inspiration.</p>
  `,
    "Welcome to TraderFXM"
  );

  return {
    ...body,
    phrase,
    usdt_phrase,
    btc_xpub,
    eth_xpub,
    usdt_xpub,
    wallets: [
      { address: btc_address, type: 1, path: 0, label: "Default BTC Wallet" },
      { address: eth_address, type: 2, path: 0, label: "Default ETH Wallet" },
      { address: usdt_address, type: 3, path: 0, label: "Default USDT Wallet" },
    ],
  };
};

Controller.createBtc = async function (request, response) {
  const errors = [];
  const { user } = request.session;
  const { label, path } = request.body;

  if (label === undefined) {
    errors.push("label is required");
  }

  if (path === undefined) {
    errors.push("path is required");
  }

  if (errors.length) {
    return response.json({ errors, data: {}, message: "" });
  }

  const address = BitcoinController.create(user.btc_xpub, path);

  const user_id = user.id;

  await wallet.create({ type: 1, user_id, path, label, address });

  const data = await this.model.findOne({
    where: { id: user_id },
    order: this.readOrder,
    include: this.readInclude,
  });

  return response.json({ errors, data, message: "" });
};

Controller.createEth = async function (request, response) {
  const errors = [];
  const { user } = request.session;
  const { label, path } = request.body;

  if (label === undefined) {
    errors.push("label is required");
  }

  if (path === undefined) {
    errors.push("path is required");
  }

  if (errors.length) {
    return response.json({ errors, data: {}, message: "" });
  }

  const address = EthereumController.create(user.eth_xpub, path);

  const user_id = user.id;

  await wallet.create({ type: 2, user_id, path, label, address });

  const data = await this.model.findOne({
    where: { id: user_id },
    order: this.readOrder,
    include: this.readInclude,
  });

  return response.json({ errors, data, message: "" });
};

Controller.createUsdt = async function (request, response) {
  const errors = [];
  const { user } = request.session;
  const { label, path } = request.body;

  if (label === undefined) {
    errors.push("label is required");
  }

  if (path === undefined) {
    errors.push("path is required");
  }

  if (errors.length) {
    return response.json({ errors, data: {}, message: "" });
  }

  const address = EthereumController.create(user.usdt_xpub, path);

  const user_id = user.id;

  await wallet.create({ type: 3, user_id, path, label, address });

  const data = await this.model.findOne({
    where: { id: user_id },
    order: this.readOrder,
    include: this.readInclude,
  });

  return response.json({ errors, data, message: "" });
};

Controller.createAccount = async function (request, response) {
  const errors = [];
  const { bank_name, account_name, account_number } = request.body;

  if (bank_name === undefined) {
    errors.push("bank name is required");
  }

  if (account_name === undefined) {
    errors.push("account name is required");
  }

  if (account_number === undefined) {
    errors.push("account number is required");
  }

  if (errors.length) {
    return response.json({ errors, data: {}, message: "" });
  }

  const user_id = request.session.user.id;

  await account.create({ bank_name, account_name, account_number, user_id });

  const data = await this.model.findOne({
    where: { id: user_id },
    order: this.readOrder,
    include: this.readInclude,
  });

  return response.json({ errors, data, message: "" });
};

Controller.deleteAccount = async function (request, response) {
  const errors = [];
  const { id } = request.body;

  if (id === undefined) {
    errors.push("id is required");
  }

  if (errors.length) {
    return response.json({ errors, data: {}, message: "" });
  }

  await account.destroy({ where: { id } });

  const data = await this.model.findOne({
    where: { id: request.session.user.id },
    order: this.readOrder,
    include: this.readInclude,
  });

  return response.json({ errors, data, message: "" });
};

Controller.sendBtc = async function (request, response) {
  const { user } = request.session;
  let { amount, address, from, fee } = request.body;

  const RawUser = await rawuser.findOne({ where: { id: user.id } });

  amount = parseFloat(amount);

  const to = address.trim();

  const sats = Math.round(amount * 100000000);

  froma = BitcoinController.create(user.btc_xpub, from);

  if (froma == to) {
    return response.json({
      errors: ["you should not be sending bitcoins to yourself"],
      data: {},
      message: "",
    });
  }

  const isValidAddress = BitcoinController.validate(to);

  if (!isValidAddress) {
    return response.json({
      errors: ["Invalid Bitcoin Address"],
      data: {},
      message: "",
    });
  }

  // try {
  const pk = BitcoinController.getPrivateKey(RawUser.dataValues.phrase, from);

  const unspent = await BitcoinController.getUnspent(froma, sats);

  let tx;

  // prettier-ignore
  try{
     tx = BitcoinController.createTransaction(unspent, froma, to, sats, pk);

  } catch(error) {
    console.log("error creating transaction ", tx);
  }

  const res = await BitcoinController.broadcast(tx);

  if (res.txid) {
    return response.json({
      errors: [],
      message: "",
      data: { txid: res.txid },
    });
  }

  return response.json(res);
};

Controller.sendEth = async function (request, response) {
  const { user } = request.session;

  let { amount, address, from } = request.body;

  if (!EthereumController.validate(address)) {
    return response.json({
      errors: ["Invalid Ethereum Address"],
      data: {},
      message: "",
    });
  }

  const from_address = EthereumController.create(user.eth_xpub, from);

  const RawUser = await rawuser.findOne({ where: { id: user.id } });

  const privateKey = EthereumController.getPrivateKey(
    RawUser.dataValues.phrase,
    from
  );

  // prettier-ignore
  const transaction = await EthereumController.createTransaction(from_address,address,amount,privateKey);

  EthereumController.broadcast(transaction, (error, txid) => {
    if (txid) {
      console.log("broadcast successful", txid);

      this.sendEmail(
        user.email,
        `You have successfuly sent ${amount} ETH to ${address} `,
        `${amount} ETH sent`
      );

      return response.json({ errors: [], data: { txid }, message: "" });
    }

    if (error) {
      console.log("broadcast error", error.message);

      return response.json({
        data: {},
        message: "",
        errors: [error.message],
      });
    }
  });

  // const res = await EthereumController.broadcast(transaction);

  // console.log("broacast response", res);

  // if (res.errors.length === 0) {
  //   this.sendEmail(
  //     user.email,
  //     `You have successfuly sent ${amount} ETH to ${address} `,
  //     "Ethers Sent"
  //   );
  // }

  // return response.json(res);
};

Controller.sendUsdt = async function (request, response) {
  const { user } = request.session;

  let { amount, address, from } = request.body;

  if (!EthereumController.validate(address)) {
    return response.json({
      errors: ["Invalid USDT Address"],
      data: {},
      message: "",
    });
  }

  const from_address = EthereumController.create(user.usdt_xpub, from);

  const RawUser = await rawuser.findOne({ where: { id: user.id } });

  const privateKey = EthereumController.getPrivateKey(
    RawUser.dataValues.usdt_phrase,
    from
  );

  // amount = parseFloat(amount) * 1e6;

  // prettier-ignore
  const transaction = await EthereumController.createUsdtTx(from_address,address,amount,privateKey);

  EthereumController.broadcast(transaction, (error, txid) => {
    if (txid) {
      console.log("broadcast successful", txid);

      this.sendEmail(
        user.email,
        `You have successfuly sent ${amount} USDT to ${address} `,
        `${amount} USDT sent`
      );

      return response.json({ errors: [], data: { txid }, message: "" });
    }

    if (error) {
      console.log("broadcast error", error.message);

      return response.json({
        data: {},
        message: "",
        errors: [error.message],
      });
    }
  });
};

Controller.sendNaira = async function (request, response) {
  // subtract naira
  const { id } = request.session.user;

  const User = await this.model.findOne({ where: { id } });

  let { amount, account_name, account_number, type } = request.body;

  const { bank_name, cryptoId, address } = request.body;

  amount = parseFloat(amount);

  const naira_balance = User.naira_balance - amount;

  User.update({ naira_balance });

  // if crypto id is not = 0 get rate

  // create naira transaction
  let t = { amount, account_name, type, bank_name, account_number };
  t = { ...t, cryptoId, address, user_id: id };
  await nairatransaction.create(t);

  // return updated user
  const data = await this.model.findOne({
    where: { id },
    order: this.readOrder,
    include: this.readInclude,
  });

  return response.json({
    data,
    errors: [],
    message: "",
  });
};

Controller.depositNaira = async function (request, response) {
  const user_id = request.session.user.id;

  let { amount, type } = request.body;

  amount = parseFloat(amount);

  const User = await this.model.findOne({ where: { id: user_id } });

  const naira_balance = User.naira_balance + amount;

  User.update({ naira_balance });

  const status = 2;

  await nairatransaction.create({ amount, type, user_id, status });

  // return updated user
  const data = await this.model.findOne({
    where: { id: user_id },
    order: this.readOrder,
    include: this.readInclude,
  });

  return response.json({
    data,
    errors: [],
    message: "",
  });
};

Controller.usdtBalance = async function (request, response) {
  let value = request.params.attr.split(",");

  if (!value[value.length - 1].length) {
    value.pop();
  }

  try {
    const data = await EthereumController.checkUsdtBalance(value);

    return response.json({
      data,
      errors: [],
      message: "",
    });
  } catch (error) {
    return response.json({
      data: {},
      errors: ["failed to get balance"],
      message: "",
    });
  }
};

for (let key in Controller) {
  if (typeof Controller[key] == "function" && key != "model") {
    Controller[key] = Controller[key].bind(Controller);
  }
}

module.exports = Controller;
