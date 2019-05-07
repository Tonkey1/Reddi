var express = require('express');
var router = express.Router();
// Get the choosesignup modal

/* GET home page. */0
router.get('/', function(req, res, next) {
	res.render('house');
});

module.exports = router;