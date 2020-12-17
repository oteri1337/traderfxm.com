const BitcoinController = require("../library/BitcoinController");
const EthereumController = require("../library/EthereumController");
const Validator = {};

Validator.create = function (request, response, next) {
  const errors = [];
  const { type, amount } = request.body;

  if (type === undefined) {
    errors.push("type is required");
  }

  if (amount === undefined) {
    errors.push("amount is required");
  }

  if (errors.length) {
    return response.json({ errors, data: {}, message: "" });
  }

  next();
};

Validator.withdraw = function (request, response, next) {
  const errors = [];
  const { to, wallet_address } = request.body;

  if (to === undefined) {
    errors.push("to is required");
  } else {
    if (to == 2) {
      if (!BitcoinController.validate(wallet_address)) {
        errors.push("wallet address is not a valid bitcoin address");
      }
    }

    if (to == 3 || to == 4) {
      if (!EthereumController.validate(wallet_address)) {
        errors.push("wallet address is not valid");
      }
    }

    if (to == 1) {
      // validate bank address
    }
  }

  if (errors.length) {
    return response.json({ errors, data: {}, message: "" });
  }

  next();
};

// Validator.buy = function (request, response, next) {
//   const errors = [];
//   const { amount_in_ngn, address, cryptoId } = request.body;

//   if (amount_in_ngn === undefined) {
//     errors.push("amount is required");
//   }

//   if (address === undefined) {
//     errors.push("wallet address is required");
//   }

//   if (cryptoId == 1) {
// if (!BitcoinController.validate(address)) {
//   errors.push("wallet address is not a valid bitcoin address");
// }
//   }

//   if (cryptoId == 2 || cryptoId == 3) {
// if (!EthereumController.validate(address)) {
//   errors.push("wallet address is not valid");
// }
//   }

//   if (errors.length) {
//     return response.json({ errors, data: {}, message: "" });
//   }

//   next();
// };

// Validator.sell = function (request, response, next) {
//   const errors = [];
//   const {
//     bank_name,
//     account_name,
//     account_number,
//     amount_in_crypto,
//   } = request.body;

//   if (amount_in_crypto === undefined) {
//     errors.push("amount is required");
//   }

//   if (bank_name === undefined) {
//     errors.push("bank name is required");
//   }

//   if (account_name === undefined) {
//     errors.push("account name is required");
//   }

//   if (account_number === undefined) {
//     errors.push("account number is required");
//   }

//   if (errors.length) {
//     return response.json({ errors, data: {}, message: "" });
//   }

//   next();
// };

module.exports = Validator;
