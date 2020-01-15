const csvFilePath= '../data/crime.csv'
const csv=require('csvtojson')
// var crime = require('../model/crim/es');
console.log(__filename)
process.exit0
async function convertdata(){
    try{
        const jsonArray=await csv().fromFile(csvFilePath);
console.log(jsonArray.length)
    }catch(error){
        console.log(error)
    }
}
convertdata()