var db = require('../db')
const uuidv4 = require('uuid/v4');
const forms = require('../model/forms')
const fs = require('fs')
const fetch = require('node-fetch')

var faker = require('faker');

const csv = require('fast-csv')
const DataCollection = require('data-collection');
const csvFilePath = __root + '\\data\\government_organizations.csv'
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0


async function populateForms(req,res) {
    try {
        //logic combine data from 2 apis:
        //https://www.federalregister.gov/api/v1/agencies - gives data about all agencies 
        // csv gives codes and the department under which it falls and the state . 
        //loop through csv and then populate the data from both sources.
        const testFolder =  __root + '\\controller\\forms\\';
        let filenames = await fs.readdirSync(testFolder)
        let jsonData = await fetch('https://www.federalregister.gov/api/v1/agencies').then(response => response.json()).catch(error=>console.log("Error in fetchiong depts from federalregoster site",error))
        // console.log("jsonlength",jsonData[0])
        // process.exit(0)
        const file = fs.createWriteStream('./big.json');
        const govtAgenciesDataCllection = new DataCollection(jsonData)
        fs.createReadStream(csvFilePath)
            .pipe(csv.parse({
                headers: true
            }))
            .on('data', async  row => {
                let deptCode = row['Domain Name'].substring(0, row['Domain Name'].lastIndexOf('.'));
                let jsonByDeptCode = govtAgenciesDataCllection.query().filter({ short_name: deptCode }).values()
                if(jsonByDeptCode.length){
                    var { agency_url, description, id, logo, name, parent_id, recent_articles_url, short_name, slug, url, child_ids } = jsonByDeptCode[0]
                }
                var formsArray = await getForms(filenames)
                let logo_object = {
                    thumb_url: logo ? (logo.thumb_url ? logo.thumb_url : '') : '',
                    small_url: logo ? (logo.small_url ? logo.small_url : '') : '',
                    medium_url: logo ? (logo.medium_url ? logo.medium_url : '') : ''
                }
                let department = {
                    domain_name: deptCode,
                    domain_type: row['Domain Type'],
                    agency: row['Agency'],
                    organization: row.Organization,
                    city: row.City,
                    state: row.State,
                    securuity_contact_email: row['Security Contact Email'] ? row['Security Contact Email'] : '',
                    agency_url: agency_url ? agency_url : '',
                    description: description ? description : '',
                    _id: id ? id : uuidv4(),
                    logo: logo_object,
                    name: name ? name : '',
                    parent_id: parent_id ? parent_id : 0,
                    recent_articles_url: recent_articles_url ? recent_articles_url : '',
                    short_name: short_name ? short_name : '',
                    slug: slug ? slug : '',
                    url: url ? url : '',
                    forms: formsArray
                }
                console.log("department=",Object.keys(department).length)
                forms.create(department).then(data=>console.log(data)).catch(error=>console.log(error))
            }).on("end",function(error,data){
                res.status(200).send("completed -",data)
            })
            
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
}


function getForms(filenames) {
    //read directory get random form random times and send it as array searching will be doen through elasticsearch
    return new Promise((resolve,reject)=>{
        let formsArray = []
        let random_iterator =  faker.random.number(10)
        for(let i =0;i<random_iterator;i++){
            let random_index =  faker.random.number(10)
            formsArray.push({
                file_name: filenames[random_index],
                file_url: filenames[random_index].split(' ').join('+'),
            })
        }
        resolve(formsArray)
    })
}


module.exports={
    populateForms
}
