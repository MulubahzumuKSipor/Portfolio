const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");
const utilities = require("../utilities/index");
// const { checkExistingEmail } = require("../models/account-model");

router.get("/", homeController.buildHome);

router.get("/skills", homeController.getAllSkills);

router.get("/projects", homeController.getAllProjects);

router.get("/certificates", homeController.getAllCertificates);

module.exports = router;
