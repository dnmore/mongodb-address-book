const express = require("express");

const db = require("../data/database");

const router = express.Router();

router.get("/", async function (req, res) {
  const contacts = await db.getDb().collection("contacts").find({}).toArray();
  res.render("all__contacts", { contacts: contacts });
});

router.get("/new-contact", function (req, res) {
  res.render("new__contact");
});

router.post("/", async function (req, res) {
  const newContact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };

  const result = await db.getDb().collection("contacts").insertOne(newContact);
  console.log(result);
  res.redirect("/");
});

router.get("/update-contact", function (req, res) {
  res.render("update__contact");
});

module.exports = router;
