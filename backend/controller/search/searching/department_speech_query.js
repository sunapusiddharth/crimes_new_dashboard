
function speeches(searched_query, from, size) {
    return {
        "from": from ? from : 0,
        "size": size ? size : 10,
        "query": {
            "bool": {
                "should": [
                    {
                        "multi_match": {
                            "query": searched_query,
                            "fields": [
                                "title^20",
                                "body^15",
                            ]
                        }
                    }
                ]
            }
        },
        "highlight": {
            "fields": {
                "title": {},
                "body": {}
            }
        }
    }
}

function autocompleteSpeeches(searched_query, from, size) {
    //only match name 
    return {
        "from": from ? from : 0,
        "size": size ? size : 50,
        "query": {
            "multi_match": {
                "query": searched_query,
                "fields": [
                    "title^10"
                ]
            }
        },
        "highlight": {
            "fields": {
                "title": {}
            }
        }
    }
}

module.exports = {
    speeches,
    autocompleteSpeeches
}