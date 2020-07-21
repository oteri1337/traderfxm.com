const express = require("express");
const Controller = require("../middlewares/RatesController");
const P = require("../middlewares/validators/PermissionsValidator");

const router = express.Router();

router.get("/rates", Controller.list);

router.get("/rates/buy", Controller.BuyList);

router.get("/rates/sell", Controller.SellList);

router.delete("/rates", P.admin, Controller.delete);

router.post("/rates/search", Controller.search);

router.post("/rates", P.admin, Controller.create);

router.patch("/rates", P.admin, Controller.update);

router.get("/rates/:id", Controller.read);

module.exports = router;
