const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'AZANIAN ANALYST', email:process.env.CONTACT_EMAIL,coffee:process.env.BUY_ME_A_COFFEE_URL,github:process.env.GITHUB_URL });
});

module.exports = router;
