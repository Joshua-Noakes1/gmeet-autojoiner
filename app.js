const lcl = require('cli-color'),
    compression = require('compression'),
    cors = require('cors'),
    morgan = require('morgan'),
    bodyParser = require("body-parser"),
    awaitMeet = require('./lib/gmeet/startMeet'),
    express = require('express');

// global express
const app = express();

// express middlewares
app.use(compression());
app.use(cors());
app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// express routes
app.use('/', require('./routers/root/router'));
app.use('/static', express.static(__dirname + '/public'));
app.use('/api', require('./api/router'));


// start express server
const port = process.env.PORT || 3000;
app.listen(port, async function () {
    awaitMeet();
    console.log(lcl.blue("[Express - Info]"), "Started on port", lcl.yellow(port));
});