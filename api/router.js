const express = require('express');
// global express router
const router = express.Router();

// Api routes
router.get('/', function (req, res) {
    res.redirect(307, '/api/v1/');
});

router.get('/v1', async function (req, res) {
    return res.redirect(307, 'https://github.com/joshua-noakes1/autojoiner');
});

// sessions
router.use('/v1/session', require('./v1/session/session'));

module.exports = router;