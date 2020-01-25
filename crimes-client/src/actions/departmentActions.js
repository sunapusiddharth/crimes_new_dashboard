export const load_department_filters = 'load_department_filters';
export const save_department_filters = 'save_department_filters';
export const load_search_results = 'load_search_results';
export const save_search_results = 'save_search_results';
export const save_selected_filters = 'save_selected_filters'
export const load_department = 'load_department'
export const save_department = 'save_department'
export const load_department_without_details = 'load_department_without_details'
export const save_department_without_details = 'save_department_without_details'
export const load_all_posts = 'load_all_posts'
export const save_all_posts = 'save_all_posts'
export const load_individual_posts = 'load_individual_posts'
export const save_individual_posts = 'save_individual_posts'
export const load_all_departmenst = 'load_all_departmenst'
export const save_all_departments = 'save_all_departments'
export const FILTERS_CHANGE = 'FILTERS_CHANGE'
export const clear_department_search_results_before_new_search = 'clear_department_search_results_before_new_search'
export const load_all_speeches = 'load_all_speeches'
export const save_all_speeches = 'save_all_speeches'
export const load_all_vacancies = 'load_all_vacancies'
export const save_all_vacancies = 'save_all_vacancies'
export const load_individual_vacancy = 'load_individual_vacancy'
export const save_individual_vacancy = 'save_individual_vacancy'
export const load_individual_speech = 'load_individual_speech'
export const save_individual_speech = 'save_individual_speech'


//for detailed blog post :
export const add_comment = 'add_comment'
export const save_dept_blog_likes_count = 'save_dept_blog_likes_count'

const requestDepartmentFilters = () => ({
    type: load_department_filters
})

const saveDepartmentFilters = (data) => ({
    type: save_department_filters,
    data: data,
})

export function fetchDepartmentFilters(filters) {
    return dispatch => {
        dispatch(requestDepartmentFilters());
        //fire the initial query to get data from elastcisearch for filters :

        let url = `http://${process.env.REACT_APP_API_HOST}:8004/api/search/departments/aggs`
        fetch(url, {
            headers: {
                "Access-Control-Allow-Origin": true
            }
        })
            .then(response => response.json())
            .then(department_filters => {
                dispatch(saveDepartmentFilters(department_filters.aggregations))
            }).catch(error => console.log(error))
    }
}



export function saveFilters(data){
    console.log('data=',data)
    return {
        type: save_selected_filters,
        data: data,
    }
}


const loadSearchResults = () => ({
    type: load_search_results
})

const saveSearchResults = (data) => ({
    type: save_search_results,
    data: data,
})


export function filtersChanged(data) {
    return {
      type: FILTERS_CHANGE,
      payload: data
    };
  }

  
const clearDepartmentSearch = (data) => ({
    type: clear_department_search_results_before_new_search,
    data: data,
  })

export function searchDepartments(query,from,size,clear_results) {
    console.log("from submit actions")
    
    return (dispatch,getState) => {
        if(clear_results) dispatch(clearDepartmentSearch())
        dispatch(loadSearchResults());
        const departmentReducer = getState().departmentReducer
        let selected_filters = {
            city:departmentReducer.selected_city,
            state:departmentReducer.selected_state,
            organization:departmentReducer.selected_organization,
            domain_type:departmentReducer.selected_domain_type
        }
        let filters = []    
        Object.keys(selected_filters).map(filter=>{
            if(typeof selected_filters[filter] !== 'undefined'){
                if(selected_filters[filter].length){
                    selected_filters[filter].map(value=>{
                        let filterName =  `${filter}.keyword`
                        let filterObj = {[filterName]:value}
                        filters.push({
                               "term": {
                                    [filterName]:value
                               }
                        })
                    })
                }
            }
        })

        const aggs={
            "city":{
              "terms":{
                "field":"city.keyword",
                "size":200
              }
            },
            "state":{
              "terms":{
                "field":"state.keyword",
                "size":100
              }
            },
            "organization":{
              "terms":{
                "field":"organization.keyword",
                "size":10
              }
            },
            "domain_type":{
              "terms":{
                "field":"domain_type.keyword",
                "size":200
              }
            }
          }
          var body ={}
          if(query && query.length){
             body= {
                "from":from?from:0,
                "size":size?size:10,
                "query": {
                    "bool": {
                        "must": {
                            "multi_match": {
                                "query": query,
                                "fields": [
                                    "domain_name","organization","domain_type","agency","organization","description","logo.thumb_url"
                                ]
                            }
                        },
                        "filter":filters
                    }
                },
               aggs
            }
          }else{
            body= {
                "query": {
                    "bool": {
                        "filter":filters
                    }
                },
               aggs
            }
          }
        let url = `http://${process.env.REACT_APP_API_HOST}:8004/api/search/departments`
        fetch(url, {
            method:'post',
            body:JSON.stringify(body),
            headers: {
                "Content-Type":"application/json",
                "Access-Control-Allow-Origin": true
            }
        })
            .then(response => response.json())
            .then(data => {
                dispatch(saveSearchResults(data))
            }).catch(error => console.log(error))
    }
}

const loadDepartment = () => ({
    type: load_department
})

const saveDepartment = (data) => ({
    type: save_department,
    data: data,
})


export function fetchDepartmentDetails(department_id) {
    return (dispatch) => {
        dispatch(loadDepartment());
        let url = `http://${process.env.REACT_APP_API_HOST}:8004/api/forms/department/${department_id}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // console.log("from submit actions dispatch")
                dispatch(saveDepartment(data))
            }).catch(error => console.log(error))
    }
}


const loadDepartmentWithoutDetails = () => ({
    type: load_department_without_details
})

const saveDepartmentWithoutDetails = (data) => ({
    type: save_department_without_details,
    data: data,
})


export function fetchDepartmentWithoutDetails(department_id) {
    return (dispatch) => {
        dispatch(loadDepartmentWithoutDetails());
        let url = `http://${process.env.REACT_APP_API_HOST}:8004/api/forms/department/without_related_info/${department_id}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                dispatch(saveDepartmentWithoutDetails(data))
            }).catch(error => console.log(error))
    }
}


// Recent Posts:
//get all posts

const loadAllPosts = () => ({
    type: load_all_posts
})

const saveAllPosts = (data) => ({
    type: save_all_posts,
    data: data,
})


export function getAllPosts(page_number) {
    return (dispatch) => {
        dispatch(loadAllPosts());
        let url = `http://${process.env.REACT_APP_API_HOST}:8004/api/forms/posts/${page_number}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // console.log("from submit actions dispatch")
                dispatch(saveAllPosts(data))
            }).catch(error => console.log(error))
    }
}

// get all departments:
const loadAllDepartments = () => ({
    type:load_all_departmenst
})

const saveAllDepartments = (data) => ({
    type: save_all_departments,
    data: data,
})


export function fetchAllDepartments(skip, limit) {
    return (dispatch) => {
        dispatch(loadAllDepartments());
        let url = `http://${process.env.REACT_APP_API_HOST}:8004/api/forms/departments`;
        fetch(url,{
            method: 'POST',
            body: JSON.stringify({
                "skip": skip,
                "limit": limit
            }),
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": true
            }})
            .then(response => response.json())
            .then(data => {
                // console.log("from submit actions dispatch")
                dispatch(saveAllDepartments(data))
            }).catch(error => console.log(error))
    }
}

// get individual posts:
const loadIndividualPosts = () => ({
    type: load_individual_posts
})

const saveIndividualPosts = (data) => ({
    type: save_individual_posts,
    data: data,
})


export function getIndividualPosts(post_id) {
    return (dispatch) => {
        dispatch(loadIndividualPosts());
        let url = `http://${process.env.REACT_APP_API_HOST}:8004/api/forms/post/${post_id}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                data[1] = data[1].map(item=>{
                    if(!item.parent_id){
                        item.parent_id  = "0"
                    }
                    return item
                })
                let tree_comments = getNestedChildren(data[1],"0")
                data[1] = tree_comments
                dispatch(saveIndividualPosts(data))
            }).catch(error => console.log(error))
    }
}

function getNestedChildren(arr, parent_id) {
    var out = []
    for(var i in arr) {
        if(arr[i].parent_id == parent_id) {
            var children = getNestedChildren(arr, arr[i].full_slug)

            if(children.length) {
                arr[i].comment = children
            }
            out.push(arr[i])
        }
    }
    return out
}
// id should be the full_slug
//parent_id should 
// speeches:

const loadAllSpeeches = () => ({
    type: load_all_speeches
})

const saveAllSpeeches = (data) => ({
    type: save_all_speeches,
    data: data,
})


export function getAllSpeeches(page_number) {
    return (dispatch) => {
        dispatch(loadAllSpeeches());
        let url = `http://${process.env.REACT_APP_API_HOST}:8004/api/forms/posts_speeches/${page_number}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // console.log("from submit actions dispatch")
                dispatch(saveAllSpeeches(data))
            }).catch(error => console.log(error))
    }
}

//single speeches
const loadIndividualSpeech = () => ({
    type: load_individual_speech
})

const saveIndividualSpeech = (data) => ({
    type: save_individual_speech,
    data: data,
})

export function getIndividualSpeech(speech_id) {
    return (dispatch) => {
        dispatch(loadIndividualSpeech());
        let url = `http://${process.env.REACT_APP_API_HOST}:8004/api/forms//speeches/${speech_id}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // console.log("from submit actions dispatch")
                dispatch(saveIndividualSpeech(data))
            }).catch(error => console.log(error))
    }
}

// Vacancies:

const loadAllVacancies = () => ({
    type: load_all_vacancies
})

const saveAllVacancies = (data) => ({
    type: save_all_vacancies,
    data: data,
})

export function getAllVacancies(page_number) {
    return (dispatch) => {
        dispatch(loadAllVacancies());
        let url = `http://${process.env.REACT_APP_API_HOST}:8004/api/forms/department_vacancies/${page_number}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // console.log("from submit actions dispatch")
                dispatch(saveAllVacancies(data))
            }).catch(error => console.log(error))
    }
}

//single vacancy:
const loadIndividualVacancy = () => ({
    type: load_individual_vacancy
})

const saveIndividualVacancy = (data) => ({
    type: save_individual_vacancy,
    data: data,
})

export function getIndividualVacancy(vacancy_id) {
    return (dispatch) => {
        dispatch(loadIndividualVacancy());
        let url = `http://${process.env.REACT_APP_API_HOST}:8004/api/forms/department_vacancy/${vacancy_id}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // console.log("from submit actions dispatch")
                dispatch(saveIndividualVacancy(data))
            }).catch(error => console.log(error))
    }
}

const saveLikesCount = (data) => ({
    type: save_dept_blog_likes_count,
    data: data,
})

export function incrementDepartmentLikes(department_post_id){
    //this shoould increment and server will return the likes count
    return (dispatch)=>{
        let url = `http://${process.env.REACT_APP_API_HOST}:8004/api/forms/department_vacancy/${department_post_id}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                dispatch(saveLikesCount(data))
            }).catch(error => console.log(error))
    }
}

const addComment = (data) => ({
    type: add_comment,
    data
})

export function addBlogComment(comment,parent_slug){
    return (dispatch,getState)=>{
        const departmentReducer = getState().departmentReducer
        const post = departmentReducer.post
        let author_id = '5d7631ae5450143c288ce02e'
        //Logic - backend wil return new comment . So in frontend take this new comment object and push it under the
        let url = `http://${process.env.REACT_APP_API_HOST}:8004/api/forms/department_blogs/add_new_comments`;
        fetch(url,{
            method: 'POST',
            body: JSON.stringify({
                "author_id":"5d7631ae5450143c288ce02e",
                "blog_id":post._id,
                "comment_text":comment,
                "parent_slug":parent_slug
            }),
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": true
            }})
            .then(response =>{
                if(response.status == 500){
                    dispatch(addComment("error"))
                }else{
                    return  response.json()
                }
            })
            .then(data => {
                dispatch(addComment(data))
            }).catch(error => console.log(error))
    }
}
