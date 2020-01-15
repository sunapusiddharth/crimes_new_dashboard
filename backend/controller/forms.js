var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var VerifyToken = require(__root + 'auth/VerifyToken');
var departmentHelpers = require('./department/department')
var dataProviderBlogs = require('./department/dataProviderBlogs')
var postHelpers = require('./department/posts')
const faker = require('faker')

//redis setup used for caching department data which egts data from external linsk ;
const redis = require('redis');

const client = redis.createClient();

client.on('error', (err) => {
    console.log("Error " + err);
});

router.use(bodyParser.urlencoded({
    extended: true
}));

var forms = require('../model/forms');
var populateForms = require('./populateForms');
const blog_comment = require('../model/department_blogs/blog_comment');

//Gives all departments 
router.post('/departments', async function (req, res) {
    //give all depts then seaprate object which will have dep and their details ....
    //in ui when search is done then depatment will come and the searched forms will be displayed under it .
    //get states, cities , agency , organization , we need to arrange the child dept under parent dept .
    //since we can have larger data which needs pagination so can't use reduce to group data 
    let cities = await forms.distinct("city").exec()
    let states = await forms.distinct("state").exec()
    let organizations = await forms.distinct("organization").exec()
    let domain_types = await forms.distinct("domain_type").exec()
    let total_records = await forms.count().exec()
    let { limit, skip} = req.body
    forms.find({description:{$ne:null},parent_id:{$ne:0}}).skip(skip).limit(parseInt(limit)).sort({agencies:-1}).exec(function (error, departments) {
        if (error) {
            res.status(500).send(error)
        } else {
            res.send([
                { "cities": cities }, { "states": states }, { "organizations": organizations }, { "domain_types": domain_types }, { "departments": departments }, { "total_records": total_records }
            ])
        }
    })
});

//below is incompltee where i tried to get grouped by docs based on paent id alog eith parent doc included in it
router.post('/departments2', async function (req, res) {
    // What data to be pulled ? 
    // trending : sort by hits date less than month more than 7 days, 
    // top headlines: sort by hits date less than 7 days 
    // category wise grouping and return top 10 of them to show in card columns with category
    // video news : random data from frontend
    // all news sorted by date .
    // most popular - of all time less than year sorted by hits
    // 
    try {
        // return client.get(`departments`, async (err, result) => {
            let docs = []
            let aggregation_array = []
            aggregation_array = [{
                $facet: {
                    "grouped_by_parent_id":[
                        {$match:{$and:[{"description":{$ne:null}},{"parent_id":{$ne:0}}]}},
                        {$group:{
                            _id:{parent_id:"$parent_id",id:'$_id'},
                            parent_doc_id:{$first:"$$ROOT"},
                            count: { $sum: 1 },
                            data: {
                                $push:'$$ROOT'
                            }
                        }} ,
                        {
                            $project: {
                                _id:1,
                                id:1,
                                domain_name:1,
                                domain_type:1,
                                agency:1,
                                organization:1,
                                city:1,
                                state:1,
                                data:1
                              }
                        } 
                    ],
                }
            }]
            cursor = forms.aggregate(aggregation_array)
                .allowDiskUse(true).cursor({
                    batchSize: 10
                }).exec()
            await cursor.eachAsync(data => docs.push(data));
            console.log("Success in fucntion crimeNews:", aggregation_array)
            // client.setex(`crime_news`, 180000, JSON.stringify(docs));
            res.status(200).send(docs)
            // if (result) {
            //     const resultJSON = JSON.parse(result);
            //     return res.status(200).json(resultJSON);
            // } else {
            //     let docs = []
            //     let aggregation_array = []
            //     aggregation_array = [
            //         {$match:{$and:[{"description":{$ne:null}},{"parent_id":{$ne:0}}]}}                    
            //     ]
            //     cursor = forms.aggregate(aggregation_array)
            //         .allowDiskUse(true).cursor({
            //             batchSize: 10
            //         }).exec()
            //     await cursor.eachAsync(data => docs.push(data));
            //     logger.info("Success in fucntion crimeNews:", aggregation_array)
            //     client.setex(`crime_news`, 180000, JSON.stringify(docs));
            //     res.status(200).send(docs)
            // }
        // })

    } catch (error) {
        console.log("Error in fucntion crimeNews:", error)
        res.status(500).send(error)
    }
})

//to get single department:
router.get('/department/:id', function (req, res) {
    //redis implemenattion to give faster results : need to set TTL.
    //additional data req :
    return client.get(`department:${req.params.id}`, async (err, result) => {
        if (result) {
            const resultJSON = JSON.parse(result);
            return res.status(200).json(resultJSON);
        } else {
            // let random_number = await faker.random.number(10) //takes longer time
            let random_number = Math.floor(Math.random() * 5) + 1
            console.log("random number = ", random_number)
            let promises = [departmentHelpers.getBlogPosts(random_number),
            departmentHelpers.getPressReleases(random_number),
            departmentHelpers.getSpeeches(random_number),
            departmentHelpers.getVacancyAnnouncements(random_number),
            departmentHelpers.getMostWantedPeople(random_number),
            departmentHelpers.getNews(random_number)
            ]
            let dept_related_data = await Promise.all(promises)
            forms.findById(req.params.id).exec(function (error, department) {
                if (error) {
                    console.log(error)
                    res.status(500).send(error)
                } else {
                    console.log("array length=", dept_related_data.length)
                    const responseJSON = [department,
                        { "blog_posts": dept_related_data[0] },
                        { "press_release": dept_related_data[1] },
                        { "speeches": dept_related_data[2] },
                        { "vacancy_announcements": dept_related_data[3] },
                        { "most_wanted_people": dept_related_data[4] },
                        { "news": dept_related_data[5] },
                    ];
                    client.setex(`department:${req.params.id}`, 36000, JSON.stringify(responseJSON));
                    res.status(200).send(responseJSON)
                }
            })
        }
    })
});

//to get single dept without related info 
router.get('/department/without_related_info/:id', function (req, res) {
    forms.findById(req.params.id).exec(function (error, department) {
        if (error) {
            console.log(`Error in dept without_related_info ${req.params.id}:${error}`)
            res.status(500).send(error)
        } else {
            console.log(`Success in dept without_related_info ${req.params.id}:${department}`)
            res.status(200).send(department)
        }
})
})

//to get all paginated forms by deoartment :
router.post('/forms_by_department', async function (req, res) {
    let { department_id, page } = req.body
    var perPage = 10
        , current_page = Math.max(0, page);
    forms.findById(department_id, { forms: 1 }).limit(perPage).skip(perPage * current_page).exec(function (error, forms) {
        if (error) {
            res.status(500).send(error)
        } else {
            res.send(forms)
        }
    })
});


//to filter departments 
router.post('/filter_departments', async function (req, res) {
    let { page, agency, organization, city, state, sort_field } = req.body
    var perPage = 10
        , current_page = Math.max(0, page);
    forms.find({
        $or: [
            { agency: agency },
            { organization: organization },
            { city: city },
            { state: state }
        ]
    }).sort(sort_field).limit(perPage).skip(perPage * current_page).exec(function (error, departments) {
        if (error) {
            res.status(500).send(error)
        } else {
            res.send(departments)
        }
    })
});

//et all filters for departments :
router.get('/department_filters', async function (req, res) {
    forms.aggregate([
        {
            $group: {
                _id: null,
                city: { $addToSet: '$city' },
                organization: { $addToSet: '$organization' },
                agency: { $addToSet: '$agency' },
                state: { $addToSet: '$state' }
            }
        }
    ]).project({ _id: 0 }).exec(function (error, filters) {
        if (error) {
            res.status(500).send(error)
        } else {
            res.send(filters)
        }
    })
});


//get all posts
router.get('/posts/:page_number', function (req, res) {
    //adding cache since it relies on external calls and will take longer time .
    return client.get(`posts:${req.params.page_number}`, async (err, result) => {
        if (result) {
            const resultJSON = JSON.parse(result);
            return res.status(200).json(resultJSON);
        } else {
            // let random_number = await faker.random.number(10) //takes longer time
            let data = await postHelpers.getAllPosts(req.params.page_number)
            let object_to_send = {
                metadata: {
                    responseInfo: {
                    status: 200,
                    developerMessage: "OK"
                    },
                    resultset: {
                    count: 2373,
                    pagesize: 20,
                    page: req.params.page_number
                    },
                    executionTime: 0.29851794242858887
                    },
                    results:data   
            }
            client.setex(`posts:${req.params.page_number}`, 36000, JSON.stringify(object_to_send));
            res.status(200).send(object_to_send)
        }
    }) 
})

//get individual post
router.get('/post/:post_id', async function (req, res) {
    postHelpers.getIndividualPost(req.params.post_id).then(async result=>{
        let paginatedComments = await blog_comment.find({ "discussion_id": result._id }).sort('full_slug').exec()
        res.status(200).send([result,paginatedComments])
    }).catch(error=>{
        console.log("Error in post/post_id",error)
        res.status(500).send(error)
    })
})

//scrap al posts and save in mongodb 
router.get('/add_department_posts_table', async function (req, res) {
    postHelpers.scrapPosts(req,res)
 })

 //scrap al sppeches and save in mongodb 
router.get('/add_department_speeches_table', async function (req, res) {
    postHelpers.scrapSpeeches(req,res)
 })

  //scrap al vacancies and save in mongodb 
router.get('/add_department_vacancies_table', async function (req, res) {
    postHelpers.scrapVacancies(req,res)
 })


router.get('/faker_data', async function (req, res) {
    let {start,stop} = req.params
    let final_data = await Array(10).fill().map((val, idx) => {
        return {
          id: idx, 
          name: 'John Doe',
          image: 'http://via.placeholder.com/40',
          text: faker.lorem.sentences(2)
        }
      });
      console.log("faker_data=",final_data)
      res.status(200).send(final_data)
})


//get department details :

//get all posts
router.get('/posts_speeches/:page_number', function (req, res) {
    //adding cache since it relies on external calls and will take longer time .
    return client.get(`posts_speeches:${req.params.page_number}`, async (err, result) => {
        if (result) {
            const resultJSON = JSON.parse(result);
            return res.status(200).json(resultJSON);
        } else {
            // let random_number = await faker.random.number(10) //takes longer time
            let data = await postHelpers.getAllSpeeches(req.params.page_number)
            let object_to_send = {
                metadata: {
                    responseInfo: {
                    status: 200,
                    developerMessage: "OK"
                    },
                    resultset: {
                    count: 2373,
                    pagesize: 20,
                    page: req.params.page_number
                    },
                    executionTime: 0.29851794242858887
                    },
                    results:data   
            }
            client.setex(`posts:${req.params.page_number}`, 36000, JSON.stringify(object_to_send));
            res.status(200).send(object_to_send)
        }
    }) 
})

// get single sppech :
router.get('/speeches/:speech_id', async function (req, res) {
    postHelpers.getIndividualSpeeches(req.params.speech_id).then(result=>{
        console.log("Success in speech/speech_id")
        res.status(200).send(result)
    }).catch(error=>{
        console.log("Error in speech_id/speech_id",error)
        res.status(500).send(error)
    })
})

//get all job vacancies:
router.get('/department_vacancies/:page_number', function (req, res) {
    //adding cache since it relies on external calls and will take longer time .
    return client.get(`department_vacancies:${req.params.page_number}`, async (err, result) => {
        if (result) {
            const resultJSON = JSON.parse(result);
            return res.status(200).json(resultJSON);
        } else {
            // let random_number = await faker.random.number(10) //takes longer time
            let data = await postHelpers.getAllVacancies(req.params.page_number)
            let object_to_send = {
                metadata: {
                    responseInfo: {
                    status: 200,
                    developerMessage: "OK"
                    },
                    resultset: {
                    count: 2373,
                    pagesize: 20,
                    page: req.params.page_number
                    },
                    executionTime: 0.29851794242858887
                    },
                    results:data   
            }
            client.setex(`department_vacancies:${req.params.page_number}`, 36000, JSON.stringify(object_to_send));
            res.status(200).send(object_to_send)
        }
    }) 
})

// get single vacancies :
router.get('/department_vacancy/:vacancy_id', async function (req, res) {
    postHelpers.getIndividualVacancies(req.params.vacancy_id).then(result=>{
        console.log("Success in vacancy_id/vacancy_id")
        res.status(200).send(result)
    }).catch(error=>{
        console.log("Error in vacancy_id/vacancy_id",error)
        res.status(500).send(error)
    })
})

// BLOGS :

// get single vacancies :
router.post('/department_blogs/add_new_blog', async function (req, res) {
    // res.status(200).send(req.body)
    dataProviderBlogs.createNewBlog(req,res)
})

// ad new Comments to blog:
router.post('/department_blogs/add_new_comments', async function (req, res) {
    dataProviderBlogs.addNewCommentsToBlog(req,res)
})

//Create compound index compound index on (discussion_id, bucket) in the comment_buckets collection,
router.post('/department_blogs/get_paginated_comments_sorted_by_date', async function (req, res) {
    dataProviderBlogs.getPaginatedComments(req,res)
})

//remove all keys for redis
router.post('/clear_redis_keys', async function (req, res) {
    client.del('posts:*',function(error,result){
        if(error){
            console.log("Error=",error)
        }
        console.log("result=",result)
    })
})


//   crae/te departments bulk
  router.get('/populate_departments', async function (req, res) {
    populateForms.populateForms(req,res)
 })





module.exports = router;