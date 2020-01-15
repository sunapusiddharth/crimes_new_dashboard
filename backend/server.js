var app = require('./app');
var port =  8004;
const scripts = require('./controller/dashboard/scripts')
const People = require('./model/people')
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/crimes', { useNewUrlParser: true });
// mongoose.connect('"mongodb://127.0.0.1:27017,127.0.0.1:27018,127.0.0.1:27019/crimes?replicaSet=mongo-repl"', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error:'));
db.once('open', () => {
  var server = app.listen(port, function () {
    // console.log("__dirname",__dirname+'\\data')
    console.log('Express server listening on port ' + port);
  });
  // const people = db.collection('peoples');
  // console.log("peopel=",People)
  // let inserts = People.watch([{ $match: { operationType: 'insert' } }]);
  // inserts.on('change',function(data) {
    
  //     console.log(name);
  // });

  const io = require('socket.io')(server);



  let interval;
  io.on("connection", socket => {
    console.log("New client connected");
    //mongodb change stream functions that will trigger socket if something changed
    // changeStream.on('change', data => console.log("data added", data))

    // setInterval(async () => {
    //   let response = await scripts.appendVictimsCounts(socket)
    //   console.log("from server",response)
    //   if(response === 'success') scripts.victimsCount(socket)
    // }, 10000)

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
});
