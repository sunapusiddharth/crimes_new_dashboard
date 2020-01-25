const winston = require('winston')
const consoleTransport = new winston.transports.Console()
const moment = require('moment')
const myWinstonOptions = {
    transports: [consoleTransport]
}
const redis = require('redis');
const client = redis.createClient(6379, 'redis')

client.on('error', (err) => {
    console.log("Error " + err);
});

var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

var upload = multer({ storage: storage }).array('file')

const logger = new winston.createLogger(myWinstonOptions)
const comment_buckets = require('../../model/department_blogs/comment_buckets')
const blog_comment = require('../../model/department_blogs/blog_comment')
const department_posts = require('../../model/department_posts')
const people = require('../../model/people')


async function createNewBlog(req, res) {
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        console.log(req.body)
        console.log(req.files)
        try {
            let json_body = req.body && req.body.data && JSON.parse(req.body.data)
            let author = await people.findById(json_body.author_id).exec()  
                await department_posts.create({
                    title: json_body.title,
                    body: json_body.body,
                    created: new Date(),
                    changed: null,
                    likes: 0,
                    author,
                    attachments:[],
                    url:'',
                    image:'',
                    teaser:''
                }).then(response => {
                    logger.error("Succes in fucntion createNewBlog:", response)
                    //clear the cache here which had been created for posts:*
                    client.del("posts:*",function(err, response) {
                        if (response == 1) {
                           console.log("Deleted Successfully!")
                        } else{
                         console.log("Cannot delete")
                        }
                     })
                    res.status(200).send(response)
                }).catch(error => {
                    logger.error("Error in fucntion createNewBlog:", error)
                    res.status(500).send(error)
                })
        } catch (error) {
            logger.error("Error in fucntion createNewBlog:", error)
            res.status(500).send(error)
        }
    })
    /*
    Sample request :
    POST : http://localhost:8004/api/forms/department_blogs/add_new_blog
    {
	    "author_id":"5d7631ae5450143c288ce02e",
	    "title":"New Blog here ",
	    "body":"Some lorem ipsum here "
    }
    */
}

async function addNewCommentsToBlog(req, res) {
    /*
    POST : http://localhost:8004/api/forms/department_blogs/add_new_comments
    {
	    "author_id":"5d7631ae5450143c288ce02e",
	    "blog_id":"5d8b84ffefbaa845c8a5ba53",
        "comment_text":"Lorem ipsum comments",
        "parent_slug":"mxibr"
    }
    */

    let departmentPost = await department_posts.findById(req.body.blog_id).exec()
    let author = await people.findById(req.body.author_id).exec()
    let posted_date = new Date
    let timestamp = moment(posted_date).format('YYYY.MM.DD.hh:mm:ss');
    let slug_part = generateSlug();
    let full_slug_part = timestamp + ':' + slug_part;
    var slug
    var full_slug
    if (req.body.parent_slug) {
        let parent = await blog_comment.findOne({ 'discussion_id': departmentPost._id, 'full_slug': req.body.parent_slug }).exec()
        slug = parent.slug + '/' + slug_part;
        full_slug = parent.full_slug + '/' + full_slug_part;
    } else {
        slug = slug_part;
        full_slug = full_slug_part;
    }
    await blog_comment.create({
        discussion_id: departmentPost._id,
        posted: posted_date,
        author: {
            name: author.name[0],
            id: author._id
        },
        text: req.body.comment_text,
        'slug': slug,
        'full_slug': full_slug,
        parent_id:req.body.parent_slug
    }).then(response => {
        logger.error("Succes in fucntion createNewBlog:", response)
        res.status(200).send(response)
    }).catch(error => {
        logger.error("Error in fucntion createNewBlog:", error)
        res.status(500).send(error)
    })
}

async function getPaginatedComments(req, res) {
    let page_num = req.body.page_num
    let page_size = req.body.page_size
    let paginatedComments = await blog_comment.find({ "discussion_id": req.body.blog_id }).sort('full_slug').skip(page_num * page_size).limit(page_size)
    res.status(200).send(paginatedComments)
}

module.exports = {
    createNewBlog,
    addNewCommentsToBlog,
    getPaginatedComments
}



function generateSlug() {

    let slug = '';
    let chars = 'abcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
        slug += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return slug;
}