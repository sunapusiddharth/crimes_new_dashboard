const bulk_import_network_calls = require('../helper').bulk_import_network_calls
const fetch = require('node-fetch')
const department_vacancies = require('../../../../model/department_vacancies')
const bulkIndex = require('../helper').bulkIndex

async function departmentVacanciesBulkIndex(client, req, res) {
    try {
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
                "properties": {
                    "about_office": {
                        "type": "text"
                    },
                    "application_process": {
                        "type": "text"
                    },
                    "hiring_office": {
                        "type": "text"
                    },
                    "created": {
                        "type": "date",
                        "format": "yyy-MM-dd"
                    },
                    "changed": {
                        "type": "date",
                        "format": "yyy-MM-dd"
                    },
                    "hiring_org_name": {
                        "type": "text"
                    },
                    "deadline": {
                        "type": "date",
                        "format": "yyy-MM-dd"
                    },
                    "body": {
                        "type": "text"
                    },
                    "location_thoroughfare":{
                        "type":"text"
                    },
                    "location_locality":{
                        "type":"text"
                    },
                    "location_administrative_area":{
                        "type":"text"
                    },
                    "location_country":{
                        "type":"text"
                    },
                    "num_positions": {
                        "type": "text"
                    },
                    "position": {
                        "type": "text"
                    },
                    "practice_area": {
                        "type": "text"
                    },
                    "relocation_expenses": {
                        "type": "text"
                    },
                    "qualifications": {
                        "type": "text"
                    },
                    "salary": {
                        "type": "text"
                    },
                    "title": {
                        "type": "text"
                    },
                    "travel": {
                        "type": "text"
                    }
                }
            }
        }
        let url = 'http://localhost:9200/department_vacancies'
        await fetch(url, {
            method: "PUT",
            body: JSON.stringify(mapping_with_analysis),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => { console.log(data) }).catch(error => { console.log(error) })
        //find the docs from mongoDB 
        let db_data = await department_vacancies.find({}).exec()
        // console.log("inderting docs",db_data.length)
        //function to transform data for elasticsearch :
        let transformed_data = await getTransformedData(db_data)
        // console.log("inderting docs",transformed_data.slice(0,1))
        // res.status(200).send(transformed_data)
        // process.exit(0)
        let response_bulk_add = await bulkIndex(client, 'department_vacancies', 'vacancy', transformed_data)
        res.status(200).send(response_bulk_add)
        console.log("department_vacancies data bulk indexing is completed !!!!")
    } catch (error) {
        console.log("error in something department_vacancies", error)
        res.status(500).send(error)
    }
}


function getTransformedData(db_data) {
    return new Promise(async (resolve, reject) => {
        let bulk_item = await db_data.map(record => {
            let date_string_record_created = `${record.created.getFullYear()}-${("0" + (record.created.getMonth() + 1)).slice(-2)}-${("0" + record.created.getDate()).slice(-2)}`
            let date_string_record_changed = `${record.changed.getFullYear()}-${("0" + (record.changed.getMonth() + 1)).slice(-2)}-${("0" + record.changed.getDate()).slice(-2)}`
            let deadline_date = record.deadline && new Date(parseInt(record.deadline))
            if (!deadline_date) {
                var someDate = new Date();
                var numberOfDaysToAdd = 10;
                someDate.setDate(someDate.getDate() - numberOfDaysToAdd);
                deadline_date = someDate
            }
            let deadline_date_string = `${deadline_date.getFullYear()}-${("0" + (deadline_date.getMonth() + 1)).slice(-2)}-${("0" + deadline_date.getDate()).slice(-2)}`
            return {
                "id": record._id,
                "body": {
                    "about_office": record.about_office,
                    "application_process": record.application_process,
                    "hiring_office": record.hiring_office,
                    "created": date_string_record_created,
                    "changed": date_string_record_changed,
                    "hiring_org_name": record.hiring_org && record.hiring_org && record.hiring_org.name,
                    "deadline": deadline_date_string,
                    "body":record.body,
                    "location_thoroughfare":record.location && record.location.thoroughfare,
                    "location_locality":record.location && record.location.locality,
                    "location_administrative_area":record.location && record.location.administrative_area,
                    "num_positions":record.num_positions,
                    "position":record.position,
                    "practice_area":record.practice_area,
                    "relocation_expenses":record.relocation_expenses,
                    "qualifications" :record.qualifications,
                    "salary":record.salary,
                    "travel":record.travel,
                    "title":record.title
                }
            }
        })
        resolve(bulk_item)
    })
}

module.exports = {
    "departmentVacanciesBulkIndex": departmentVacanciesBulkIndex,
}