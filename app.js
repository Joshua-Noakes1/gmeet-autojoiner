const lcl = require('cli-color'),
    compression = require('compression'),
    cors = require('cors'),
    morgan = require('morgan'),
    bodyParser = require("body-parser")
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
app.use('/', function (req,res) {
    res.render('index.ejs'); // TODO: Make into its own router
});
app.use('/api', require('./api/router'));


// start express server
const port = process.env.PORT || 3000;
app.listen(port, async function () {
    console.log(lcl.blue("[Express - Info]"), "Started on port", lcl.yellow(port));
});