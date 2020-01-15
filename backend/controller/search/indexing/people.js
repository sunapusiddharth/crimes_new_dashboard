//file to perform indexing operations on forms/ departments :
//should be called on every addition of form .


//for bulk indexing of forms .
const people = require('../../../model/people')
const bulk_import_network_calls = require('./helper').bulk_import_network_calls
const mappings = require('./mappings/people')
const fetch = require('node-fetch')

async function peopleBulkIndex(client, req, res) {
    try {
        let db_data = await people.find({}).exec()
        db_data = db_data.slice(0,1000)
        // let index_settings = mappings.settings
        // let index_mappings = mappings.mappings
        //Step 1 : create the index :
        // res.send(index_mappings)
        // process.exit(0)
        // let response_create_index = await client.indices.create({
        //     index: 'people',
        //     body: {
        //         settings: index_settings
        //     }
        // });

        // let mapping_res = await client.indices.putMapping({
        //     index: 'people',
        //     body: {
        //             properties: index_mappings
        //         }
        // })

        // using rest method since above method fails for nested autocomplte:
        let mapping_with_analysis = {
            "settings":{
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
            "mappings":{
                "properties":{
                    "country":{
                        "type":"text"
                    },
                    "avatar":{
                        "type":"text"
                    },
                    "is_law":{
                        "type":"boolean"
                    },
                    "is_suspect":{
                        "type":"boolean"
                    },
                    "is_accussed":{
                        "type":"boolean"
                    },
                    "is_witness":{
                        "type":"boolean"
                    },
                    "email":{
                        "type":"text"
                    },
                    "address":{
                        "type":"text",
                        "analyzer":"autocomplete",
                        "search_analyzer":"autocomplete_search"
                    },
                    "name":{
                        "type":"text",
                        "analyzer":"autocomplete",
                        "search_analyzer":"autocomplete_search"
                    },
                    "avatar":{
                        "type":"text",
                        "index":false
                    },
                    "education":{
                        "type":"nested",
                        "properties":{
                            "school_name":{
                                "type":"text",
                                "analyzer":"autocomplete",
                                "search_analyzer":"autocomplete_search"
                            }
                        }
                    },
                    "employment":{
                        "type":"nested",
                        "properties":{
                            "employment_type":{
                                "type":"text",
                                "analyzer":"autocomplete",
                                "search_analyzer":"autocomplete_search"
                            },
                            "title":{
                                "type":"text",
                                "analyzer":"autocomplete",
                                "search_analyzer":"autocomplete_search"
                            },
                            "company_name":{
                                "type":"text",
                                "analyzer":"autocomplete",
                                "search_analyzer":"autocomplete_search"
                            }
                        }
                    },
                    "prisons":{
                        "type":"nested",
                        "properties":{
                            "name":{
                                "type":"text",
                                "analyzer":"autocomplete",
                                "search_analyzer":"autocomplete_search"
                            },
                            "cell_holding":{
                                "type":"text",
                                "analyzer":"autocomplete",
                                "search_analyzer":"autocomplete_search"
                            },
                            "supervisor_name":{
                                "type":"text",
                                "analyzer":"autocomplete",
                                "search_analyzer":"autocomplete_search"
                            }
                        }
                    },
                    "departments":{
                        "type":"nested",
                        "properties":{
                            "name":{
                                "type":"text",
                                "analyzer":"autocomplete",
                                "search_analyzer":"autocomplete_search"
                            },
                            "position":{
                                "type":"text",
                                "analyzer":"autocomplete",
                                "search_analyzer":"autocomplete_search"
                            }
                        }
                    },
                    "cases":{
                        "type":"nested",
                        "properties":{
                            "case_name":{
                                "type":"text",
                                "analyzer":"autocomplete",
                                "search_analyzer":"autocomplete_search"
                            }
                        }
                    }
        
                }
            }
        }
        
        let url = 'http://localhost:9200/people'
        await fetch(url,{
            method:"PUT",
            body:JSON.stringify(mapping_with_analysis),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res=>res.json()).then(data=>{console.log(data)}).catch(error=>{console.log(error)})
        //find the docs from mongoDB 
        // let db_data = await departments.find({}).exec()
        //function to transform data for elasticsearch :
        let transformed_data = await getTransformedData(db_data)
        // res.send(transformed_data)
        // process.exit(0)
        // console.log("transformed_data=",transformed_data.slice(0,1))
        // res.send(transformed_data.slice(0,1))
        // process.exit(0)
        //Step 2 : add docs to the index 
        // transformed_data = transformed_data.slice(0, 10)
        // const department_indexing_data = JSON.parse(transformed_data)
        let response_bulk_add = await bulk_import_network_calls(client, 'people', 'person', transformed_data)
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
            let { name, address, phone, email, education, employment, photos, social_link, prisons, departments,cases,is_witness,is_suspect,is_law,is_accussed,_id,country,avatar } = record
            let departments_array = departments.map(dept=> {return {"name":dept.name,"position":dept.position}})
            let prisons_array = prisons.map(prison=> {return {cell_holding: prison.cell_holding,
            name: prison.name,
            supervisor_name: prison.supervisor.name?prison.supervisor.name:''}})
            let employment_array = employment.map(emp=> {return {company_name: emp.company_name,
            employment_type: emp.employment_type,
            title: emp.title}})
            let education_array = education.map(edu=>{return {"school_name":edu.school_name}})
            return {
                "id":_id,
                "body":{
                    "is_accussed":is_accussed,
                    "is_law":is_law,
                    "is_suspect":is_suspect,
                    "country":country,
                    "is_witness":is_witness,
                    "cases":[],
                    "departments":departments_array,
                    "prisons":prisons_array,
                    "employment":employment_array,
                    "education":education_array,
                    "email":email,
                    "address":address,
                    "name":name,
                    "avatar":avatar
                }
            }             
        })
        resolve(bulk_item)
    })
}

module.exports = {
    "peopleBulkIndex": peopleBulkIndex,
}