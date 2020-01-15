const winston = require('winston')
const consoleTransport = new winston.transports.Console()
const myWinstonOptions = {
    transports: [consoleTransport]
}


const logger = new winston.createLogger(myWinstonOptions)
const crimes = require('../../model/crimes')
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})

var upload = multer({ storage: storage }).array('file')



async function addCrime(req, res) {
console.log("hi")
upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
    } else if (err) {
        return res.status(500).json(err)
    }
    console.log(req.body)
    console.log(req.files)
// return res.status(200).send(req.file)

})
}

module.exports = {
    addCrime,
}