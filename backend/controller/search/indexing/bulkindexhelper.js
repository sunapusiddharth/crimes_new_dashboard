//setup and test elasticsearch connection :
var hosts = [
        'elasticsearch'
      ]
      const elasticsearch = require('elasticsearch')
//       const client = new elasticsearch.Client({
//           hosts:         hosts, 
//           log:          'error',
//           keepAlive:    true,
//           sniffOnStart: false,
//         });
const client = new elasticsearch.Client({
        host: `${process.env.REACT_APP_API_HOST}:9200`,
        log: 'error'
      });
        
        client.ping({ requestTimeout: 30000 }, function(error) {
          if (error) {
              console.error('elasticsearch cluster is down!');
          } else {
              console.log('Everything is ok');
          }
        });
var inputFile = require('./wa_cities.json');
var bulkArr = [];


client.indices.putMapping({
  index: 'wa_cities_points',
  type: 'cities',
  body: {
    properties: {
      "location": {
        "type": "geo_point",
      },
      "name": {
        "type": "string"
      }
    }
  }
}, (err, resp, status) => {
    if (err) throw err;
    console.log(resp);
});


function makeBulk(input, callback) {
        let j = 1;
        for (let i in input) {
                bulkArr.push(
                        {index: {_index: 'wa_cities_points', _type: 'cities', _id: j++}},
                        {
                                'name': input[i].properties.NAME,
                                'location': input[i].geometry.coordinates
                        }
                );
        }
        console.log(bulkArr);
        callback(bulkArr);
}


function indexAll(bulkDocs, callback) {
        client.bulk({
                index: 'wa_cities_points',
                type: 'cities',
                body: bulkDocs
        }, function(err, resp, status) {
                if (err) console.log(err);
                callback(resp);
        });
}

makeBulk(inputFile, function(resp) {
        indexAll(resp, function(resp) {
                console.log(resp.items);
        });
});