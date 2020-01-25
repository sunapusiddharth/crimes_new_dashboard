const bulk_import_network_calls = require('./helper').bulk_import_network_calls
const fetch = require('node-fetch')
const crime_news = require('../../../model/crime_news')

async function crimeNewsBulkIndex(client, req, res) {
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
                    "full_content": {
                        "type": "text"
                    },
                    "publishedAt": {
                        "type": "date"
                    },
                    "tags": {
                        "type": "text"
                    },
                    "title": {
                        "type": "text",
                        "analyzer": "autocomplete",
                        "search_analyzer": "autocomplete_search"
                    },
                    "hits": {
                        "type": "integer"
                    },
                    "description": {
                        "type": "text"
                    },
                    "urlToImage": {
                        "type": "text",
                        "index":false
                    },
                }
            }
        }
        let url = `http://${process.env.REACT_APP_API_HOST}:9200/crime_news`
        await fetch(url, {
            method: "PUT",
            body: JSON.stringify(mapping_with_analysis),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => { console.log(data) }).catch(error => { console.log(error) })
        //find the docs from mongoDB 
        let db_data = await crime_news.find({}).exec()
        // console.log("inderting docs",db_data.length)
        //function to transform data for elasticsearch :
        let transformed_data = await getTransformedData(db_data)
        // console.log("inderting docs",transformed_data.slice(0,1))
        // res.status(200).send(transformed_data)
        // process.exit(0)
        let response_bulk_add = await bulk_import_network_calls(client, 'crime_news', 'news', transformed_data)
        res.status(200).send(response_bulk_add)
        console.log("crime_news data bulk indexing is completed !!!!")
    } catch (error) {
        console.log("error in something catch", error)
        res.status(500).send(error)
    }
}


function getTransformedData(db_data) {
    return new Promise(async (resolve, reject) => {
        let bulk_item = await db_data.map(record => {
            return {
                "id": record._id,
                "body": {
                    "title": record.title,
                    "full_content": record.full_content,
                    "tags": record.tags,
                    "hits": record.hits,
                    "publishedAt": record.publishedAt,
                    "description": record.description,
                    "author": record.author,
                    "urlToImage": record.urlToImage
                }
            }
        })
        resolve(bulk_item)
    })
}

module.exports = {
    "crimeNewsBulkIndex": crimeNewsBulkIndex,
}