function formQuery(search_query,department_id,from,size){
    return {
        "from":from?from:0,
        "size":size?size:10,
          "query": {
            "multi_match": {
              "query":search_query,
              "fields":["attachment.content","attachment.title","attachment.author","department_name"]
            }
          },
          "highlight" : {
                "fields" : {
                    "attachment.content" : {},
                    "attachment.title" : {},
                    "attachment.author" : {},
                    "department_name" : {}
                }
            }
    }
}

module.exports={
    formQuery
}