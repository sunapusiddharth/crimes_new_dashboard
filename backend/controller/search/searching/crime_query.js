function crimesQuery(searched_query, filters, from, size) {
  //provide facets for fields category , offense_code (related to category future), city,street,state,year , month
  //need to add the filter query inside of it . Note the filtyer query can be left  blank if not req .
  //to add filter we can use must inside of bool.
  if (searched_query) {
    console.log("from if", from)
    return {
      "from": from ? from : 0,
      "size": size ? size : 10,
      "query": {
        "bool": {
          "filter": filters.length ? filters : [],
          "should": [
            {
              "multi_match": {
                "query": searched_query ? searched_query : '',
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
        },
        "city": {
          "terms": {
            "field": "city.keyword",
            "size": 200
          }
        },
        "state": {
          "terms": {
            "field": "state.keyword",
            "size": 200
          }
        },
        "postalCode": {
          "terms": {
            "field": "postalCode",
            "size": 200
          }
        },
        "month": {
          "terms": {
            "field": "month",
            "size": 200
          }
        },
        "year": {
          "terms": {
            "field": "year",
            "size": 200
          }
        }
      },
      "highlight": {
        "fields": {
          "district": {},
          "law": {},
          "judge": {},
          "suspects": {},
          "victims": {},
          "accussed": {},
          "title": {},
          "description": {}
        }
      }
    }
  } else if (!searched_query && filters.length) {
    console.log("from else", from)
    return {
      "from": from ? from : 0,
      "size": size ? size : 10,
      "query": {
        "bool": {
          "filter": filters.length ? filters : [],
        }
      },
      "aggs": {
        "category": {
          "terms": {
            "field": "category.keyword",
            "size": 200
          }
        },
        "city": {
          "terms": {
            "field": "city.keyword",
            "size": 200
          }
        },
        "state": {
          "terms": {
            "field": "state.keyword",
            "size": 200
          }
        },
        "postalCode": {
          "terms": {
            "field": "postalCode",
            "size": 200
          }
        },
        "month": {
          "terms": {
            "field": "month",
            "size": 200
          }
        },
        "year": {
          "terms": {
            "field": "year",
            "size": 200
          }
        }
      },
      "highlight": {
        "fields": {
          "district": {},
          "law": {},
          "judge": {},
          "suspects": {},
          "victims": {},
          "accussed": {},
          "title": {},
          "description": {}
        }
      }
    }
  } else {
    console.log("from else", from)
    return {
      "from": from ? from : 0,
      "size": size ? size : 10,
      "aggs": {
        "category": {
          "terms": {
            "field": "category.keyword",
            "size": 200
          }
        },
        "city": {
          "terms": {
            "field": "city.keyword",
            "size": 200
          }
        },
        "state": {
          "terms": {
            "field": "state.keyword",
            "size": 200
          }
        },
        "postalCode": {
          "terms": {
            "field": "postalCode",
            "size": 200
          }
        },
        "month": {
          "terms": {
            "field": "month",
            "size": 200
          }
        },
        "year": {
          "terms": {
            "field": "year",
            "size": 200
          }
        }
      },
      "highlight": {
        "fields": {
          "district": {},
          "law": {},
          "judge": {},
          "suspects": {},
          "victims": {},
          "accussed": {},
          "title": {},
          "description": {}
        }
      }
    }
  }
}


function crimeLocationQuery(lat, lon, skip, limit) {
  //it will give the nearest crimes to the crime that was viewed by the user 
  //steps: get the location params from request or use mongodb to get the data and then find the nearest crimes from there.
  //this gives all the crime objects .
  return {
    "from": skip ? skip : 0,
    "size": limit ? limit : 10,
    "query": {
      "bool": {
        "must": [
          {
            "geo_distance": {
              "distance": "100km",
              "location": `${lon},${lat}`
            }
          }
        ]
      }
    },
    aggs: {
      "crimes_around": {
        "geo_distance": {
          "field": "location",
          "origin": `${lon},${lat}`,
          "unit": "km",
          "ranges": [
            { "to": 100,"key": "within_100_km"  },
            { "from": 100, "to": 300 ,"key": "within_100_300_km" },
            { "from": 300 ,"key": "after_300_km" }
          ],
          "keyed": true
        }
      }
    },
    "docvalue_fields": [
      "title.keyword"
    ]
  }
}

module.exports = {
  crimesQuery,
  crimeLocationQuery
}


//query for distance based searches . to find criimes whithin 100km radius.
/*
{
	"query": {
    "bool": {
      "must": [
        {
          "geo_distance": {
            "distance": "100km",
            "location": "18.533333,73.866667"
          }
        }
      ]
    }
  },
  "docvalue_fields": [
    "title.keyword"
  ]
}
*/
