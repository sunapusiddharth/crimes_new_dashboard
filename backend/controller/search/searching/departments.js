const fetch = require('node-fetch')

const departmentAutocomplete = async (client, req, res) => {
  let { contexts, prefix } = req.body
  // contexts should be of the following json : 
  /*
  {
              "agency": [ "Non-Federal Agency" ]
              }
  */

  /*
  Example for querying ngram :
  GET /helpshift_idx/issue/_search?search_type=count&query_cache=true
{
  "aggregations": {
    "fld-suggestions": {
      "terms": {
        "field": "app",
        "size": 25
      }
    }
  },
"query": {
  "match": {
    "app.autocomplete": "hell"
  }
}
}
  */
  //form the query for autocomplete :
  let data = {
    "suggest": {
      "dept_suggestion": {
        "prefix": prefix,
        "completion": {
          "field": "suggest",
          "size": 10,
          "contexts": contexts
        }
      }
    }
  }
  try {
    let response = await client.search({
      index: 'departments',
      body: data
    })
    res.status(200).send(response)
  } catch (error) {
    res.status(400).send(error)
  }
}

const autoCompletesearchForms = async (client, req, res) => {
  //to search forms within a department :
  let { department_id, prefix } = req.body
  //form the query for autocomplete :
  let body =
  {
    "query": {
      "bool": {
        "must": [
          {
            "bool": {
              "should": [
                {
                  "nested": {
                    "path": "forms",
                    "query": {
                      "bool": {
                        "must": {
                          "match": {
                            "aid.aid": {
                              "query": prefix,
                              "analyzer": "standard"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              ],
              //   "minimum_should_match": 1
            }
          }
        ]
      }
    }

  }

  console.log(req.body)

  try {
    let response = await client.search({
      index: 'departments',
      body
    })
    res.status(200).send(response)
  } catch (error) {
    res.status(400).send(error)
  }
}



const findDepartments = async (client, req, res)=>{
  let index = "departments"
  let body = req.body
  if(!body){
    res.status(400).send("no body sent in request")
  }
  try {
    let response = await client.search({
      index: index,
      body
    })
    res.status(200).send(response)
  } catch (error) {
    console.log("error in /departments",error)
    res.status(400).send(error)
  }

}


const departmentFilterAggs = async (client, req, res)=>{
  let body={
    "size":0,
     "aggs":{
     "city":{
       "terms":{
         "field":"city.keyword",
         "size":200
       }
     },
     "state":{
       "terms":{
         "field":"state.keyword",
         "size":100
       }
     },
     "organization":{
       "terms":{
         "field":"organization.keyword",
         "size":10
       }
     },
     "agency":{
       "terms":{
         "field":"agency.keyword",
         "size":200
       }
     }
   }
  }
  let body2 = {
    "from":  0,
    "size":  10,
    "query": {
        "bool": {
            "should": [
                {
                    "multi_match": {
                        "query": "murder",
                        "fields": [
                            "district^3",
                            "law^1",
                            "judge^1",
                            "suspects^1",
                            "accussed^1",
                            "victims^1",
                            "title^10",
                            "category^6",
                            "description^10"
                        ]
                    }
                }
            ]
        }
    },
    "aggs": {
        "category": {
            "terms": {
                "field": "category.keyword",
                "size": 200
            }
        }
        
    },
  }
  try {
    let response = await client.search({
      index: "crimes",
      body:body2
    })
    res.status(200).send(response)
  } catch (error) {
    res.status(400).send(error)
  }
}


 


module.exports = {
  departmentAutocomplete,
  autoCompletesearchForms,
  findDepartments,
  departmentFilterAggs
}