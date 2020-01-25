const fetch = require('node-fetch')
const crime_news_search_json = require('./crime_news_query.js')

const findCrimeNews = async (client, req, res) => {
let body ={}
var {from,size,search_query} = req.body
  
  console.log("req body=",req.body)
  if(search_query){
    body=  crime_news_search_json.crimeNewsQuery(search_query,from,size)
  }else{
    body={
      "from":from?from:0,
      "size":size?size:10
    }
  }
  console.log("body=",body)
   fetch(`http://${process.env.REACT_APP_API_HOST}:9200/crime_news/_search`,{
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
    findCrimeNews,
}