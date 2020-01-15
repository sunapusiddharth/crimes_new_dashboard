// this file contains the mapping of all the deaprtments.
//raw json structure :
/*
domain_name: String,
    domain_type: String,
    agency: String,
    organization: String,
    city: String,
    state: String,
    securuity_contact_email: String,
    agency_url: String,
    description:String,
    _id:String,
    logo:{
        thumb_url:String,
        small_url:String,
        medium_url:String
    },
    name:String,
    parent_id:Number,
    recent_articles_url:String,
    short_name:String,
    slug:String,
    url:String,
    forms:[
        {
            form_name:String,
            form_url:String
        }
    ]


    Actual data from mongoDB:
    
     "_id" : "a5d93d7d-5160-4205-a4a3-adc58be1b6ef",
        "domain_name" : "ACTONMA",
        "domain_type" : "City",
        "agency" : "Non-Federal Agency",
        "organization" : "Town of Acton, Massachusetts",
        "city" : "Acton",
        "state" : "MA",
        "securuity_contact_email" : "(blank)",
        "agency_url" : "",
        "description" : "",
        "name" : "",
        "parent_id" : 0,
        "recent_articles_url" : "",
        "short_name" : "",
        "slug" : "",
        "url" : "",
        "forms" : [
                {
                        "file_url" : "Application+for+Suspension+of+Deportation.pdf",
                        "file_name" : "Application for Suspension of Deportation.pdf"
                },
                {
                        "file_url" : "ABINGDON-CITIZEN-COMPLAINT-FORM.pdf",
                        "file_name" : "ABINGDON-CITIZEN-COMPLAINT-FORM.pdf"
                }
        ],
        "logo" : {
                "thumb_url" : "",
                "small_url" : "",
                "medium_url" : ""
        },
        
    fields considered for suggestors using edge gram : domain_name
    fileds considred for adding to the index:  domain_name, domain_type, agency, organization, city, state, name,forms 
    NOTE: in query for autocomplete use standard analyzer. Eg: 
    #2 Approach :
    we can use autocompletion with context suggesters : which will give us the power to do autocompletion based on some filters applied along with boostign enabled 
    UI - give option to filter results then do a suggestion else normal autocomplete .
    link : https://qbox.io/blog/enriching-your-elasticsearch-autocomplete-with-context-suggesters
    for suggestions :
    field - domain_name : suggestions - name , organization


    sample object for indexing :
    {
        "suggest":{
            "input":   ["ACTONMA","Acton department of justice","Town of Acton, Massachusetts"],
            "contexts":{
                "city":"Acton",
                "state":"MA",
                "agency":"Non-Federal Agency",
                "organization":"Town of Acton, Massachusetts"
            }
        }
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
*/

// Using context suggesters:
let mapping_object_context_suggesters = {
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
    "logo_thumb_url": { "type": "text" }
}
// let mapping_object = {
//     "department": {
//         "properties": {
//             "domain_name": {
//                 "type": "text",
//             },
//             "domain_type": { "type": "text" },
//             "agency": { "type": "text" },
//             "organization": { "type": "text" },
//             "city": { "type": "text" },
//             "state": { "type": "text" },
//             "name": { "type": "text" },
//             "logo_thumb_url": { "type": "text" }
//         }
//     }
// }

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
                "max_gram": 5,
                "token_chars": [
                    "letter"
                ]
            }
        }
    }
}
module.exports = {
    "settings": settings_object,
    "mappings": mapping_object_context_suggesters,
    // mapping_object
}