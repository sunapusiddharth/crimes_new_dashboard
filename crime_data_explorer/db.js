var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/cde', { useNewUrlParser: true });
// mongoose.connect('"mongodb://127.0.0.1:27017,127.0.0.1:27018,127.0.0.1:27019/cde?replicaSet=mongo-repl"', { useNewUrlParser: true });


// mongoose.connect('mongodb://127.0.0.1:27017/mail',{poolSize:4});
