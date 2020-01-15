
const address = require('../../model/address')
const json_file = require('../../data/addresses-us-all.json')

async function populateAddress(req,res) {
    try {
        let final_docs = []
    await Promise.all(json_file.addresses.map(record=>{
        //parsing the record to insert it in mongodb
        return new Promise((resolve,reject)=>{
            final_docs.push({
                address:record.address1,
                city:record.city,
                state:record.state,
                postalCode:parseInt(record.postalCode),
                loc:{
                    type:"Point",
                    "coordinates":[
                        parseFloat(record.coordinates.lng),
                        parseFloat(record.coordinates.lat)
                    ]
                }
            })
            resolve({
                address:record.address1,
                city:record.city,
                state:record.state,
                postalCode:parseInt(record.postalCode),
                loc:{
                    type:"Point",
                    "coordinates":[
                        record.coordinates.lat,
                        record.coordinates.lng,
                    ]
                }
            })
        })
    })).then(result=>{
        address.insertMany(final_docs).then(async result=>{
           await address.createIndexes({"loc":"2dsphere"}).then(data=>res.status(200).send([data,final_docs])   )
        }).catch(error=>console.log("error",error))
    }).catch(error=>console.log("from 1 ",error))
     
    } catch (error) {
        console.log(error)
        res.status(500).send(error)   
    }
}


async function fetchAddress(req,res){
    try {
        address.find({}).exec().then(data=>res.status(200).send(data)).catch(error=>{
            console.log(error)
            res.status(500).send(error)
        })
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

//Near query moongodb :
/*
db.addresses.find({"loc":{$near:{$geometry:{type:"Point",coordinates:[-76.979235,38.867033]}}}}).pretty()
*/

module.exports = {
    populateAddress,
    fetchAddress
}