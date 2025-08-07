const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const pool = require("./database/database");
const session = require("express-session");
const flash = require("connect-flash");
// const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const env = require("dotenv").config();
const static = require("./routes/static");
const homeController = require("./controllers/homeController");
const connectController = require("./controllers/hireMeController")

const app = express();

/* **************************************
 * Middleware
 ************************************** */
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layout/layouts");
app.use(express.urlencoded({ extended: true }));

/* Flash Messages */
app.use(session({
  secret: 'your-secret-key', // Use a strong, random key in production
  resave: false,
  saveUninitialized: true
}));

app.use(flash());


/* **************************************
 * Routes
 ************************************** */
app.use(static);
app.get("/", homeController.buildHome);
app.get("/skills", homeController.getAllSkills);
app.get("/projects", homeController.getAllProjects);
app.get("/certificates", homeController.getAllCertificates);
app.get("/connect", connectController.buildConnect);
app.post("/connected", connectController.createUser);
/* ****************************************
 * Local Server Information
 **************************************** */
const port = process.env.PORT || PORT;
const host = process.env.HOST || "localhost";

/* ****************************************
 * Confirm Server is Running
 **************************************** */
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`);
});

/* ****************************************
 * Initialized database
 **************************************** */

pool.initDb((err) => {
  if (err) {
    console.error("Failed to connect to the database:", err);
  } else {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
});
