const express = require("express");
const Controller = require("../middlewares/XpubController");

const router = express.Router();

router.get("/xpub/bitcoin/:path/:xpub", Controller.bitcoin);

router.get("/xpub/ethereum/:path/:xpub", Controller.ethereum);

module.exports = router;
