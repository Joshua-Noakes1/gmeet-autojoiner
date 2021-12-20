const path = require('path'),
    {
        readJSON,
        writeJSON
    } = require('../../../../lib/readWrite');

async function deleteSession(sessionData) {
    // load sessions
    var session = await readJSON(path.join(__dirname, '../', '../', '../', '../', 'data', 'sessions.json'), true);
    if (session.success == false) return {
        success: false
    };

    // loop over till we find the session id
    var sessionID;
    for (var i = 0; i < session.sessions.length; i++) {
        if (session.sessions[i].uuid == sessionData) {
            sessionID = i;
        }
    }

    // catch if session id not found
    if (sessionID == undefined) return {success: false};

    // remove meeting from sessions
    session.sessions.splice(sessionID, 1);

    // save sessions
    try {
        await writeJSON(path.join(__dirname, '../', '../', '../', '../', 'data', 'sessions.json'), session, true);
        return {
            success: true
        };
    } catch (error) {
        return {
            success: false
        };
    }
}

module.exports = deleteSession;