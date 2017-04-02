var express = require('express');
var router = express.Router();

/* POST login. */
router.post('/login', function(req, res, next) {
  // TODO: Perform login checks
  res.redirect('/dashboard');
});

/* GET logout. */
router.get('/logout', function(req, res, next) {
  //req.logout();
  //req.session.destroy();
  res.redirect('/');
});

module.exports = router;