const rawuser = require("../../database/models").rawuser;
const AuthController = require("../library/AuthController");

const AuthValidator = {};

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
  const { email, password, account_name, phone_number } = request.body;

  if (email === undefined) {
    errors.push("email is required");
  }

  if (password === undefined) {
    errors.push("password is required");
  }

  if (account_name === undefined) {
    errors.push("account name is required");
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

module.exports = AuthValidator;
