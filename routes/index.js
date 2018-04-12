var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("You have reached API testing page, try some calls");
});

module.exports = router;
