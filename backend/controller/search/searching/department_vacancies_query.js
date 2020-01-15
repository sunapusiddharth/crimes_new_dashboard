
function vacancies(searched_query, from, size) {
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
                                "travel",
                                "salary",
                                "qualifications^15",
                                "practice_area^10",
                                "position^15",
                                "location_locality^10",
                                "location_thoroughfare^10",
                                "body^10",
                                "hiring_org_name^15",
                                "hiring_office^15"   
                            ]
                        }
                    }
                ]
            }
        },
        "highlight": {
            "fields": {
                "about_office": {},
                "application_process": {}
            }
        }
    }
}



module.exports = {
    vacancies
}