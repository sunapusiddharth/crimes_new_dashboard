let mapping_object = {
    "crime":{
        "properties":{
            "incident_number":{
                "type":"text"
            },
            "offense_code":{
                "type":"integer"
            },
            "offense_code_group":{
                "type":"text"
            },
            "offense_description":{
                "type":"text",
                "analyzer":"autocomplete",
                "search_analyzer":"autocomplete_search"
            },
            "district":{
                "type":"text"
            },
            "reporting_area":{
                "type":"integer"
            },
            "schooting":{
                "type":"boolean"
            },
            "occurence_on_date":{
                "type":"text"
            },
            "ucr_part":{
                "type":"text"
            },
            "street":{
                "type":"text"
            },
            "year":{
                "type":"text"
            },
            "month":{
                "type":"text"
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
            }
        }
    }
}
let settings_object = {
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
}
module.exports = {
    "settings": settings_object,
    "mappings": mapping_object
}