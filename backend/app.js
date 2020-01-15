var express = require('express');
var app = express();
var cors = require('cors')
var db = require('./db');
// const busboy = require('connect-busboy');
// const busboyBodyParser = require('busboy-body-parser');


// app.use(busboy());

global.__root   = __dirname + '/';
const bodyParser = require('body-parser')
//cors :
app.use(cors())
app.use(bodyParser.json())
// app.use(busboyBodyParser());

app.use(express.static('static'));



app.get('/api', function (req, res) {
  res.status(200).send('API works.');
});


var UserController = require(__root + 'user/users.controller');
app.use('/api/users', UserController);

var CrimeController = require(__root + '/controller/crime');
app.use('/api/crime', CrimeController);

var CrimesController = require(__root + '/controller/crimes/crimes');
app.use('/api/crimes', CrimesController);

var IncidentController = require(__root + '/controller/incidentData');
app.use('/api/incident', IncidentController);

var AuthController = require(__root + 'auth/AuthController');
app.use('/api/auth', AuthController);

//form controller:
var FormController = require(__root + 'controller/forms');
app.use('/api/forms', FormController);

//search controller :
var SearchController = require(__root + 'controller/search/index');
app.use('/api/search', SearchController);

//people controller :
var PeopleController = require(__root + 'controller/people');
app.use('/api/people', PeopleController);

//table controller :
var TableController = require(__root + 'controller/tables/tables');
app.use('/api/tables', TableController);

//news articles controller :
var NewsController = require(__root + 'controller/news/news');
app.use('/api/news', NewsController);

//crime news controller :
var CrimeNewsController = require(__root + 'controller/crime_news/crime_news');
app.use('/api/crime_news', CrimeNewsController);

//Contact feedback controller :
var ContactFeedbackController = require(__root + 'controller/contactUs/contactUs');
app.use('/api/contact', ContactFeedbackController)

//Mailer controller :
var MailerController = require(__root + 'controller/mail/mail');
app.use('/api/mail', MailerController)

//busboy setup for s3:



module.exports = app;