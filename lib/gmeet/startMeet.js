const Gmeet = require('./Gmeet'),
    gmeet = new Gmeet(),
    lcl = require('cli-color'),
    path = require('path'),
    {
        readJSON,
        writeJSON
    } = require('../readWrite');

function awaitMeet() {
    setInterval(async () => {
        // load sessions
        const session = await readJSON(path.join(__dirname, '../', '../', 'data', 'sessions.json'), true);
        const account = await readJSON(path.join(__dirname, '../', '../', 'data', 'account.json'), true);

        // loop through sessions
        if (session.success) {
            for (let i = 0; i < session.sessions.length; i++) {
                if (session.sessions[i].time <= Date.now()) {
                    if (account.success) {

                        // Log
                        console.log(lcl.blue("[Session - Info]"), "Starting new session", `(${lcl.yellow(session.sessions[i].uuid)})`);

                        // start meet
                        gmeet.join(session.sessions[i].id, account.email, account.password);

                        // delete session
                        session.sessions.splice(i, 1);

                        // save sessions
                        await writeJSON(path.join(__dirname, '../', '../', 'data', 'sessions.json'), session, true);
                    }
                }
            }
        }
    }, 1000);
}

module.exports = awaitMeet;