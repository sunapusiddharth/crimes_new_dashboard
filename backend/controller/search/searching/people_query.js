function formQuery(searched_query, from, size) {
    return {
        "from": from ? from : 0,
        "size": size ? size : 10,
        "query": {
            "bool": {
                "should": [
                    {
                        "nested": {
                            "path": "education",
                            "query": {
                                "match": {
                                    "education.school_name": {
                                        "query": searched_query,
                                        "analyzer": "autocomplete"
                                    }
                                }
                            }
                        }
                    },
                    {
                        "nested": {
                            "path": "departments",
                            "query": {
                                "multi_match": {
                                    "query": searched_query,
                                    "analyzer": "autocomplete",
                                    "fields": ["departments.name^5", "departments.position^3"]
                                }
                            }
                        }
                    },
                    {
                        "nested": {
                            "path": "employment",
                            "query": {
                                "multi_match": {
                                    "query": searched_query,
                                    "analyzer": "autocomplete",
                                    "fields": ["employment.employment_type^3", "employment.title^3", "employment.company_name^3"]
                                }
                            }
                        }
                    },
                    {
                        "nested": {
                            "path": "prisons",
                            "query": {
                                "multi_match": {
                                    "query": searched_query,
                                    "analyzer": "autocomplete",
                                    "fields": ["prisons.name^5", "prisons.cell_holding^4", "prisons.supervisor_name^8"]
                                }
                            }
                        }
                    },
                    {
                        "nested": {
                            "path": "cases",
                            "query": {
                                "multi_match": {
                                    "query": searched_query,
                                    "analyzer": "autocomplete",
                                    "fields": ["cases.case_name^5"]
                                }
                            }
                        }
                    },
                    {
                        "multi_match": {
                            "query": searched_query,
                            "fields": [
                                "name^20",
                                "country^3",
                                "email^1",
                                "address^1"
                            ]
                        }
                    }
                ]
            }
        },
        "highlight": {
            "fields": {
                "name": {},
                "country": {},
                "email": {},
                "address": {},
                "departments.name":{},
                "employment.company_name":{},
                "employment.employment_type":{},
                "employment.title":{},
                "education.school_name":{},
                "prisons.cell_holding":{},
                "prisons.name":{},
                "prisons.supervisor_name":{},
            }
        }
    }
}

function formQueryForAutocomplete(searched_query, from, size) {
    //only match name 
    return {
        "from": from ? from : 0,
        "size": size ? size : 50,
        "query": {
            "multi_match": {
                "query": searched_query,
                "fields": [
                    "name^10",
                    "country^3"
                ]
            }
        },
        "highlight": {
            "fields": {
                "name": {},
                "country": {},
                "email": {},
                "address": {}
            }
        }
    }
}



module.exports = {
    formQuery,
    formQueryForAutocomplete
}