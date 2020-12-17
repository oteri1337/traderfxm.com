const user = require("../../database/models").user;
const rawuser = require("../../database/models").rawuser;
const AuthController = require("../library/AuthController");
const BitcoinController = require("../library/BitcoinController");
const EthereumController = require("../library/EthereumController");

const AuthValidator = {};

AuthValidator.exists = async function (request, response, next) {
  const errors = [];
  const { email, phone_number } = request.body;

  const emailExists = await user.findOne({ where: { email } });

  if (emailExists) {
    errors.push("email already exists");
  }

  const phoneExists = await user.findOne({ where: { phone_number } });

  if (phoneExists) {
    errors.push("phone number already exists");
  }

  if (errors.length) {
    return response.json({ errors, data: {}, message: "" });
  }

  next();
};

AuthValidator.signin = function (request, response, next) {
  const errors = [];
  const { email, password } = request.body;

  if (email === undefined) {
    errors.push("email is required");
  }

  if (password === undefined) {
    errors.push("password is required");
  }

  if (errors.length) {
    return response.json({ errors, data: {}, message: "" });
  }

  next();
};

AuthValidator.signup = function (request, response, next) {
  const errors = [];
  const { email, password, first_name, last_name, phone_number } = request.body;

  if (email === undefined) {
    errors.push("email is required");
  }

  if (password === undefined) {
    errors.push("password is required");
  }

  if (first_name === undefined) {
    errors.push("first name is required");
  }

  if (last_name === undefined) {
    errors.push("last name is required");
  }

  if (phone_number === undefined) {
    errors.push("phone number is required");
  }

  if (errors.length) {
    return response.json({ errors, data: {}, message: "" });
  }

  next();
};

AuthValidator.reset = function (request, response, next) {
  const errors = [];
  const { email, pin } = request.body;

  if (email === undefined) {
    errors.push("email is required");
  }

  if (pin === undefined) {
    errors.push("pin is required");
  }

  if (errors.length) {
    return response.json({ errors, data: {}, message: "" });
  }

  next();
};

AuthValidator.send = async function (request, response, next) {
  const errors = [];
  const { user } = request.session;
  const { password, amount, address, from } = request.body;

  if (password === undefined) {
    errors.push("password is required");
  } else {
    const RawUser = await rawuser.findOne({ where: { id: user.id } });
    if (
      RawUser.dataValues.password != AuthController.encryptPassword(password)
    ) {
      errors.push("password is incorrect");
    }
  }

  if (amount === undefined) {
    errors.push("amount is required");
  }

  if (address === undefined) {
    errors.push("address is required");
  }

  if (from === undefined) {
    errors.push("from is required");
  }

  if (errors.length) {
    return response.json({ errors, data: {}, message: "" });
  }

  next();
};

AuthValidator.sendNaira = async function (request, response, next) {
  const errors = [];
  const { user } = request.session;
  const { password, amount, account_name, bank_name } = request.body;
  const { account_number, cryptoId, address } = request.body;

  if (cryptoId === undefined) {
    errors.push("crypto id is required");
  } else {
    if (cryptoId == 0) {
      if (bank_name === undefined) {
        errors.push("bank name is required");
      }

      if (account_name === undefined) {
        errors.push("account name is required");
      }

      if (account_number === undefined) {
        errors.push("account number is required");
      }
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
  }

  if (password === undefined) {
    errors.push("password is required");
  } else {
    const RawUser = await rawuser.findOne({ where: { id: user.id } });
    const encryptedPassword = AuthController.encryptPassword(password);
    if (RawUser.dataValues.password != encryptedPassword) {
      errors.push("password is incorrect");
    }

    if (amount === undefined) {
      errors.push("amount is required");
    }

    if (amount < RawUser.naira_balance) {
      errors.push("insufficient funds");
    }
  }

  if (errors.length) {
    return response.json({ errors, data: {}, message: "" });
  }

  next();
};

AuthValidator.depositNaira = async function (request, response, next) {
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

module.exports = AuthValidator;
