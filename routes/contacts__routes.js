const express = require("express");

const router = express.Router();

router.get("/", function (req, res) {
  res.render("all__contacts");
});


router.get('/new-contact', function(req, res){
    res.render('new__contact')
})

router.get('/update-contact', function(req, res){
    res.render('update__contact')
})

module.exports = router;
