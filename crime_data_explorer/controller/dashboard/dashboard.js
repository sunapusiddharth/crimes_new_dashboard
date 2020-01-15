const crimes = require('../../model/estimated_crimes')
const victims_count_national = require('../../model/victims/count/national')
const estimated_crimes_data_provider = require('../estimated_crimes/dataProvider')
const victims_data_provider = require('../victims/dataProvider')
//logic - will update the records every 5 seconds and using mongodb changestreams we will send response to the client .

//screens - 
//1. estimated crimes for year 2017
// additional feature , let users select a threshold and is crime rate for any increases send out a notification.
function appendEstimatedCrimesRecord(){
  return new Promise((resolve,reject)=>{
    
    crimes.findOneAndUpdate({year:2017,state_id:0},{$inc:{
      robbery:Math.floor(Math.random() * 2000 + 1500),
      aggravated_assault:Math.floor(Math.random() * 20 + 1),
      property_crime:Math.floor(Math.random() * 20 + 1),
      homicide:Math.floor(Math.random() * 20 + 1),
      rape_revised:Math.floor(Math.random() * 2000 + 1500),
      burglary:Math.floor(Math.random() * 5000 + 4000),
      larceny:Math.floor(Math.random() * 20 + 1),
      rape_legacy:Math.floor(Math.random() * 20 + 1),
      motor_vehicle_theft:Math.floor(Math.random() * 2000 + 1)
    }}).then(res=>{
      console.log("success")
      resolve("success")
    }).catch(error=>{
      console.log("error")
      reject("error")
    })
  })
    
}


function appendVictimsCounts(){
  return new Promise((resolve,reject)=>{
    let offense_codes=["hacking-computer-invasion",'animal-cruelty','betting','human-trafficking-commerical-sex-acts','bribery',
    'purchasing-prostitution','assisting-or-promoting-prostitution','human-trafficking-commerical-involuntary-servitude',
    'gambling-equipment-violation']
    let offense_code = offense_codes[Math.floor(Math.random() * offense_codes.length + 1)]
    console.log("offense_code in appendvictims",offense_code)
    victims_count_national.findOneAndUpdate({data_year:2017,offense_code:offense_code},{$inc:{count:Math.floor(Math.random() * 800 + 750)}}).then(res=>{
      console.log("success")
      resolve("success")
    }).catch(error=>{
      console.log("error")
      reject("error")
    })
  })
    
}


const crimesData = async socket =>{
  try {
    console.error(`hi started`);
    const res = await estimated_crimes_data_provider.getTotalCrimes()
    console.error(`Success in estimated crimes: ${res}`);
    socket.emit("estimated_crimes", res);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

const victimsCount = async socket =>{
  try {
    console.error(`hi victims count started`);
    const res = await victims_data_provider.victimsCountDashboard()
    console.error(`Success in victims count: ${res}`);
    socket.emit("victims_count", res);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}


const removeAndAppendDocumentsFake = async socket => {
    try {
      const res = await  crimes.findOne().then(res=>{
        
        return res
    })
      socket.emit("crimes_count", res); // Emitting a new message. It will be consumed by the client
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

module.exports = {
    removeAndAppendDocumentsFake,
    crimesData,
    appendEstimatedCrimesRecord,
    appendVictimsCounts,
    victimsCount
}