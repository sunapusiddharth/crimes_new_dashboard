var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const faker = require('faker')
const fetch = require('node-fetch')
var VerifyToken = require(__root + 'auth/VerifyToken');

const csvFilePath = __root + '\\data\\crime.csv'
const Busboy = require('busboy');
const AWS = require('aws-sdk')

const BUCKET_NAME = 'crimeportal'
const IAM_USER_KEY = 'AKIAUYVA3TWYITB45LF6'
const IAM_USER_SECRET = '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'
const populateRelationships = require('./populateRelationships')


// const csv=require('csvtojson')
const csv = require('fast-csv')
var crime = require('../model/crimes');
const fs = require('fs')
const mailer_url = `http://${process.env.REACT_APP_API_HOST}:8006/api/`
const search_crimes_query = require('./search/searching/crime_query')

router.use(bodyParser.urlencoded({
    extended: true
}));
var crime = require('../model/crimes')
var address = require('../model/address')
// var csvFile = require('../data/crime.csv')
// CREATES A NEW CRIME : Need to add crime title and description also add random date , district,reporting area,state,country
router.get('/populate_tables', async function (req, res) {
    let crimes_scrapped = await fetch(mailer_url + 'scrap/crime/get_all_crime_scrapped_data').then(res => res.json())
      let all_addresses = await address.find({}).exec()
    // console.log("random ",all_addresses)
    // process.exit(0)
    let crimes_appended_to_db = []
   await  fs.createReadStream(csvFilePath)
        .pipe(csv.parse({
            headers: true
        }))
        .on('data', async row => {
            var record = crimes_scrapped[Math.floor(Math.random() * (crimes_scrapped.length-0 ) + 0)];
            let random_address= all_addresses[Math.floor(Math.random() * (all_addresses.length-0) + 0)];
            crimes_appended_to_db.push(random_address)
            // console.log(random_address)
            // process.exit(0)
            row.address = random_address.address
            row.city = random_address.city
            row.state = random_address.state
            row.postalCode = random_address.postalCode
            row.loc = random_address.loc
            row.REPORTING_AREA = isNaN(row.reporting_area) ? 0 : parseInt(row.REPORTING_AREA)
            let occured_date = await faker.date.past()
            occured_date = new Date(occured_date)
            row.YEAR = occured_date.getFullYear()
            row.MONTH = occured_date.getMonth()
            row.HOUR = occured_date.getTime()
            crime.create({
                incident_number: row.INCIDENT_NUMBER,
                address:row.address,
                offense_code: row.OFFENSE_CODE,
                offense_code_group: row.OFFENSE_CODE_GROUP,
                offense_description: row.OFFENSE_DESCRIPTION,
                district: row.DISTRICT,
                reporting_area: row.REPORTING_AREA,
                schooting: row.SHOOTING,
                occurence_on_date:new Date( faker.date.past()),
                year: row.YEAR,
                month: row.MONTH,
                day_of_week: row.DAY_OF_WEEK,
                hour: row.HOUR,
                ucr_part: row.UCR_PART,
                street: row.STREET,
                location: row.Location,
                title : record && record.title? record.title: await faker.lorem.sentences(1),
                description : record && record.description? record.description: await faker.lorem.sentences(4),
                imageUrl : record && record.imageUrl?record.imageUrl:await faker.image.imageUrl(),
                category : "murder",
                city:row.city,
                state:row.state,
                postalCode:row.postalCode,
                loc:row.loc,
            }, function (err, crime) {
                // console.log("err=", err)
                // console.log("record inserted!!!")
                // process.exit(0)
                // if (err) return res.status(500).send(err);
                crimes_appended_to_db.push(crime)
            })

        })
    res.status(200).send(crimes_appended_to_db)
});

//route to send data for dashboard table :
router.post('/dashboard_table', async function (req, res) {
    let {
        filters,
        start,
        limit,
        offset
    } = req.body
    // query used :db.crimes.aggregate([{$group:{_id:"$offense_code_group",records:{$push:"$$ROOT"},count:{$sum:1}}}],{allowDiskUse:true,cursor:{}})
    //parsing the filters:
    let criteria = [];
    // console.log(req.body)
    if (filters) {
        filters.map(filter => {
            if (filter.id && filter.value.length > 0) {
                console.log("filter=", filter.id)
                var filter_name = filter.id == '_id' ? 'offense_group' : filter.id
                var value = filter.value
                let keyVal = {}
                keyVal[filter_name] = value
                criteria.push(keyVal);
            }
        })
        criteria = criteria.length > 0 ? {
            $and: criteria
        } : {};

    }
    try {
        let docs = []
        let cursor
        if (criteria.length) {
            cursor = crime.aggregate().match(criteria)
                .group({
                    _id: '$offense_code_group',
                    //to add selcted fields use :
                    offense_code: {
                        "$first": "$offense_code"
                    },
                    offense_description: {
                        "$first": "$offense_description"
                    },
                    // records:{$push:"$incident_number"},
                    count: {
                        $sum: 1
                    }
                }).allowDiskUse(true).cursor({
                    batchSize: 10
                }).exec()
        } else {
            cursor = crime.aggregate().group({
                _id: '$offense_code_group',
                //to add selcted fields use :
                offense_code: {
                    "$first": "$offense_code"
                },
                offense_description: {
                    "$first": "$offense_description"
                },
                // records:{$push:"$incident_number"},
                count: {
                    $sum: 1
                }
            }).allowDiskUse(true).cursor({
                batchSize: 10
            }).exec()
        }
        await cursor.eachAsync(data => docs.push(data));
        res.status(200).send(docs)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
    // crime.find({}).limit(10).then(data=>res.status(200).send(data)).catch(err=>res.status(500).send(err))
})

//route to get incident data for dashboard:
router.post('/dashboard_incident_table', async function (req, res) {
    let {
        filters,
        start,
        limit,
        offset,
        offense_code
    } = req.body
    offset = offset ? offset : 0
    limit = limit ? limit : 10
    // query used :db.crimes.aggregate([{$group:{_id:"$offense_code_group",records:{$push:"$$ROOT"},count:{$sum:1}}}],{allowDiskUse:true,cursor:{}})
    // let docs = []
    console.log("offense_code=", offset, limit, req.body)
    crime.find({
        "offense_code": offense_code
    }, {
            incident_number: 1,
            district: 1,
            reporting_area: 1,
            schooting: 1,
            occurence_on_date: 1,
            year: 1,
            month: 1,
            day_of_week: 1,
            hour: 1,
            ucr_part: 1,
            street: 1,
        }).skip(offset).limit(limit).then(docs => {
            res.status(200).send(docs)
        }).catch(error => {
            res.status(500).send(error)
        })
    // crime.find({}).limit(10).then(data=>res.status(200).send(data)).catch(err=>res.status(500).send(err))
})

router.post('/upload_crime_photos', async function (req, res) {
    const element1 = req.body.element1;
    var busboy = new Busboy({ headers: req.headers });
    // The file upload has completed
    busboy.on('finish', function () {
        console.log('Upload finished');// Your files are stored in req.files. In this case,
        // you only have one and it's req.files.element2:
        // This returns:
        // {
        //    element2: {
        //      data: ...contents of the file...,
        //      name: 'Example.jpg',
        //      encoding: '7bit',
        //      mimetype: 'image/png',
        //      truncated: false,
        //      size: 959480
        //    }
        // }
        // Grabs your file object from the request.
        console.log("files", req.files)
        const file = req.files.element2;
        console.log(file);
        // Begins the upload to the AWS S3
        uploadToS3(file);

        res.send({
            success: 'uploaded'
        })
    });
    req.pipe(busboy);

})

//to populate the data sequence to be followed : populate_tables crimes,  populate_incident_tables (incident table) , populate_people (people table) , populate_incident_people (incident_people table) 
//routes to populate relationship tables :
router.get('/populate_people', function (req, res) {
    populateRelationships.populatePeopleTable()
    res.status(200).send("runnnign in background !!!!")
})

router.get('/populate_incident_people', function (req, res) {
    populateRelationships.populateincidentPeopleTable()
    res.status(200).send("runnnign in background !!!!")
})

router.get('/populate_incident_tables', function (req, res) {
    populateRelationships.populateTables()
    res.status(200).send("runnnign in background !!!!")
})


module.exports = router;

//promise aggregate 


async function aggregatePromise(aggregation) {
    let doc, cursor;
    let docs = []
    cursor = aggregation.allowDiskUse(true).cursor({
        batchSize: 100
    }).exec();
    while (doc = await cursor.next()) {
        console.log(doc._id)
    }
    // return cursor.next()
}

function uploadToS3(file) {
    let s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
        Bucket: BUCKET_NAME,
    });
    s3bucket.createBucket(function () {
        var params = {
            Bucket: BUCKET_NAME,
            Key: file.name,
            Body: file.data,
        };
        s3bucket.upload(params, function (err, data) {
            if (err) {
                console.log('error in callback');
                console.log(err);
            }
            console.log('success');
            console.log(data);
        });
    });
}


function convertStringToNumber(num) {
    num = num.split(',').join('.');
    if (num.indexOf('-') == num.length - 1) {
        num = '-' + num.substr(0, num.length - 1);
    }
    return parseFloat(num) || null;
}


router.post('/nearby_crimes', (req, res) => {
    let lat = req.body.lat
    let lon = req.body.lon
    let skip = req.body.skip
    let limit = req.body.limit
        let body = search_crimes_query.crimeLocationQuery(lat,lon,skip,limit)
        // res.status(200).send(body)
        
        fetch(`http://${process.env.REACT_APP_API_HOST}:9200/crimes/_search`,{
            method:"POST",
            body:JSON.stringify(body),
            headers:{
                'Content-Type':'application/json'
            }
           }).then(response=>response.json())
           .then(data=>{
            console.log("success in finding nearby crimes in crimes- controller findNearbyCrimes fn =",data.length)
            res.status(200).send(data)
           })
           .catch(error=>{
            console.log("error in finding nearby crimes in crimes- controller findNearbyCrimes fn =",error)
            res.status(500).send(error)
        })
})


router.get('/:crime_id', async (req, res) => {
    //give data including all related data including people .
    //NEW - also pass in the results for nearby crimes using findNearbyQuery. 
    //Note - by default the req will be in form lat,lon we need to convert it to lon - lat
    const mongoose = require('mongoose')
    console.log(req.params)
    // process.exit(0)
    console.log("from crime_id_aggregate", req.params)
    await crime.aggregate([
        {
            $match: {
                '_id': {
                    $eq: mongoose.Types.ObjectId(req.params.crime_id)
                }
            }
        },
        {
            $lookup: {
                from: 'incidents',
                as: 'incident_data',
                let: { indicator_id: '$incident_number' },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ['$incident_number', '$$indicator_id']
                            }
                        }
                    },
                    { $limit: 1 }]
            }
        },
        {
            $lookup: {
                from: 'incident_peoples',
                as: 'incident_peoples',
                let: { indicator_id: '$incident_number' },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ['$incident_number', '$$indicator_id']
                            }
                        }
                    },
                    { $limit: 1 }]
            }
        },
        {
            $lookup: {
                from: "peoples",
                localField: "incident_peoples.law",
                foreignField: "_id",
                as: "law"
            }
        },
        {
            $lookup: {
                from: "peoples",
                localField: "incident_peoples.accussed",
                foreignField: "_id",
                as: "accussed"
            }
        },
        {
            $lookup: {
                from: "peoples",
                localField: "incident_peoples.judge",
                foreignField: "_id",
                as: "judge"
            }
        },
        {
            $lookup: {
                from: "peoples",
                localField: "incident_peoples.victims",
                foreignField: "_id",
                as: "victims"
            }
        },
        {
            $lookup: {
                from: "peoples",
                localField: "incident_peoples.suspects",
                foreignField: "_id",
                as: "suspects"
            }
        }
    ]).exec(function (error, data) {
        if (error) {
            console.log(error)
            res.status(200).send(error)
        }
        console.log("data2 === ", data)
        res.status(200).send(data)
    })
})

