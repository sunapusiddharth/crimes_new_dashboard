var express = require('express');
const winston = require('winston')
const consoleTransport = new winston.transports.Console()
const myWinstonOptions = {
    transports: [consoleTransport]
}
const logger = new winston.createLogger(myWinstonOptions)

var app = express();
function logRequest(req, res, next) {
  logger.info(req.url)
  next()
}
app.use(logRequest)
function logError(err, req, res, next) {
  logger.error(err)
  next()
}
app.use(logError)
var cors = require('cors')
var db = require('./db');
const bodyParser = require('body-parser')
global.__root   = __dirname + '/';
//cors :
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api', function (req, res) {
  res.status(200).send('API works.');
});

logger.info("hi server started")

var lookupController = require(__root + './controller/lookup/lookups');
app.use('/api/lookup', lookupController);

var myController = require(__root + './controller/summarized/summarize');
app.use('/api/abcder', myController);

var supplementalController = require(__root + './controller/supplemental/supplementals');
app.use('/api/supplemental', supplementalController);

var offenseTkmController = require(__root + './controller/offense-tkm/offense_tkm');
app.use('/api/offense_tkm', offenseTkmController);

var offenderTkmController = require(__root + './controller/offender-tkm/offender_tkm');
app.use('/api/offender_tkm', offenderTkmController);

var preliminaryTkmController = require(__root + './controller/preliminary-tkm/preliminary_tkm');
app.use('/api/preliminary_tkm', preliminaryTkmController);

var policeEmploymentController = require(__root + './controller/police-employment/police_employment');
app.use('/api/police_employment', policeEmploymentController)

var victimsController = require(__root + './controller/victims/victims_data');
app.use('/api/victims', victimsController)

var estimatedCrimesController = require(__root + './controller/estimated_crimes/estimated_crimes');
app.use('/api/estimated_crimes', estimatedCrimesController)

var hateCrimesController = require(__root + './controller/hate_crimes/hate_crimes');
app.use('/api/hate_crimes', hateCrimesController)

var supplementalController = require(__root + './controller/supplemental/supplementals');
app.use('/api/supplemental', supplementalController)

var arrestsController = require(__root + './controller/arrests/arrests');
app.use('/api/arrests', arrestsController)

module.exports = app;