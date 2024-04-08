const express = require("express");
const mongodb = require("mongodb");

const db = require("../data/database");

const ObjectId = mongodb.ObjectId;

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

  const data = await db.getDb().collection("contacts").insertOne(newContact);
  console.log(data);
  res.redirect("/");
});

router.get("/:id/edit", async function (req, res) {
  const contactId = req.params.id;

  const contact = await db
    .getDb()
    .collection("contacts")
    .findOne({ _id: new ObjectId(contactId) });

  if (!contact) {
    return res.status(404).render("404");
  }

  res.render("update__contact", {
    contact: contact,
  });
});

router.post("/:id/edit", async function (req, res) {
  const contactId = new ObjectId(req.params.id);
  const data = await db
    .getDb()
    .collection("contacts")
    .updateOne(
      { _id: contactId },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
        },
      }
    );
  console.log(data);
  res.redirect("/");
});

router.post("/:id/delete", async function (req, res) {
  const contactId = new ObjectId(req.params.id);
  const data = await db
    .getDb()
    .collection("contacts")
    .deleteOne({ _id: contactId });

  console.log(data);
  res.redirect("/");
});

module.exports = router;
