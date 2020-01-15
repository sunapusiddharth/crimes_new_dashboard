//file to perform indexing operations on forms/ departments :
//should be called on every addition of form .


//for bulk indexing of forms .
const crimes = require('../../../model/crimes')
const incident = require('../../../model/incident')
const incidentPeople = require('../../../model/incidentPeople')
const people = require('../../../model/people')
const bulkIndex = require('./helper').bulkIndex
const mappings = require('./mappings/crime')
const mongoose = require('mongoose')
const fetch = require('node-fetch')

async function crimeBulkIndex(client, req, res) {
    try {
        // let abcd = await relatedDataUsingJoins("asasa")

        // console.log("xyz",xyz);
        // process.exit(0);

        let db_data = await crimes.find({}).limit(1000).exec();
        // db_data = db_data.slice(0,2)
        let related_db_data = await relatedDataUsingJoins(db_data)
        // res.status(200).send(related_db_data)
        // process.exit(0)
        let index_settings = mappings.settings
        let index_mappings = mappings.mappings
        //Step 1 : create the index :
        // res.send(index_mappings)
        // process.exit(0)
        // let response_create_index = await client.indices.create({
        //     index: 'crimes',
        //     body: {
        //         settings: index_settings
        //     }
        // });

        // let mapping_res = await client.indices.putMapping({
        //     index: 'crimes',
        //     body: {
        //             properties: index_mappings
        //         }
        // })
        //using the rest approach since above one has some problems for nested types:
        let mapping_with_analysis = {
            "settings": {
                "analysis": {
                    "analyzer": {
                        "autocomplete": {
                            "tokenizer": "autocomplete",
                            "filter": [
                                "lowercase"
                            ]
                        },
                        "autocomplete_search": {
                            "tokenizer": "lowercase"
                        }
                    },
                    "tokenizer": {
                        "autocomplete": {
                            "type": "edge_ngram",
                            "min_gram": 2,
                            "max_gram": 10,
                            "token_chars": [
                                "letter"
                            ]
                        }
                    }
                }
            },
            "mappings": {
                "properties":{
                    "incident_number":{
                        "type":"text"
                    },
                    "offense_code":{
                        "type":"integer",
                        index:false
                    },
                    "offense_code_group":{
                        "type":"text",
                        index:false
                    },
                    "offense_description":{
                        "type":"text",
                        index:false
                    },
                    "district":{
                        "type":"keyword",
                    },
                    "reporting_area":{
                        "type":"integer",
                        index:false
                    },
                    "schooting":{
                        "type":"boolean",
                        index:false
                    },
                    "occurence_on_date":{
                        "type":"date",
                        "format":"yyy-MM-dd"
                    },
                    "ucr_part":{
                        "type":"text",
                        index:false
                    },
                    "street":{
                        "type":"keyword"
                    },
                    "year":{
                        "type":"number",
                    },
                    "month":{
                        "type":"number",
                    },
                    "lat":{
                        "type":"double"
                    },
                    "long":{
                        "type":"double"
                    },
                    "law":{
                        "type":"text"
                    },
                    "judge":{
                        "type":"text"
                    },
                    "suspects":{
                        "type":"text",
                    },
                    "accussed":{
                        "type":"text",
                    },
                    "victims":{
                        "type":"text",
                    },
                    "address":{
                        "type":"text"
                    },
                    "imageUrl":{
                        "type":"text",
                        "index":false
                    },
                    "category":{
                        "type":"keyword"
                    },
                    "title":{
                        "type":"text"
                    },
                    "description":{
                        "type":"text",
                        "analyzer":"autocomplete",
                        "search_analyzer":"autocomplete_search"
                    },
                    "city":{
                        "type":"keyword"
                    },
                    "state":{
                        "type":"keyword"
                    },
                    postalCode:{
                        type:"number"
                    },
                    location:{
                        type:"geo_point"
                    }
                }
            }
        }

        //NOTE : manually create the mapping first since mapping has to be done first and then addition of fields has to be done.

        // let url = 'http://localhost:9200/crimes'
        // await fetch(url, {
        //     method: "PUT",
        //     body: JSON.stringify(mapping_with_analysis),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // }).then(res => res.json()).then(data => { console.log(data) }).catch(error => { console.log(error) })
        // console.log("mapping done ")
        // process.exit(0)


        //find the docs from mongoDB 
        // let db_data = await departments.find({}).exec()
        //function to transform data for elasticsearch :
        let transformed_data = await getTransformedData(related_db_data)
        // res.send(transformed_data)
        // process.exit(0)
        // console.log("transformed_data=",transformed_data.slice(0,1))
        // res.send(transformed_data.slice(0,5))
        // process.exit(0)
        //Step 2 : add docs to the index 
        // transformed_data = transformed_data.slice(0, 10)
        // const department_indexing_data = JSON.parse(transformed_data)
        let response_bulk_add = await bulkIndex(client, 'crimes', 'crime', transformed_data)
        res.status(200).send(response_bulk_add)
        console.log("peple data bulk indexing is completed !!!!")
    } catch (error) {
        console.log("error in something catch", error)
        res.status(500).send(error)
    }
}


function getTransformedData(db_data) {
    return new Promise(async (resolve, reject) => {
        let bulk_item = await db_data.map(record => {
            let { _id, incident_number, offense_code, offense_code_group, offense_description,
                district, reporting_area, schooting, occurence_on_date, ucr_part, street,
                year, month, lat, long, incident_data, incident_peoples, law, accussed, judge, victims, suspects,
                address,title,category,description,imageUrl,city,state,postalCode,loc
            } = record[0]
            let law_array = []
            if (typeof law != 'undefined' && law.length) {
                law.map(person => {
                    if (person.name.length) {
                        law_array.push(person.name[0])
                    }
                    return person.name
                })
            }
            let accussed_array = []
            if (typeof accussed != 'undefined' && accussed.length) {
                accussed.map(person => {
                    if (person.name.length) {
                        accussed_array.push(person.name[0])
                    }
                    return person.name
                })
            }
            let victim_array = []
            if (typeof victims != 'undefined' && victims.length) {
                victims.map(person => {
                    if (person.name.length) {
                        victim_array.push(person.name[0])
                    }
                    return person.name
                })
            }
            let suspects_array = []
            if (typeof suspects != 'undefined' && suspects.length) {
                suspects.map(person => {
                    if (person.name.length) {
                        suspects_array.push(person.name[0])
                    }
                    return person.name
                })
            }
            let judge_array = []
            if (typeof judge != 'undefined' && judge.length) {
                judge.map(person => {
                    if (person.name.length) {
                        judge_array.push(person.name[0])
                    }
                    return person.name
                })
            }
            // let { photos, files, videos, audios } = incident_data[0]
            // let photos_array = []
            // photos.map(photo => {
            //     photos_array.push({ media_name: photo.media_name, media_url: photo.media_url })
            //     return photo
            // })
            
            // console.log(photos_array)
            // process.exit(0)
            // Adding location to the field : must be in form location:{"lat":2121212,"lon":12132332}
            let coordinates = loc.coordinates
            let customLoc = {"lat":parseInt(coordinates[1]),"lon":parseInt(coordinates[0])}
            let formatted_occurence_date = new Date(occurence_on_date) // format it to format of YYYY-mm-dd
            let date_string_es = `${formatted_occurence_date.getFullYear()}-${("0" + (formatted_occurence_date.getMonth() + 1)).slice(-2)}-${("0" + formatted_occurence_date.getDate()).slice(-2)}`
            return {
                "id": _id,
                "body": {
                    "incident_number": incident_number,
                    "offense_code": offense_code,
                    "offense_code_group": offense_code_group,
                    "offense_description": offense_description,
                    "district": district,
                    "reporting_area": reporting_area,
                    "schooting": schooting,
                    "occurence_on_date": date_string_es,
                    "ucr_part": ucr_part,
                    "street": street,
                    "year": year,
                    "month": month,
                    "law": law_array,
                    "judge": judge_array,
                    "suspects": suspects_array,
                    "accussed": accussed_array,
                    "victims": victim_array,
                    "title":title,
                    "description":description,
                    "address":address,
                    "imageUrl":imageUrl,
                    "category":category,
                    city,
                    state,
                    postalCode,
                    location:customLoc
                }
            }
        })
        resolve(bulk_item)
    })
}

function getRelatedData(db_data) {
    // console.log(":l  ",db_data)
    return new Promise((resolve, reject) => {
        let data = Promise.all(Object.values(db_data).map(async crime => {
            let incident_number = crime.incident_number
            let incident_data = await incident.find({ "incident_number": incident_number }).limit(1)
            // let files = []
            // console.log(":l23  ",incident_data)
            // process.exit(0)
            incident_data = incident_data[0]
            let files = incident_data.files.map(file => {
                return { media_name: file.media_name, media_url: file.media_url }
            })
            let videos = incident_data.videos.map(file => {
                return { media_name: file.media_name, media_url: file.media_url }
            })
            let audios = incident_data.audios.map(file => {
                return { media_name: file.media_name, media_url: file.media_url }
            })
            let photos = incident_data.photos.map(file => {
                return { media_name: file.media_name, media_url: file.media_url }
            })
            let incidentPeopleData = await incidentPeople.find({ incident_number: incident_number }).limit(1)
            incidentPeopleData = incidentPeopleData[0]
            let law = []
            await Promise.all(incidentPeopleData.law.map(record => {
                return new Promise((resolve, reject) => {
                    people.findById(record).then(data => {
                        law.push(data.name)
                        resolve(data.name)
                    })
                })
            }))
            // console.log(":l  law=",law)
            // process.exit(0)
            let suspects = []
            await Promise.all(incidentPeopleData.suspects.map(record => {
                return new Promise((resolve, reject) => {
                    people.findById(record).then(data => {
                        suspects.push(data.name)
                        resolve(data.name)
                    })
                })
            }))
            let victims = []
            await Promise.all(incidentPeopleData.victims.map(record => {
                return new Promise((resolve, reject) => {
                    people.findById(record).then(data => {
                        victims.push(data.name)
                        resolve(data.name)
                    })
                })
            }))
            let accussed = []
            await Promise.all(incidentPeopleData.accussed.map(record => {
                return new Promise((resolve, reject) => {
                    people.findById(record).then(data => {
                        accussed.push(data.name)
                        resolve(data.name)
                    })
                })
            }))
            let judge = []
            await Promise.all(incidentPeopleData.judge.map(record => {
                return new Promise((resolve, reject) => {
                    people.findById(record).then(data => {
                        judge.push(data.name)
                        resolve(data.name)
                    })
                })
            }))
            crime.law = law
            crime.suspects = suspects
            crime.victims = victims
            crime.judge = judge
            crime.accussed = accussed
            crime.photos = photos
            crime.videos = videos
            crime.audios = audios
            crime.files = files
            // console.log("law data =", law)
            // console.log("victimsdata =", victims)
            // console.log("judge data =", judge)
            // // process.exit(0)
            // console.log("incidentPeople data =", incidentPeople)
            // console.log("crime data =", crime)
            return crime
        }))
        resolve(data)
    })
}



function relatedDataUsingJoins(db_data) {
    return new Promise(async (resolve, reject) => {
        let data = await Promise.all(Object.values(db_data).map(async record => {
            let crime_related_data = await crimes.aggregate([
                {
                    $match: {
                        '_id': {
                            $eq: mongoose.Types.ObjectId(record._id)
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
            ]).exec()
            // console.log("crime_related_data=-",crime_related_data)
            return crime_related_data
        }))
        resolve(data)
    })


}

module.exports = {
    "crimeBulkIndex": crimeBulkIndex,
}