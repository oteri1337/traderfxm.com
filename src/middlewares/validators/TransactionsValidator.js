const BitcoinController = require("../library/BitcoinController");
const EthereumController = require("../library/EthereumController");
const Validator = {};

Validator.create = function (request, response, next) {
  const errors = [];
  const { cryptoId, phone_number } = request.body;

  if (cryptoId === undefined) {
    errors.push("crypto id is required");
  }

  if (phone_number === undefined) {
    errors.push("phone number is required");
  }

  if (errors.length) {
    return response.json({ errors, data: {}, message: "" });
  }

  next();
};

Validator.buy = function (request, response, next) {
  const errors = [];
  const { amount_in_ngn, address, cryptoId } = request.body;

  if (amount_in_ngn === undefined) {
    errors.push("amount is required");
  }

  if (address === undefined) {
    errors.push("wallet address is required");
  }

  if (cryptoId == 1) {
    if (!BitcoinController.validate(address)) {
      errors.push("wallet address is not a valid bitcoin address");
    }
  }

  if (cryptoId == 2 || cryptoId == 3) {
    if (!EthereumController.validate(address)) {
      errors.push("wallet address is not valid");
    }
  }

  if (errors.length) {
    return response.json({ errors, data: {}, message: "" });
  }

  next();
};

Validator.sell = function (request, response, next) {
  const errors = [];
  const {
    bank_name,
    account_name,
    account_number,
    amount_in_crypto,
  } = request.body;

  if (amount_in_crypto === undefined) {
    errors.push("amount is required");
  }

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

  next();
};

module.exports = Validator;
