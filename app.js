const path = require("path");

const express = require("express");

const contactsRoutes = require("./routes/contacts__routes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(contactsRoutes);

app.use(function (error, req, res, next) {
  console.log(error);
  res.status(500).render("500");
});

app.listen(3000);
