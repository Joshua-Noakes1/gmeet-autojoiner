const express = require('express'),
    lcl = require('cli-color'),
    saveAccount = require('./middlewares/saveAccount');

// global express router
const router = express.Router();

// catch all
router.get('/', function (req, res) {
    return res.status(400).json({success: false, message:"This endpoint only accepts POST requests"});
});

// create session
router.post('/update', async function (req, res) {
    const account = req.body;

    if (!account.email || !account.password) return res.status(400).json({success: false, message: "Missing email or password"});

    var accountSaved = await saveAccount(account);

    if (accountSaved.success) {
        console.log(lcl.blue("[Account - Info]"), "Updated account");
        return res.json({
            success: true,
            message: "Updated account"
        });
    } else {
        console.log(lcl.red("[Account - Error]"), "Failed to update account");
        return res.status(500).json({
            success: false,
            message: "Failed to update account"
        });
    }
});

module.exports = router;