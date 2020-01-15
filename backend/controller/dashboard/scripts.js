const crimes = require('../../model/crimes')
//logic - will update the records every 5 seconds and using mongodb changestreams we will send response to the client .

function appendRecordToEnd(){
    crimes.findOne().then(res=>{
        let temp = res
    })
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
    removeAndAppendDocumentsFake
}