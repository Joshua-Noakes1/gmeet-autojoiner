const path = require('path'),
    {
        readJSON,
        writeJSON
    } = require('../../../../lib/readWrite');

async function saveSession(sessionData) {

    // load sessions id
    var sessions = await readJSON(path.join(__dirname, '../', '../', '../', '../', 'data', 'sessions.json'), true);
    if (sessions.success == false) sessions = {
        success: true,
        sessions: []
    };

    // append new session to sessions
    sessions.sessions.push(sessionData);

    try {
        // save sessions id
        await writeJSON(path.join(__dirname, '../', '../', '../', '../', 'data', 'sessions.json'), sessions, true);
        return {
            success: true,
            message: `Saved session ${sessionData.id}`
        };
    } catch (error) {
        console.log(error);
        return {
            success: false
        };
    }

}

module.exports = saveSession;