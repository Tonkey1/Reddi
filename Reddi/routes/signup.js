// window.addEventListener('load', window.onclick, false);
// var choosesignup = document.getElementById('choosesignup');

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == choosesignup||event.target == forgotpsw) {
//         choosesignup.style.display = "none";
//     }
// }
var express = require('express');
var router = express.Router();
// Get the choosesignup modal

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup');
});

module.exports = router;