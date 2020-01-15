var app = require('./app');
var port =  8007;
const scripts = require('./controller/dashboard/dashboard')

var server = app.listen(port, function() {
  // console.log("__dirname",__dirname+'\\data')
  console.log('Express server listening on port ' + port);
});

const io = require('socket.io')(server);
let interval;
io.on("connection", socket => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  // interval = setInterval(async () => {
  //   let response = await scripts.appendEstimatedCrimesRecord(socket)
  //   console.log("from server",response)
  //   if(response === 'success') scripts.crimesData(socket)
  // }, 10000)

  // setInterval(async () => {
  //   let response = await scripts.appendVictimsCounts(socket)
  //   console.log("from server",response)
  //   if(response === 'success') scripts.victimsCount(socket)
  // }, 10000)

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});