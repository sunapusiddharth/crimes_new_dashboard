const people = require('../../model/people')
const crimes = require('../../model/crimes')
const populateRelationships = require('../populateRelationships')
var faker = require('faker');



async function addAccussed(req,res){

    try {
             //creating victim:
    var name = faker.name.findName(); // Rowan Nikolaus
    let address = `${faker.address.streetName()},${faker.address.streetAddress()},${faker.address.city()},${faker.address.state()}`
    let phone = faker.phone.phoneNumber()
    let email = faker.internet.email()
    let education = await populateRelationships.getRandomEducation()
    let employment = await populateRelationships.getRandomEmployment()
    let avatar = await faker.image.avatar()
    let photos = []
    let active = 1
    let social_link = ['http://facebook.com','https //instagram.com']
    let prisons = await populateRelationships.getRandomPrisons()
    let departments = await populateRelationships.getRandomDepartments()
    let is_accussed = 1
    let is_law = faker.random.number(1)
    let is_suspect = 1
    let country = faker.address.country()
    let is_witness = 0
    let crimes_data = await crimes.aggregate().sample(faker.random.number(3)).exec()
    await people.create({
        name,
        address,
        phone,
        email,
        education,
        employment,
        photos,
        social_link,
        prisons,
        departments,
        is_accussed,
        is_law,
        is_suspect,
        country,
        is_witness,
        cases: crimes_data,
        avatar
    })
    res.status(200).send("victim created successfully")
    } catch (error) {
        res.status(500).send("error",error)
    }
   
}



function getAccussed(req,res,count){
    people.find({is_accussed:1}).sort({_id:-1}).limit(count).then(data=>{
        console.log("Success getAccussed",data)
        res.status(200).send(data)
    }).catch(error=>{
        console.log("Error getAccussed",error)
        res.status(500).send(error)
    })
}
module.exports = {
    addAccussed,
    getAccussed
}