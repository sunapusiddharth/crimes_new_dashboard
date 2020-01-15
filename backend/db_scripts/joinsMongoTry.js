const crimes = require('../model/crimes')
var db = require('../db')
const mongoose = require('mongoose')


    crimes.aggregate([{
        $match:{
            '_id':{
                $eq:'5d40f0159732ba241819bb12'
            }
        }
    },
    {
        $lookup:{
            from:'incident',
            localField:'incident_number',
            foreignField:'incident_number',
            as:'incident_data'
        }
    },
    {
        $lookup:{
            from:'incident_peoples',
            localField:'incident_number',
            foreignField:'incident_number',
            as:'incident_people_data'
        }
    }
]).exec(function(error,data){
    if(error){
        console.log(error)
    }
    console.log("data === ",data)
})

crimes.aggregate([
    {
        $match:{
            '_id':{
                $eq: mongoose.Types.ObjectId("5d40f0159732ba241819bb12")
            }
        }
    },
    {
        $lookup:{
            from:'incidents',
            localField:'incident_number',
            foreignField:'incident_number',
            as:'incident_data'
        }
    },
    {
        $lookup:{
            from:'incident_peoples',
            localField:'incident_number',
            foreignField:'incident_number',
            as:'incident_peoples'
        }
    },
    {
        $unwind:{path:"$incident_peoples",preserveNullAndEmptyArrays: true}
    },
    {
        $lookup:{
            from:"peoples",
            localField:"incident_peoples.law",
            foreignField:"_id",
            as:"peoples"
        }
    }
]).exec(function(error,data){
    if(error){
        console.log(error)
    }
    console.log("data2 === ",data)
})