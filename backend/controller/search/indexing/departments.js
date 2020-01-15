//file to perform indexing operations on forms/ departments :
//should be called on every addition of form .


//for bulk indexing of forms .
const departments = require('../../../model/forms')
const bulk_import_network_calls = require('./helper').bulk_import_network_calls
const mappings = require('./mappings/departments')

async function departmentBulkIndex(client, req, res) {
    try {
        let db_data = await departments.find({}).exec()
        db_data = db_data.slice(0,10)
        let index_settings = mappings.settings
        let index_mappings = mappings.mappings
        // let mapping_object = mappings.mappings
        //Step 1 : create the index :
        // res.send(index_mappings)
        // process.exit(0)
        // let response_create_index = await client.indices.create({
        //     index: 'departments',
        //     body: {
        //         settings: index_settings
        //     }
        // });

        // let mapping_res = await client.indices.putMapping({
        //     index: 'departments',
        //     type:"department",
        //     body: {
        //             properties: index_mappings
        //         }
        // })
        

        //find the docs from mongoDB 
        // let db_data = await departments.find({}).exec()
        //function to transform data for elasticsearch :
        let transformed_data = await getTransformedData(db_data)
        // res.send(transformed_data)
        // process.exit(0)
        // console.log("transformed_data=",transformed_data.slice(0,1))
        // res.send(transformed_data.slice(0,1))
        // process.exit(0)
        //Step 2 : add docs to the index 
        // transformed_data = transformed_data.slice(0, 10)
        // const department_indexing_data = JSON.parse(transformed_data)
        let response_bulk_add = await bulk_import_network_calls(client, 'departments', 'department', transformed_data)
        res.status(200).send(response_bulk_add)
        console.log("Department data bulk indexing is completed !!!!")
    } catch (error) {
        console.log("error in something catch", error)
        res.status(500).send(error)
    }
}


function getTransformedData(db_data) {
    return new Promise(async (resolve, reject) => {
        let bulk_item = await db_data.map(record => {
            let { domain_name, domain_type, organization, agency, city, state, forms, name } = record
            return {
                "id":record._id,
                "body":{
                    "suggest": {
                        "input": [domain_name, name, organization],
                        "contexts": {
                            "city": city,
                            "state": state,
                            "agency": agency,
                            "organization": organization
                        }
                    },
                    "domain_name": domain_name,
                    "domain_type": domain_type,
                    "agency": agency,
                    "organization": organization,
                    "city": city,
                    "state": state,
                    "name": name,
                    forms
                }
            }
        })
        resolve(bulk_item)
    })
}

module.exports = {
    "departmentBulkIndex": departmentBulkIndex,
    "getTransformedData": getTransformedData
}