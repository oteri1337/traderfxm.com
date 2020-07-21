require("dotenv").config();
const fetch = require("isomorphic-fetch");
const rateModel = require("../database/models").rate;
const pathModel = require("../database/models").path;
const model = require("../database/models").transaction;
const ApiController = require("./library/ApiController");
const BitcoinController = require("./library/BitcoinController");
const EthereumController = require("./library/EthereumController");

const Controller = { ...ApiController };

Controller.model = model;

Controller.readBy = "reference";

Controller.searchBy = "reference";

async function getBuyRate() {
  const { rate } = await rateModel.findOne({ where: { type: 2 } });

  return rate;
}

async function getSellRate(amount) {
  let ratesList = await rateModel.findAll({ where: { type: 1 } });

  ratesList = JSON.parse(JSON.stringify(ratesList));

  const { rate } = ratesList.find((rate) => {
    return (
      (amount <= rate.upper_limit || rate.upper_limit === null) &&
      amount >= rate.lower_limit
    );
  });

  return rate;
}

Controller.createBuy = async (request, response) => {
  const { body } = request;

  body.type = 1;

  body.reference = Date.now();

  body.rate = await getBuyRate();

  body.amount_in_usd = body.amount_in_ngn / body.rate;

  // let cryptoPriceInUsd = -1;

  // if (body.cryptoId == 1) {
  //   cryptoPriceInUsd = await BitcoinController.getUsdRate();
  // }

  // if (body.cryptoId == 2) {
  //   cryptoPriceInUsd = await EthereumController.getUsdRate();
  // }

  // if (cryptoPriceInUsd === -1) {
  //   return response.json({
  //     errors: ["failed to get usd rate, please try again"],
  //     mesage: "",
  //     data: {},
  //   });
  // }

  body.amount_in_crypto = body.amount_in_usd / body.crypto_price;

  const { id } = await model.create(body);

  const data = await model.findOne({ where: { id } });

  // console.log(this);

  Controller.sendEmail(
    body.email,
    `
    Your order has been recieved, please complete your payment to proceed

    You can monitor your transaction @ https://www.traderfxm.com/transactions/${data.reference}

    `,
    `Traderfx Transaction Confirmation`
  );

  Controller.sendEmail(
    "info@traderfxm.com",
    `
    A new order has been recieved, please standby to complete the transaction

    You can monitor the transaction @ https://www.traderfxm.com/control/transactions/${data.reference}

    `,
    `New Order`
  );

  return response.json({ data, errors: [], message: "Created Successfully" });
};

Controller.createSell = async (request, response) => {
  const { body } = request;
  const { cryptoId } = body;

  body.type = 2;

  body.reference = Date.now();

  // get path and address from db

  let address = "";

  let price = body.crypto_price;

  let pathFromDb = await pathModel.findOne({ where: { cryptoId } });

  let path = pathFromDb.dataValues.last_path + 1;

  if (cryptoId == 1) {
    address = BitcoinController.createPaymentAddress(path);
  }

  if (cryptoId == 2) {
    address = EthereumController.createPaymentAddress(path);
  }

  if (cryptoId == 3) {
    address = EthereumController.createPaymentAddress(path);
  }

  // get free path and address from api

  //

  //

  // update last path
  await pathModel.update({ last_path: path }, { where: { cryptoId } });

  body.path = path;

  body.address = address;

  // get crypto price rate from api

  body.amount_in_usd = body.amount_in_crypto * price;

  body.rate = await getSellRate(body.amount_in_usd);

  body.amount_in_ngn = body.amount_in_usd * body.rate;

  const { id } = await model.create(body);

  const data = await model.findOne({ where: { id } });

  Controller.sendEmail(
    body.email,
    `
    Your order has been recieved, please complete your payment to proceed

    You can monitor your transaction @ https://www.traderfxm.com/transactions/${data.reference}

    `,
    `Traderfx Transaction Confirmation`
  );

  Controller.sendEmail(
    "info@traderfxm.com",
    `
    A new order has been recieved, please standby to complete the transaction

    You can monitor the transaction @ https://www.traderfxm.com/control/transactions/${data.reference}

    `,
    `New Order`
  );

  return response.json({ data, errors: [], message: "Created Successfully" });
};

Controller.confirmBuy = async function (request, response) {
  const txref = request.body.tx_ref;
  const reference = txref;

  if (txref === undefined) {
    return response.json({
      errors: ["txref is required"],
      mesage: "",
      data: {},
    });
  }

  const SECKEY = process.env.FLUTTERWAVE_PRIVATE_KEY;

  const url = `https://api.ravepay.co/flwv3-pug/getpaidx/api/v2/verify`;

  let fetchResponse = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ txref, SECKEY }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  fetchResponse = await fetchResponse.json();

  if (fetchResponse.status == "success") {
    let data = await this.model.findOne({ where: { reference } });

    if (data.status == 1) {
      await this.model.update({ status: 2 }, { where: { reference } });
      data = await this.model.findOne({ where: { reference } });
    }

    return response.json({
      errors: [],
      mesage: "",
      data,
    });
  }

  return response.json({
    errors: ["fake transaction"],
    mesage: "",
    data: {},
  });
};

Controller.confirmSell = async function (request, response) {
  const { reference } = request.body;

  if (reference === undefined) {
    return response.json({
      errors: ["reference is required"],
      mesage: "",
      data: {},
    });
  }

  let data = await this.model.findOne({ where: { reference } });

  if (!data) {
    return response.json({
      errors: ["transaction not found"],
      mesage: "",
      data: {},
    });
  }

  // check if paid
  let status = 1;
  const { cryptoId, address, amount_in_crypto } = data.dataValues;

  if (cryptoId == 1) {
    const url = `https://insight.bitpay.com/api/addr/${address}`;
    let response = await fetch(url);
    response = await response.json();
    if (response.totalReceived >= amount_in_crypto) {
      status = 2;
    }
  }

  if (cryptoId == 2) {
    const url = `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=QHC5B5ZS434HK6UFH26KS39DWG5E8RAT76`;
    let response = await fetch(url);
    response = await response.json();
    response = response.result / 1e18;
    if (response >= amount_in_crypto) {
      status = 2;
    }
  }

  if (cryptoId == 3) {
    const url = `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0xdac17f958d2ee523a2206206994597c13d831ec7&address=${address}&tag=latest&apikey=QHC5B5ZS434HK6UFH26KS39DWG5E8RAT76`;
    let response = await fetch(url);
    response = await response.json();
    response = response.result / 1e6;
    if (response >= amount_in_crypto) {
      status = 2;
    }
  }

  if (status == 2) {
    await this.model.update({ status }, { where: { reference } });
    data = await this.model.findOne({ where: { reference } });

    this.sendEmail(
      "info@traderfxm.com",
      `
      You just recieved a crypo payment to this address = ${address} 

      Crypto Id : ${cryptoId}

      Amount: ${amount_in_crypto}

      Please confirm the payment, then complete the transaction

      `,
      "Traderfx Crypto Payment Recieved"
    );
  }

  if (status == 1) {
    return response.json({
      errors: ["payment not recieved or incomplete"],
      mesage: "",
      data,
    });
  }

  return response.json({
    errors: [],
    mesage: "",
    data,
  });
};

Controller.complete = async function (request, response) {
  const { id } = request.body;

  let data = await this.model.findOne({ where: { id } });

  if (data.status == 2) {
    await this.model.update({ status: 3 }, { where: { id } });
    data = await this.model.findOne({ where: { id } });
  }

  return response.json({
    errors: [],
    mesage: "",
    data,
  });
};

for (let key in Controller) {
  if (typeof Controller[key] == "function" && key != "model") {
    Controller[key] = Controller[key].bind(Controller);
  }
}

module.exports = Controller;
