const fetch = require('node-fetch')
const department_posts_query = require('./department_posts_query')
const department_speech_query = require('./department_speech_query')
const department_vacancies_query = require('./department_vacancies_query')

const findDepartmentPosts = async (client, req, res) => {
let body ={}
var {from,size,search_query} = req.body
  
  console.log("req body=",req.body)
  if(search_query){
    body=  department_posts_query.posts(search_query,from,size)
  }else{
    body={
      "from":from?from:0,
      "size":size?size:10
    }
  }
  console.log("body=",body)
   fetch(`http://${process.env.REACT_APP_API_HOST}:9200/department_posts/_search`,{
    method:"POST",
    body:JSON.stringify(body),
    headers:{
        'Content-Type':'application/json'
    }
   }).then(response=>response.json()).then(data=>res.status(200).send(data)).catch(error=>{
    console.log("error=",error) 
    res.status(400).send(error)})
}

const autocompleteDepartments = async (client, req, res) => {
  let body ={}
  var {from,size,search_query} = req.body
    if(search_query){
      body=  department_posts_query.autocompletePosts(search_query,from,size)
    }else{
      body={
        "from":from?from:0,
        "size":size?size:10
      }
    }
    console.log("body=",body)
     fetch(`http://${process.env.REACT_APP_API_HOST}:9200/department_posts/_search`,{
      method:"POST",
      body:JSON.stringify(body),
      headers:{
          'Content-Type':'application/json'
      }
     }).then(response=>response.json()).then(data=>res.status(200).send(data)).catch(error=>{
      console.log("error=",error) 
      res.status(400).send(error)})
  }

  // speeches:
  const findDepartmentSpeeches = async (client, req, res) => {
    let body ={}
    var {from,size,search_query} = req.body
      
      console.log("req body=",req.body)
      if(search_query){
        body=  department_speech_query.speeches(search_query,from,size)
      }else{
        body={
          "from":from?from:0,
          "size":size?size:10
        }
      }
      console.log("body=",body)
       fetch(`http://${process.env.REACT_APP_API_HOST}:9200/department_speeches/_search`,{
        method:"POST",
        body:JSON.stringify(body),
        headers:{
            'Content-Type':'application/json'
        }
       }).then(response=>response.json()).then(data=>res.status(200).send(data)).catch(error=>{
        console.log("error=",error) 
        res.status(400).send(error)})
    }

    const autocompleteDepartmentSpeeches = async (client, req, res) => {
      let body ={}
      var {from,size,search_query} = req.body
        if(search_query){
          body=  department_speech_query.autocompleteSpeeches(search_query,from,size)
        }else{
          body={
            "from":from?from:0,
            "size":size?size:10
          }
        }
        console.log("body=",body)
         fetch(`http://${process.env.REACT_APP_API_HOST}:9200/department_speeches/_search`,{
          method:"POST",
          body:JSON.stringify(body),
          headers:{
              'Content-Type':'application/json'
          }
         }).then(response=>response.json()).then(data=>res.status(200).send(data)).catch(error=>{
          console.log("error=",error) 
          res.status(400).send(error)})
      }

      // vacancies:
  const findDepartmentVacancies = async (client, req, res) => {
    let body ={}
    var {from,size,search_query} = req.body
      
      console.log("req body=",req.body)
      if(search_query){
        body=  department_vacancies_query.vacancies(search_query,from,size)
      }else{
        body={
          "from":from?from:0,
          "size":size?size:10
        }
      }
      console.log("body=",body)
       fetch(`http://${process.env.REACT_APP_API_HOST}:9200/department_vacancies/_search`,{
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
  findDepartmentPosts,
  autocompleteDepartments,
  findDepartmentSpeeches,
  autocompleteDepartmentSpeeches,
  findDepartmentVacancies
}