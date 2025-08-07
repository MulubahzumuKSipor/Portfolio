const express = require("express");
const router = express.Router();
const connectController = require("../controllers/hireMeController");
const utilities = require("../utilities/index");
// const { checkExistingEmail } = require("../models/account-model");

router.get("/connect", connectController.buildConnect);



module.exports = router;
