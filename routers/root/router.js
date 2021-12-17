const express = require('express');
// global express router
const router = express.Router();

// Api routes
router.get('/', function (req, res) {
    res.render('index.ejs');
});

module.exports = router;