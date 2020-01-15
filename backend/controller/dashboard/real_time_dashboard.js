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

// For real time map:
function connect(callback) {
  // connect to a data source
};

function ping(callback) {
  // ping for data from the source
};

app.get('/update-stream', (req, res) => {

  // create the response headers
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

 // connect to the data source
 connect(() => {
   setInterval(() => {
     // ping the data source
     ping((data) => {

       // each response must have a unique id!
       res.write('id: ${i++}\n');

       // convert the result to a JSON string and write to the client
       res.write('data: ${JSON.stringify(data)}\n\n');
     });
   // ping every two seconds
   }, 2000); 
  });
});



module.exports = {
    removeAndAppendDocumentsFake,
    crimesData
}