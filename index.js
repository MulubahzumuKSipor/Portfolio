const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const pool = require("./database/database");
const session = require("express-session");
// const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const env = require("dotenv").config();
const static = require("./routes/static");
const homeController = require("./controllers/homeController");

const app = express();

/* **************************************
 * Middleware
 ************************************** */
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layout/layouts");

// app.use(express.json());
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
// app.use(express.urlencoded({ extended: true }));

/* Flash Messages */
// app.use(flash());

// app.use((req, res, next) => {
//   res.locals.message = req.flash("message");
//   next();
// });

/* **************************************
 * Routes
 ************************************** */
app.use(static);
app.get("/", homeController.buildHome);
app.get("/skills", homeController.getAllSkills);
app.get("/projects", homeController.getAllProjects);
app.get("/certificates", homeController.getAllCertificates);
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
