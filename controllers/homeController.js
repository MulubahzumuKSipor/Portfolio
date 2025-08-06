const utilities = require("../utilities/index");
const mongodb = require("../database/database");
const homeCont = {};
const ObjectId = mongodb.ObjectId;

homeCont.buildHome = async function (req, res) {
  // const nav = await utilities.getNav();
  res.render("home", { title: "MzKSipor" });
};

// Controller to handle users-related requests
homeCont.getAllSkills = async function (req, res) {
  try {
    const skills = await mongodb.getDb().collection("skills").find().toArray();
    // console.log("Fetched Skills (SUCCESS):", skills);
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(skills);
  } catch (err) {
    console.error("Error fetching skills (CATCH BLOCK):", err); // This is crucial for errors
    res.status(500).json({ error: err.message });
  }
};

homeCont.getAllProjects = async function (req, res) {
  try {
    const projects = await mongodb
      .getDb()
      .collection("projects")
      .find()
      .toArray();
    // console.log("Fetched Skills (SUCCESS):", skills);
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(projects);
  } catch (err) {
    console.error("Error fetching skills (CATCH BLOCK):", err); // This is crucial for errors
    res.status(500).json({ error: err.message });
  }
};

homeCont.getAllCertificates = async function (req, res) {
  try {
    const certificates = await mongodb.getDb().collection("certificates").find().toArray();
    // console.log("Fetched Skills (SUCCESS):", skills);
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(certificates);
  } catch (err) {
    console.error("Error fetching Certificates (CATCH BLOCK):", err); // This is crucial for errors
    res.status(500).json({ error: err.message });
  }
};

module.exports = homeCont;
