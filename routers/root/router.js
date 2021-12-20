const express = require('express');
// global express router
const router = express.Router();

// Api routes
router.get('/', function (req, res) {
    res.render('index.ejs', {web: {title: "Gmeet - AutoJoiner", github: "gmeet-autojoiner"}});
});
router.get('/old', function (req, res) {
    res.render('index.old.ejs');
});

module.exports = router;