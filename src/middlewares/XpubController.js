require("dotenv").config();
const BitcoinController = require("./library/BitcoinController");
const EthereumController = require("./library/EthereumController");

const Controller = {};

Controller.bitcoin = async (request, response) => {
  let { xpub, path } = request.params;
  path = parseInt(path);

  let data = "";

  try {
    data = BitcoinController.createPaymentAddress(path, xpub);
  } catch (error) {
    console.log(error.message);
    data = "invalid paramters supplied " + error.message;
  }

  return response.json({ data, errors: [], message: "" });
};

Controller.ethereum = async (request, response) => {
  let { xpub, path } = request.params;
  path = parseInt(path);

  let data = "";

  try {
    data = EthereumController.createPaymentAddress(path, xpub);
  } catch (error) {
    console.log(error.message);
    data = "invalid paramters supplied " + error.message;
  }

  return response.json({ data, errors: [], message: "" });
};

for (let key in Controller) {
  if (typeof Controller[key] == "function" && key != "model") {
    Controller[key] = Controller[key].bind(Controller);
  }
}

module.exports = Controller;
