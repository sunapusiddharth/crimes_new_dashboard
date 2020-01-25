const fetch = require('node-fetch')
const crime_search_json = require('./crime_query.js')

const findCrimes = async (client, req, res) => {
let body ={}
var {from,size,search_query,filters} = req.body
  
// console.log("req body=",req.body)
  body=  crime_search_json.crimesQuery(search_query,filters,from,size)
  console.log("req body=",JSON.stringify(body))
   fetch(`http://${process.env.REACT_APP_API_HOST}:9200/crimes/_search`,{
    method:"POST",
    body:JSON.stringify(body),
    headers:{
        'Content-Type':'application/json'
    }
   }).then(response=>response.json()).then(data=>res.status(200).send(data)).catch(error=>{
    console.log("error=",error) 
    res.status(400).send(error)})
}




module.exports = {
  findCrimes
}