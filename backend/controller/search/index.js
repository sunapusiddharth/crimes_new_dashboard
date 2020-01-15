//all the search indexing controller routes will be added here and will be used to invoke the different indexing 
//functions :

//setup and test elasticsearch connection :
const elasticsearch = require('elasticsearch')
//check elasticsearch :
const client = new elasticsearch.Client({
    host: '127.0.0.1:9200',
    log: 'error'
  });
  
  client.ping({ requestTimeout: 30000 }, function(error) {
    if (error) {
        console.error('elasticsearch cluster is down!');
    } else {
        console.log('Everything is ok');
    }
  });

  //setiup of router :
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
    extended: true
}));
var VerifyToken = require(__root + 'auth/VerifyToken');

const departments = require('./indexing/departments')
const people = require('./indexing/people')
const crime = require('./indexing/crime')
const departments_search = require('./searching/departments')
const all_search = require('./searching/all')
const people_search = require('./searching/people')
const department_forms = require('./indexing/departmentForms')

const crimes_search = require('./searching/crime')

// News:
const crime_news = require('./indexing/crime_news')
const crime_news_search = require('./searching/crime_news')

// department details 
const department_posts = require('./indexing/departments/posts')
const department_speeches = require('./indexing/departments/speeches')
const department_vacancies = require('./indexing/departments/vacancies')
const department_details = require('./searching/department_details')
// bulk_index_departments
router.get('/bulk_index_departments', async function (req, res) {
    departments.departmentBulkIndex(client,req,res)
})

// autocomplete suggester for departments :
router.post('/departments/autocomplete', async function (req, res) {
    departments_search.departmentAutocomplete(client,req,res)   
})

// autocomplete nGram for forms :
router.post('/forms/autocomplete', async function (req, res) {
    departments_search.autoCompletesearchForms(client,req,res)
})

// search for departments :
router.post('/departments', async function (req, res) {
    departments_search.findDepartments(client,req,res)
})


// departments get GGS FOR filyers:
router.get('/departments/aggs', async function (req, res) {
    departments_search.departmentFilterAggs(client,req,res)
})

// People:
// bulk_index_departments
router.get('/bulk_index_people', async function (req, res) {
    people.peopleBulkIndex(client,req,res)
})

// Crimes
// bulk_index_crimes
router.get('/bulk_index_crimes', async function (req, res) {
    crime.crimeBulkIndex(client,req,res)
})

router.post('/people', async function (req, res) {
   people_search.findPeople(client,req,res,req.query.search_query)
})

router.post('/autocomplete/people', async function (req, res) {
    people_search.autoCompletePeople(client,req,res,req.query.search_query)
 })
 

router.post('/word_cloud/:index_name', async function (req, res) {
    all_search.wordCloud(client,req,res)
 })

//forms index attchamnets 
router.get('/forms/index', async function (req, res) {
    department_forms.indexDepartmentForms(client,req,res)
})

// forms create mappign 
router.get('/forms/mapping', async function (req, res) {
    department_forms.createAttachmentMapping(client,req,res)
})

// forms search
router.post('/forms/search', async function (req, res) {
    department_forms.searchDepartmentForms(client,req,res)
})



// crimes search 
router.post('/crimes', async function (req, res) {
    crimes_search.findCrimes(client,req,res)
})
//find nearby crimes
router.post('/nearby_crimes', async function (req, res) {
    crimes_search.findNearbyCrimes(client,req,res)
})
// News :
router.get('/crime_news/bulk_index', async function (req, res) {
    crime_news.crimeNewsBulkIndex(client,req,res)
})

router.post('/crime_news', async function (req, res) {
    crime_news_search.findCrimeNews(client,req,res)
})

// Department details :

router.get('/bulk_index_department_posts', async function (req, res) {
    department_posts.departmentPostBulkIndex(client,req,res)
})

router.get('/bulk_index_department_speeches', async function (req, res) {
    department_speeches.departmentSpeechBulkIndex(client,req,res)
})
router.get('/bulk_index_department_vacancies', async function (req, res) {
    department_vacancies.departmentVacanciesBulkIndex(client,req,res)
})


// Searching :
router.post('/department_details/find/post', async function (req, res) {
    department_details.findDepartmentPosts(client,req,res)
})

router.post('/department_details/autocomplete/post', async function (req, res) {
    department_details.autocompleteDepartments(client,req,res)
})

//department speeches
router.post('/department_details/find/speeches', async function (req, res) {
    department_details.findDepartmentSpeeches(client,req,res)
})

router.post('/department_details/autocomplete/speeches', async function (req, res) {
    department_details.autocompleteDepartmentSpeeches(client,req,res)
})

//department vacancies
router.post('/department_details/find/vacancies', async function (req, res) {
    department_details.findDepartmentVacancies(client,req,res)
})


module.exports = router;