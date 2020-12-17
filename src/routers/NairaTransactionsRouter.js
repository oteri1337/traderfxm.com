const express = require("express");
const P = require("../middlewares/validators/PermissionsValidator");
const Controller = require("../middlewares/NairaTransactionsController");
const V = require("../middlewares/validators/NairaTransactionsValidator");

const router = express.Router();

const rp = "/nairatransactions";

router.get(`${rp}`, P.admin, Controller.list);

router.patch(`${rp}`, P.admin, Controller.update);

router.get(`${rp}/search/:attr`, P.admin, Controller.search);

router.get(`${rp}/:attr`, Controller.read);

module.exports = router;
