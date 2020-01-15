let mapping_object = {
    "person":{
        "properties":{
            "country":{
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