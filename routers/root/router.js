const express = require('express'),
    path = require('path'),
    {
        readJSON
    } = require('../../lib/readWrite');
// global express router
const router = express.Router();

// global express web
const web = {
    title: "Gmeet - AutoJoiner"
}

// Api routes
router.get('/', async function (req, res) {
    // load and loop over time
    var session = await readJSON(path.join(__dirname, '../', '../', 'data', 'sessions.json'), true);
    if (session.success) {
        for (var i = 0; i < session.sessions.length; i++) {
            session.sessions[i].time = new Date(session.sessions[i].time);
        }
    } else {
        session.sessions = [];
    }

    // render page
    res.render('index.ejs', {
        web: {
            title: web.title,
            btn: {
                first: {
                    title: "Create Meeting",
                    href: "/meeting"
                },
                second: {
                    title: "Settings",
                    href: "/settings"
                }
            },
            session
        }
    });
});

router.get('/settings', function (req, res) {
    res.render('settings.ejs', {
        web: {
            title: web.title,
            btn: {
                first: {
                    title: "Home",
                    href: "/"
                },
                second: {
                    title: "Create Meeting",
                    href: "/meeting"
                }
            },
        }
    });
});

router.get('/meeting', function (req, res) {
    res.render('session.ejs', {
        web: {
            title: web.title,
            btn: {
                first: {
                    title: "Home",
                    href: "/"
                },
                second: {
                    title: "Settings",
                    href: "/settings"
                }
            },
        }
    });
});

module.exports = router;