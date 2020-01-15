const fetch = require('node-fetch')
const people_search_json = require('./people_query.js')

const findPeople = async (client, req, res) => {
let body ={}
var {from,size,search_query} = req.body
  
  console.log("req body=",req.body)
  if(search_query){
    body=  people_search_json.formQuery(search_query,from,size)
  }else{
    body={
      "from":from?from:0,
      "size":size?size:10
    }
  }
  console.log("body=",body)
   fetch('http://localhost:9200/people/_search',{
    method:"POST",
    body:JSON.stringify(body),
    headers:{
        'Content-Type':'application/json'
    }
   }).then(response=>response.json()).then(data=>res.status(200).send(data)).catch(error=>{
    console.log("error=",error) 
    res.status(400).send(error)})
}


const autoCompletePeople = async (client, req, res) => {
  let body ={}
  var {from,size,search_query} = req.body
    
    console.log("req body=",req.body)
    if(search_query){
      body=  people_search_json.formQueryForAutocomplete(search_query,from,size)
    }else{
      body={
        "from":from?from:0,
        "size":size?size:50
      }
    }
    console.log("body=",body)
     fetch('http://localhost:9200/people/_search',{
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
  findPeople,
  autoCompletePeople
}