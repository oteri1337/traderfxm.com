const express = require("express");
const Controller = require("../middlewares/UsersController");
const V = require("../middlewares/validators/AuthValidator");
const P = require("../middlewares/validators/PermissionsValidator");

const router = express.Router();

// standard
router.get("/users", P.admin, Controller.list);

router.post("/users", V.signup, Controller.create);

router.get("/users/:attr", Controller.read);

router.delete("/users", P.admin, Controller.delete);

// wallet create
router.post("/users/wallet/btc/create", P.user, Controller.createBtc);

router.post("/users/wallet/eth/create", P.user, Controller.createEth);

router.post("/users/wallet/usdt/create", P.user, Controller.createUsdt);

// wallet send

router.post("/users/wallet/btc/send", P.user, V.send, Controller.sendBtc);

router.post("/users/wallet/eth/send", P.user, V.send, Controller.sendEth);

router.post("/users/wallet/usdt/send", P.user, V.send, Controller.sendUsdt);

// auth
router.post("/users/auth/signin", V.signin, Controller.signin);

router.get("/users/auth/status", Controller.status);

router.get("/users/auth/signout", P.user, Controller.signout);

router.post("/users/auth/verifyemail", Controller.verifyEmail);

router.post("/users/auth/resendpin", Controller.resendPin);

router.post("/users/auth/password", V.reset, Controller.resetPassword);

router.post("/users/auth/email", V.reset, Controller.resetEmail);

router.patch("/users/auth/profile", P.user, Controller.updateProfile);

router.patch("/users/auth/password", P.user, Controller.updatePassword);

// web3 routes

router.get("/users/usdt/:attr", Controller.usdtBalance);

module.exports = router;
