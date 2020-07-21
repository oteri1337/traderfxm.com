const express = require("express");
const V = require("../middlewares/validators/TransactionsValidator");
const Controller = require("../middlewares/TransactionsController");
const P = require("../middlewares/validators/PermissionsValidator");

const router = express.Router();

router.post("/transactions/buy", V.create, V.buy, Controller.createBuy);

router.post("/transactions/sell", V.create, V.sell, Controller.createSell);

router.patch("/transactions/confirm/buy", Controller.confirmBuy);

router.patch("/transactions/confirm/sell", Controller.confirmSell);

router.patch("/transactions/complete", P.admin, Controller.complete);

router.get("/transactions", Controller.list);

router.delete("/transactions", P.admin, Controller.delete);

router.get("/transactions/search/:attr", Controller.search);

router.get("/transactions/:attr", Controller.read);

module.exports = router;
