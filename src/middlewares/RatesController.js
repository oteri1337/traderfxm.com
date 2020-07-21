const model = require("../database/models").rate;
const ApiController = require("./library/ApiController");

const Controller = { ...ApiController };

Controller.model = model;

Controller.createBody = (body) => {
  return body;
};

Controller.BuyList = async function (request, response) {
  const { baseUrl, path, query } = request;
  const data = await this.getList(query.page, baseUrl, path, { type: 2 });
  return response.json({ errors: [], message: "", data });
};

Controller.SellList = async function (request, response) {
  const { baseUrl, path, query } = request;
  const data = await this.getList(query.page, baseUrl, path, { type: 1 });
  return response.json({ errors: [], message: "", data });
};

for (let key in Controller) {
  if (typeof Controller[key] == "function" && key != "model") {
    Controller[key] = Controller[key].bind(Controller);
  }
}

module.exports = Controller;
