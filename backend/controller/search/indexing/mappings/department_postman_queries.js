//for setting :
// PUT http://localhost:9200/department_try/
{
	"settings":{
		 "analysis": {
        "filter": {
            "autocomplete_filter": {
                "type": "edge_ngram",
                "min_gram": 5,
                "max_gram": 10
            }
        },
        "analyzer": {
            "autocomplete": {
                "type": "custom",
                "tokenizer": "standard",
                "filter": [
                    "lowercase",
                    "autocomplete_filter"
                ]
            }
        }
    }
	}
}

// for mapping :
// PUT http://localhost:9200/department_try/_mappings/department?pretty
 
{
    "department": {
       "properties": {
           "suggest": {
               "type": "completion",
               "contexts": [
                   {
                       "name": "city",
                       "type": "category",
                       "path": "city"
                   },
                   {
                       "name": "state",
                       "type": "category",
                       "path": "state"
                   },
                   {
                       "name": "agency",
                       "type": "category",
                       "path": "agency"
                   },
                   {
                       "name": "organization",
                       "type": "category",
                       "path": "organization"
                   }
               ]
           },
           "domain_name": { "type": "keyword" },
           "domain_type": { "type": "text" },
           "agency": { "type": "keyword" },
           "organization": { "type": "keyword" },
           "city": { "type": "keyword" },
           "state": { "type": "keyword" },
           "name": { "type": "text" },
           "forms": {
               "type": "nested",
               "properties": {
                   "file_name": {
                       "type": "text",
                       "analyzer": "autocomplete"
                   },
                   "file_url": { "type": "text" }
               }
           }
       }
   }
}

// fir inserting :
// PUT http://localhost:9200/department_try/department/1
{
    "suggest":{
        "input":   ["ACTONMA","Acton department of justice","Town of Acton, Massachusetts"],
        "contexts":{
            "city":"Acton",
            "state":"MA",
            "agency":"Non-Federal Agency",
            "organization":"Town of Acton, Massachusetts"
        }
    },
    "domain_name" : "ACTONMA",
    "domain_type" : "City",
    "agency" : "Non-Federal Agency",
    "organization" : "Town of Acton, Massachusetts",
    "city" : "Acton",
    "state" : "MA",
    "name" : "Acton department of justice",
    "forms" : [
            {
                    "file_url" : "Application+for+Suspension+of+Deportation.pdf",
                    "file_name" : "Application for Suspension of Deportation.pdf"
            },
            {
                    "file_url" : "ABINGDON-CITIZEN-COMPLAINT-FORM.pdf",
                    "file_name" : "ABINGDON-CITIZEN-COMPLAINT-FORM.pdf"
            }
    ]
}


//query :
// POST http://localhost:9200/department_try/_search?pretty
{
    "suggest": {
    "dept_suggestion" : {
    "prefix" : "AC",
    "completion" : {
    "field" : "suggest",
    "size": 10,
    "contexts": {
    "agency": [ "Non-Federal Agency" ]
    }
    }
    }
    }
   }