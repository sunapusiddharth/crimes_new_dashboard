function crimeNewsQuery(searched_query,from,size){
    //need to add the filter query inside of it . Note the filtyer query can be left  blank if not req .
    return {
        "from": from?from:0,
        "size": size?size:0,
        "query": {
            "multi_match": {
                "query": searched_query,
                "fields": [
                    "title^10",
                    "author^3",
                    "content^1",
                    "description^8"
                ]
            }
        },
        "sort":[
                {"publishedAt":"desc"},
                {"hits":"desc"}
                ],
        "highlight": {
            "fields": {
                "title": {},
                "description": {}
            }
        }
    }
}

module.exports={
    crimeNewsQuery
}