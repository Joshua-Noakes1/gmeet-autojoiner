const express = require('express'),
    lcl = require('cli-color'),
    {
        v4: uuidv4
    } = require('uuid'),
    saveSession = require('./middlewares/saveSession'),
    deleteSession = require('./middlewares/deleteSession');

// global express router
const router = express.Router();

// catch all
router.get('/', function (req, res) {
    return res.status(400).json({success: false, message:"This endpoint only accepts POST requests"});
});

// create session
router.post('/create', async function (req, res) {
    const session = req.body;

    // check if name and time are in req
    if (!session.name || !session.time || !session.id) return res.status(400).json({success: false, message: "Missing name, name or URL"});

    const sessionData = {
        uuid: uuidv4(),
        name: session.name,
        time: session.time,
        id: session.id
    }

    var sessionSaved = await saveSession(sessionData);

    if (sessionSaved.success) {
        console.log(lcl.blue("[Session - Info]"), "Created session", `(${lcl.yellow(sessionData.uuid)})`);
        return res.json({
            success: true,
            message: "Saved session",
            uuid: sessionData.uuid
        });
    } else {
        console.log(lcl.red("[Session - Error]"), "Failed to create session");
        return res.status(500).json({
            success: false,
            message: "Failed to save session"
        });
    }
});

// delete session
router.post('/delete', async function (req, res) {
    const session = req.body;

    if (!session.uuid) return res.status(400).json({success: false, message: "Missing id"});

    var sessionData = await deleteSession(session.uuid);

    if (sessionData.success) {
        console.log(lcl.blue("[Session - Info]"), "Deleted session", `(${lcl.yellow(session.uuid)})`);
        return res.json({
            success: true,
            message: "Deleted session",
            uuid: session.uuid
        });
    } else {
        console.log(lcl.red("[Session - Error]"), "Failed to delete session");
        return res.status(500).json({
            success: false,
            message: "Failed to delete session"
        });
    }
});

module.exports = router;