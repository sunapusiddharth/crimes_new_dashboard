import { func } from "prop-types";

export const request_people = 'request_people';
export const save_people = 'save_people';
export const request_word_cloud = 'request_word_cloud';
export const save_word_cloud = 'save_word_cloud';
export const request_forms = 'request_forms';
export const save_forms = 'save_forms';
export const request_crimes = 'request_crimes';
export const save_crimes = 'save_crimes';
export const request_combined_data = 'request_combined_data';
export const save_combined_data = 'save_combined_data';
export const request_autocomplete_people = 'request_autocomplete_people';
export const save_autocomplete_people = 'save_autocomplete_people';
export const save_autocomplete_people_concat_results = 'save_autocomplete_people_concat_results';
export const clear_autocomplete_people_results = 'clear_autocomplete_people_results';
export const request_posts = 'request_posts'
export const save_posts = 'save_posts'
export const request_autocomplete_posts = 'request_autocomplete_posts'
export const save_autocomplete_posts = 'save_autocomplete_posts'
export const save_autocomplete_posts_concat_results = 'save_autocomplete_posts_concat_results'
export const clear_autocomplete_posts_results = 'clear_autocomplete_posts_results'
export const request_bookmark_posts = 'request_bookmark_posts'
export const save_bookmark_posts = 'save_bookmark_posts'
export const request_add_bookmarked_post = 'request_add_bookmarked_post'
export const save_add_bookmarked_post = 'save_add_bookmarked_post'
// speeches:
export const request_speeches = 'request_speeches'
export const save_speeches = 'save_speeches'
export const request_autocomplete_speeches = 'request_autocomplete_speeches'
export const save_autocomplete_speeches = 'save_autocomplete_speeches'
export const save_autocomplete_speeches_concat_results = 'save_autocomplete_speeches_concat_results'
export const clear_autocomplete_speeches_results = 'clear_autocomplete_speeches_results'
// vacancies
export const request_vacancies = 'request_vacancies'
export const save_vacancies = 'save_vacancies'

// All search :
export const request_all = 'request_all'
export const save_all = 'save_all'
export const change_search_query_keyword = 'change_search_query_keyword'

const requestAllData = () => ({
  type: request_combined_data
})

const saveAllData = (data) => ({
  type: save_combined_data,
  data: data,
})

export function fetchNewCombinedData(query, filters, from, size) {
  return async dispatch => {
    dispatch(requestAllData());

    let body = JSON.stringify({
      search_query: query,
      from: from,
      size: size
    })
    let forms_body = {
      "search_query": query,
      "department_id": 0,
      "from": from,
      "size": size
    }

    let crime_body = JSON.stringify({
      "search_query": query,
      "department_id": 0,
      filters:[],
      "from": from,
      "size": size
    })

    try {
      let promises = [
        fetch(`http://${process.env.REACT_APP_API_HOST}:8004/api/search/crimes`, {
          method: "POST",
          body: crime_body,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(res => res.json()).then(data => data).catch(error => console.log("error in crimes", error)),

        // fetch('http://${process.env.REACT_APP_API_HOST}:8004/api/search/forms/search', {
        //   method: "POST",
        //   body: forms_body,
        //   headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json'
        //   }
        // }).then(res => res.json()).then(data => data).catch(error => console.log("error in department forms", error)),

        fetch(`http://${process.env.REACT_APP_API_HOST}:8004/api/search/people`, {
          method: "POST",
          body: body,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(res => res.json()).then(data => data).catch(error => console.log("error in people", error)),
        //Posts
        fetch(`http://${process.env.REACT_APP_API_HOST}:8004/api/search/department_details/find/post`, {
          method: "POST",
          body,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(res => res.json()).then(data => data).catch(error => console.log("error in posts", error)),
        // Speches:
        fetch(`http://${process.env.REACT_APP_API_HOST}:8004/api/search/department_details/find/speeches`, {
          method: "POST",
          body,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(res => res.json()).then(data => data).catch(error => console.log("error in speeches", error)),
        // Vacancies:
        
        fetch(`http://${process.env.REACT_APP_API_HOST}:8004/api/search/department_details/find/vacancies`, {
          method: "POST",
          body,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(res => res.json()).then(data => data).catch(error => console.log("error in vacancies", error)),
      ]
      let promise_data = await Promise.all(promises)
      const responseJSON = [
        { "crimes": promise_data[0] },
        { "people": promise_data[1] },
        { "post": promise_data[2] },
        { "speeches": promise_data[3] },
        { "vacancies": promise_data[4] }
      ];
      //finding the relevant result : logic find the max score of each whichever has the max will be more relevant 
      // and then shown in descending order in form of carousel.
      // debugger
      responseJSON.sort(function(a,b){
        if(Object.values(a)[0].hits.max_score < Object.values(b)[0].hits.max_score){
          return 1
        }

        if(Object.values(a)[0].hits.max_score > Object.values(b)[0].hits.max_score){
          return -1
        }
        return 0 
      })
    
      dispatch(saveAllData(promise_data))
    } catch (error) {
      console.log("error=", error)
    }
  }
}

const requestPeople = () => ({
  type: request_people
})

const savePeople = (data) => ({
  type: save_people,
  data: data,
})

export function searchPeople(query, filters, from, size) {
  return dispatch => {
    dispatch(requestPeople());
    let url = `http://${process.env.REACT_APP_API_HOST}:8004/api/search/people`
    let body = JSON.stringify({
      search_query: query,
      from: from,
      size: size
    })
    fetch(url, {
      method: "POST",
      body: body,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(people => {
        dispatch(savePeople(people))
      }).catch(error => console.log(error))
  }
}


const requestAutoCompletePeople = () => ({
  type: request_autocomplete_people
})

const saveAutoCompletePeople = (data) => ({
  type: save_autocomplete_people,
  data: data,
})

const saveAutoCompletePeopleConcatResults = (data) => ({
  type: save_autocomplete_people_concat_results,
  data: data,
})

const clearAutocompleteResults = (data) => ({
  type: clear_autocomplete_people_results,
  data: data,
})



export function searchAutoCompletePeople(query, filters, concat_results, from, size) {
  console.log("concat_results", concat_results)
  return dispatch => {
    dispatch(requestAutoCompletePeople());
    // if(!concat_results) {dispatch(clearAutocompleteResults())}
    let url = `http://${process.env.REACT_APP_API_HOST}:8004/api/search/autocomplete/people`
    let body = JSON.stringify({
      search_query: query,
      from: from,
      size: size
    })
    fetch(url, {
      method: "POST",
      body: body,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(people => {
        if (concat_results) {
          dispatch(saveAutoCompletePeopleConcatResults(people))
        } else {
          dispatch(saveAutoCompletePeople(people))
        }
      }).catch(error => console.log(error))
  }
}


// WORD CLOUD:
const requestWordCloud = () => ({
  type: request_word_cloud
})

const saveWordCloud = (data) => ({
  type: save_word_cloud,
  data: data,
})

export function fetchWordCloud(query, filters) {
  return dispatch => {
    dispatch(requestWordCloud());
    let url = `http://${process.env.REACT_APP_API_HOST}:8004/api/search/word_cloud/crimes`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(cloud => {
        dispatch(saveWordCloud(cloud))
      }).catch(error => console.log(error))
  }
}


// search attachments present in department:
const loadDepartmentAttachments = () => ({
  type: request_forms
})

const saveDepartmentAttachments = (data) => ({
  type: save_forms,
  data: data,
})


export function searchDepartmentAttachments(search_query, department_id, from, size) {
  return (dispatch) => {
    dispatch(loadDepartmentAttachments());
    let body = {
      "search_query": search_query,
      "department_id": department_id,
      "from": from,
      "size": size
    }
    console.log("called here forms", search_query, department_id)
    let url = `http://${process.env.REACT_APP_API_HOST}:8004/api/search/forms/search`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => {
        // console.log("from submit actions dispatch")
        dispatch(saveDepartmentAttachments(data))
      }).catch(error => console.log(error))
  }
}



// CRIMES:

const requestCrimes = () => ({
  type: request_crimes
})

const saveCrimes = (data,skip) => ({
  type: save_crimes,
  data: data,
  skip:skip
})


export function searchCrimes(query, filters, from, size) {
  return dispatch => {
    dispatch(requestCrimes());
    let url = `http://${process.env.REACT_APP_API_HOST}:8004/api/search/crimes`
    let body = JSON.stringify({
      search_query: query,
      filters,
      from: from,
      size: size
    })
    fetch(url, {
      method: "POST",
      body: body,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(crimes => {
        dispatch(saveCrimes(crimes,from))
      }).catch(error => console.log(error))
  }
}

// ALL :
// CRIMES:
// Departments :
// AllPosts:

const requestPosts = () => ({
  type: request_posts
})

const savePosts = (data,skip) => ({
  type: save_posts,
  data: data,
  skip
})

export function searchPosts(query, filters, from, size) {

  return dispatch => {
    dispatch(requestPosts());
    let url = `http://${process.env.REACT_APP_API_HOST}:8004/api/search/department_details/find/post`
    let body = JSON.stringify({
      search_query: query,
      from: from,
      size: size
    })
    fetch(url, {
      method: "POST",
      body: body,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(people => {
        dispatch(savePosts(people,from))
      }).catch(error => console.log(error))
  }
}


const requestAutoCompletePosts = () => ({
  type: request_autocomplete_posts
})

const saveAutoCompletePosts = (data) => ({
  type: save_autocomplete_posts,
  data: data,
})

const saveAutoCompletePostsConcatResults = (data) => ({
  type: save_autocomplete_posts_concat_results,
  data: data,
})

const clearAutocompletePostResults = (data) => ({
  type: clear_autocomplete_posts_results,
  data: data,
})



export function searchAutoCompletePosts(query, filters, concat_results, from, size) {
  console.log("concat_results", concat_results)
  return dispatch => {
    dispatch(requestAutoCompletePosts());
    // if(!concat_results) {dispatch(clearAutocompleteResults())}
    let url = `http://${process.env.REACT_APP_API_HOST}:8004/api/search/department_details/autocomplete/post`
    let body = JSON.stringify({
      search_query: query,
      from: from,
      size: size
    })
    fetch(url, {
      method: "POST",
      body: body,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(people => {
        if (concat_results) {
          dispatch(saveAutoCompletePostsConcatResults(people))
        } else {
          dispatch(saveAutoCompletePosts(people))
        }
      }).catch(error => console.log(error))
  }
}


export const requestBookmarkPosts = () => ({
  type: request_bookmark_posts
})

export const saveBookmarkPosts = (data) => ({
  type: save_bookmark_posts,
  data: data,
})

export function fetchBookmarkedPosts(user_id) {
  return dispatch => {
    dispatch(requestBookmarkPosts());
    let url = `http://${process.env.REACT_APP_API_HOST}:8004/api/user/department/bookmarked_posts/${user_id}`
    fetch(url, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(people => {
        dispatch(saveBookmarkPosts(people))
      }).catch(error => console.log(error))
  }
}

export const requestAddBookmarkPosts = () => ({
  type: request_add_bookmarked_post
})

export const saveAddBookmarkPosts = (data) => ({
  type: save_add_bookmarked_post,
  data: data,
})

export function fetchAddBookmarkedPosts(user_id, post_id) {
  //will save in redux and in backend as well
  return dispatch => {
    dispatch(requestAddBookmarkPosts());
    let url = `http://${process.env.REACT_APP_API_HOST}:8004/api/user/department/add_bookmarked_posts/${user_id}/${post_id}`
    fetch(url, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(people => {
        dispatch(saveAddBookmarkPosts(people))
      }).catch(error => console.log(error))
  }
}

// Speeches:

const requestSpeeches = () => ({
  type: request_speeches
})

const saveSpeeches = (data,skip) => ({
  type: save_speeches,
  data: data,
  skip
})

export function searchSpeeches(query, filters, from, size) {

  return dispatch => {
    dispatch(requestSpeeches());
    let url = `http://${process.env.REACT_APP_API_HOST}:8004/api/search/department_details/find/speeches`
    let body = JSON.stringify({
      search_query: query,
      from: from,
      size: size
    })
    fetch(url, {
      method: "POST",
      body: body,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(people => {
        dispatch(saveSpeeches(people,from))
      }).catch(error => console.log(error))
  }
}


const requestAutoCompleteSpeeches = () => ({
  type: request_autocomplete_speeches
})

const saveAutoCompleteSpeeches = (data) => ({
  type: save_autocomplete_speeches,
  data: data,
})

const saveAutoCompleteSpeechesConcatResults = (data) => ({
  type: save_autocomplete_speeches_concat_results,
  data: data,
})

const clearAutocompleteSpeechesResults = (data) => ({
  type: clear_autocomplete_speeches_results,
  data: data,
})



export function searchAutoCompleteSpeeches(query, filters, concat_results, from, size) {
  console.log("concat_results", concat_results)
  return dispatch => {
    dispatch(requestAutoCompleteSpeeches());
    // if(!concat_results) {dispatch(clearAutocompleteResults())}
    let url = `http://${process.env.REACT_APP_API_HOST}:8004/api/search/department_details/autocomplete/speeches`
    let body = JSON.stringify({
      search_query: query,
      from: from,
      size: size
    })
    fetch(url, {
      method: "POST",
      body: body,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(people => {
        if (concat_results) {
          dispatch(saveAutoCompleteSpeechesConcatResults(people))
        } else {
          dispatch(saveAutoCompleteSpeeches(people))
        }
      }).catch(error => console.log(error))
  }
}


// Vacancies:

// Speeches:

const requestVacancies = () => ({
  type: request_vacancies
})

const saveVacancies = (data,skip) => ({
  type: save_vacancies,
  data: data,
  skip
})

export function searchVacancies(query, filters, from, size) {

  return dispatch => {
    dispatch(requestVacancies());
    let url = `http://${process.env.REACT_APP_API_HOST}:8004/api/search/department_details/find/vacancies`
    let body = JSON.stringify({
      search_query: query,
      from: from,
      size: size
    })
    fetch(url, {
      method: "POST",
      body: body,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(people => {
        dispatch(saveVacancies(people,from))
      }).catch(error => console.log(error))
  }
}

//change the query keyword:

export const changeSearchAllQueryKeyword = (query) => ({
  type: change_search_query_keyword,
  data: query
})