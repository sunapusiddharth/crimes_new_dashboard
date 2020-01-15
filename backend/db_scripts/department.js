//script to add data about departments to mongodb :
const postHelpers = require('../controller/department/posts')
const postModel = require('../model/post')
var db = require('../db')

async function addPosts(){
    let total_pages_limit = 1
    
    for(let i=0;i<=total_pages_limit;i++){
        let data = await postHelpers.getAllPosts(i)
        let posts = data.results
        console.log("post_length",posts.length)
        
         posts.map(async post=>{
            //  console.log("post_length",post)
             
            await postModel.create(post,function(error,data){
                if(error){
                    console.log("error=",error)
                }
                console.log("done",data)
            })
            process.exit(0)
        })
        // process.exit(0)
    }
}

addPosts()