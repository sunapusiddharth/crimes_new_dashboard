//file to perform indexing operations on forms/ departments :
//should be called on every addition of form .


//for bulk indexing of forms .
const forms = require('../../../model/forms')
const bulk_import_network_calls = require('./helper').bulk_import_network_calls
const fetch = require('node-fetch')
const bysboy = require('busboy')
var fs = require('fs')
const departments = require('../../../model/forms')
const faker = require('faker')

const department_attachments_query = require('../searching/department_attachments_query')

async function indexDepartmentForms(client, req, res) {
  // Steps:
  /*
  Download the file from s3 and then read it and convert the file to base64 
  and then use the indexing to create the actual index and then process for each file separately 
  */
  //    let file_data = await fs.readFile(__root+'/controller/forms/Application for Approval as a Provider of a Personal Financial Management Instructional Course.pdf',async function(err,content){
  //     if (err) {
  //                     console.log("error in reading file =", err)

  //                     res.send(err)
  //                 }
  //     let encodeData1 = await content.toString('base64')
  //     let put_body = {
  //                             "data":encodeData1,
  //                             "title":'sasas',
  //                             "form_url":"http:s//sasjanskansjkansknsjkans",
  //                             "department_name":"Some department ",
  //                             "department_id":123
  //                           }
  //                         fetch(`http://localhost:9200/form_files/_doc/1234?pipeline=attachment`,{
  //                             method:"PUT",
  //                             body:JSON.stringify(put_body),
  //                             headers:{
  //                                 'Content-Type':'application/json'
  //                             }
  //                         }).then(response=>response.json()).then(data=>res.send(data)).catch(err=>res.send(err))
  //    })

  //    process.exit(0)
  try {
    const dirname = __root + '/controller/forms/'
    fs.readdir(dirname, function (err, filenames) {
      if (err) {
        console.log("error in reading file =", err)
        return;
      }
      // let index = 123;
      filenames.forEach(function (filename, index) {
        index = index + 10
        fs.readFile(dirname + filename, async function (err, content) {
          if (err) {
            console.log("error in reading file =", err)
            return;
          }
          let encodeData = await content.toString('base64')
          
          // let dept_result = await departments.find({"forms.file_name":filename,"description":{$ne:''}}).limit(1)
          let random_department 
          // if(dept_result){
          //   random_department = dept_result && dept_result.length && dept_result[0]
          // }else{
            // let random_number = await faker.random.number(2)
            random_department = await departments.aggregate(
              [
                {$match:{$and:[{"description":{$ne:''}},{"forms":{$ne:null}}]}} ,
                {$sample:{size:1}}
              ]
            ).exec()
          // }
          // console.log("dept_result=",random_department)
          // console.log("random_department=",random_department)
          // process.exit(0)
          //single form can be present per dept only forms can't be shared not a real life scenario.
          let put_body = {
            "data": encodeData,
            "form_url": "http:s//need_to_give_s3_url",
            "department_name": random_department[0].agency,
            "department_description": random_department[0].description,
            "department_id": random_department[0]._id,
            "department_organization": random_department[0].organization
            // "department_forms":random_department.forms
          }
          await fetch(`http://localhost:9200/form_files/_doc/${index}?pipeline=attachment`, {
            method: "PUT",
            body: JSON.stringify(put_body),
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(response => response.json()).then(data => {
            console.log(`Indexed ${filename} sucess`, data)
            // res.status(200).send(data)
          }).catch(err => res.status(500).send(err))
        });
      });
    });
    console.log("root=", __root)
    data = await fs.readFileSync(pdfFile);
    let encodeData = await data.toString('base64')
    res.status(200).send(encodeData)
  } catch (error) {
    res.status(500).send(error)
  }
}


async function createAttachmentMapping(client, req, res) {
  const url = 'http://localhost:9200/_ingest/pipeline/attachment'
  const req_body = {
    "description": "Extract attachment information",
    "processors": [
      {
        "attachment": {
          "field": "data",
          "properties": ["content", "title", "form_url", "department_id"]
        }
      }
    ]
  }
  try {
    let response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(req_body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    res.status(500).send(response)
  } catch (error) {
    res.status(500).send(error)
  }
}

async function searchDepartmentForms(client, req, res) {
  let { search_query, department_id,from,size } = req.body
  
  console.log("req_bo", req.body)
  if(search_query){
    body= department_attachments_query.formQuery(search_query,department_id,from,size)
    console.log("body=", body)
  }else{
    body={
      "from":from?from:0,
      "size":size
    }
  }
  const url = 'http://localhost:9200/form_files/_search'
  fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json()).then(data => res.status(200).send(data)).catch(err => res.status(500).send(err))
}

module.exports = {
  indexDepartmentForms,
  createAttachmentMapping,
  searchDepartmentForms
}