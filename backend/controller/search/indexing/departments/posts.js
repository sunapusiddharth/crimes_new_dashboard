const bulk_import_network_calls = require('../helper').bulk_import_network_calls
const bulkIndex = require('../helper').bulkIndex
const fetch = require('node-fetch')
const department_posts = require('../../../../model/department_posts')

async function departmentPostBulkIndex(client, req, res) {
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
                    "body": {
                        "type": "text"
                    },
                    "title": {
                        "type": "text",
                        
                    },
                    "image": {
                        "type": "text"
                    },
                    "created":{
                        "type":"date",
                        "format":"yyy-MM-dd"
                    },
                    "changed":{
                        "type":"date",
                        "format":"yyy-MM-dd"
                    }
                }
            }
        }
        let url = `http://${process.env.REACT_APP_API_HOST}:9200/department_posts`
        await fetch(url, {
            method: "PUT",
            body: JSON.stringify(mapping_with_analysis),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => { console.log(data) }).catch(error => { console.log(error) })
        //find the docs from mongoDB 
        let db_data = await department_posts.find({}).exec()
        // console.log("inderting docs",db_data.length)
        //function to transform data for elasticsearch :
        let transformed_data = await getTransformedData(db_data)
        // console.log("inderting docs",transformed_data.slice(0,1))
        // res.status(200).send(transformed_data)
        // process.exit(0)
        let response_bulk_add = await bulkIndex(client, 'department_posts', 'post', transformed_data)
        res.status(200).send(response_bulk_add)
        console.log("department_posts data bulk indexing is completed !!!!")
    } catch (error) {
        console.log("error in something department_posts", error)
        res.status(500).send(error)
    }
}


function getTransformedData(db_data) {
    return new Promise(async (resolve, reject) => {
        let bulk_item = await db_data.map(record => {
            let date_string_record_created = `${record.created.getFullYear()}-${("0" + (record.created.getMonth() + 1)).slice(-2)}-${("0" + record.created.getDate()).slice(-2)}`
            let date_string_record_changed = `${record.changed.getFullYear()}-${("0" + (record.changed.getMonth() + 1)).slice(-2)}-${("0" + record.changed.getDate()).slice(-2)}`
            return {
                "id": record._id,
                "body": {
                    "title": record.title,
                    "body": record.body,
                    "image": record.image,
                    "created":date_string_record_created,
                    "changed":date_string_record_changed
                }
            }
        })
        resolve(bulk_item)
    })
}

module.exports = {
    "departmentPostBulkIndex": departmentPostBulkIndex,
}