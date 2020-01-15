var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var VerifyToken = require(__root + 'auth/VerifyToken');
router.use(bodyParser.urlencoded({
    extended: true
}));
const consoleTransport = new winston.transports.Console()
const myWinstonOptions = {
    transports: [consoleTransport]
}
const logger = new winston.createLogger(myWinstonOptions)
const bookmarked_department_posts = require('../../model/user/bookmarked_department_posts')
const department_posts = require('../../model/department_posts')

router.get('/department/bookmarked_posts/:user_id',function (req, res) {
    bookmarked_department_posts.find({user:req.params.user_id})
});

router.get('/department/add_bookmarked_posts/:user_id/:post_id',async function (req, res) {
    //find the post id and add it to the doc
    let post = await department_posts.findById(req.params.post_id)
    bookmarked_department_posts.update({user:req.params.user_id},{posts:post}).then(result=>{
        logger.info(`Success in add_bookmarked_posts `,result)
        res.status(200).send(result)
    }).catch(error=>{
        logger.error(`Error in add_bookmarked_posts `,error)
        res.status(500).send(error)
    })
});

module.exports = router;