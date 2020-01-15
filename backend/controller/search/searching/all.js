const wordCloud = async (client, req, res)=>{
    let index_name = req.params.index_name
    try {
        if(index_name){
            console.log("hi frmm inside",index_name)
            let results = await client.search({
                index: index_name,
                size: 0,
                body: {
                    // Begin query. For fututre where user can do filtering from the word cloud.
                    // query: {
                    //     // Boolean query for matching and excluding items.
                    //     bool: {
                    //         must: { match: { "description": "TOUCHDOWN" }},
                    //         must_not: { match: { "qtr": 5 }}
                    //     }
                    // },
                    // Aggregate on the results
                    aggs: {
                        top_5_offense_code_groups: {
                            terms: {
                                field: "offense_code_group.raw",
                                size:30
                            }
                        }
                    }
                    // End query.
                }
            })
        
            res.status(200).send(results)   
        }else{
        
    }
    } catch (error) {
        res.status(200).send(results)   
    }
  }



  
module.exports = {
    wordCloud
  }