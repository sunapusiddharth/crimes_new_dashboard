const fetch = require('node-fetch')
require('array.prototype.flatmap').shim()

//sample for bulk indexing 
/*
client.bulk({
  body: [
    // action description
    { index:  { _index: 'myindex', _type: 'mytype', _id: 1 } },
     // the document to index
    { title: 'foo' },
    // action description
    { update: { _index: 'myindex', _type: 'mytype', _id: 2 } },
    // the document to update
    { doc: { title: 'foo' } },
    // action description
    { delete: { _index: 'myindex', _type: 'mytype', _id: 3 } },
    // no document needed for this delete
  ]
}, function (err, resp) {
  // ...
});
*/

const bulkIndex = function bulkIndex(client, index, type, data) {
    return new Promise(async (resolve, reject) => {
        const body = data.flatMap(doc => [{ index: { _index: index,_id:doc.id } }, doc.body])
        // console.log("body hetre",body)
        // process.exit(0)
        const  bulkResponse = await client.bulk({ refresh: true, body })
        if (bulkResponse.errors) {
            const erroredDocuments = []
            // The items array has the same order of the dataset we just indexed.
            // The presence of the `error` key indicates that the operation
            // that we did for the document has failed.
            bulkResponse.items.forEach((action, i) => {
              const operation = Object.keys(action)[0]
              if (action[operation].error) {
                erroredDocuments.push({
                  // If the status is 429 it means that you can retry the document,
                  // otherwise it's very likely a mapping error, and you should
                  // fix the document before to try it again.
                  status: action[operation].status,
                  error: action[operation].error,
                  operation: body[i * 2],
                  document: body[i * 2 + 1]
                })
              }
            })
            console.log(erroredDocuments)
          }
        
          const { body: count } = await client.count({ index: index })
          console.log("count=",count)
        console.log("bulk itmes =", bulkResponse.length)
        resolve(bulkResponse)
        

    })


}


// helper function as an alternate solution for bulk index using network calls :
const bulk_import_network_calls = (client, index, type, data) => {
    return new Promise(async (resolve, reject) => {
        let promises = []
        // let final_data = await data.map(async (record,index)=>{
        //     let url = `http://localhost:9200/${index}/_doc`
        //     let body = await JSON.stringify(record.body)
        //     fetch(url,{
        //         method:"PUT",
        //         body:body,
        //         headers:{
        //             'Content-Type':'application/json'
        //         }
        //     }).then(res=>res.json()).then(elastic_res=>{
        //         console.log(`completed ${index} out of ${data.length}`)
        //         return elastic_res
        //     }).catch(error=>{
        //         console.log(`error for doc with index =  ${index} `)
        //     })
        // })
        let promiseArray = [];
        for (let i = 0; i < data.length; i++) {
            // console.log("data=",data[i].id)
            // process.exit(0);
            let url = `http://${process.env.REACT_APP_API_HOST}:9200/${index}/_doc/${data[i].id}`
            let body = JSON.stringify(data[i].body)
            fetch(url,{
                method:"POST",
                        body:body,
                        headers:{
                            'Content-Type':'application/json'
                        }
            }).then(function (response) {
                console.log(`complete ${i} of ${data.length} records`,response)
                promiseArray.push(response.json());
            })
        }
        console.log("finalPromiseArray=",promiseArray)
        resolve(promiseArray);
        // let final_response = await Promise.all(promises)
        // resolve(final_data)
    })
}



//function to create mapping and index :
const createIndex = (index, mappings, settings) => {
    client.indices.create({
        index: index,
        "mappings": mappings,
        "settings": settings
    }, function (err, resp, respcode) {
        console.log(err, resp, respcode);
        return { "error": err, "response": resp, "response_code": respcode }
    });
}

module.exports = {
    "createIndex": createIndex,
    "bulkIndex": bulkIndex,
    'bulk_import_network_calls': bulk_import_network_calls
}