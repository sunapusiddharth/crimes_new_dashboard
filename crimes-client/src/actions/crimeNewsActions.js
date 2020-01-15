export const load_crime_aggregated = 'load_crime_aggregated';
export const save_crime_aggregated = 'save_crime_aggregated';
export const load_crime_news = 'load_crime_news';
export const save_crime_news = 'save_crime_news';
export const save_single_crime_news = 'save_single_crime_news';
export const load_single_crime_news = 'load_single_crime_news';
export const load_crime_news_search = 'load_crime_news_search'
export const save_crime_news_search = 'save_crime_news_search'
export const clear_search_results_before_new_search = 'clear_search_results_before_new_search'



const loadCrimeAggregated = () => ({
  type: load_crime_aggregated
})

const saveCrimeAggregated = (data) => ({
  type: save_crime_aggregated,
  data: data,
})

export function fetchCrimeAggregated() {
  return dispatch => {
    dispatch(loadCrimeAggregated());
    let url = 'http://localhost:8004/backend/api/crime_news/crimes_aggregated';
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        dispatch(saveCrimeAggregated(data))
      }).catch(error => console.log(error))
  }
}

// Crime News

const loadCrimeNews = () => ({
    type: load_crime_news
  })
  
  const saveCrimeNews = (data) => ({
    type: save_crime_news,
    data: data,
  })
  
  export function fetchCrimeNews(skip,limit) {
    return dispatch => {
      dispatch(loadCrimeNews());
      let url = 'http://localhost:8004/backend/api/crime_news/crimes';
      fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            skip:skip,
            limit:limit
        })
      })
        .then(response => response.json())
        .then(data => {
          dispatch(saveCrimeNews(data))
        }).catch(error => console.log(error))
    }
  }

  
// Single Crime News

const loadSingleCrimeNews = () => ({
    type: load_single_crime_news
  })
  
  const saveSingleCrimeNews = (data) => ({
    type: save_single_crime_news,
    data: data,
  })
  
  export function fetchSingleCrimeNews(crime_id) {
    return dispatch => {
      dispatch(loadSingleCrimeNews());
      let url = 'http://localhost:8004/backend/api/crime_news/crimes/'+crime_id;
      fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          dispatch(saveSingleCrimeNews(data))
        }).catch(error => console.log(error))
    }
  }

  
const loadCrimeNewsSearch = () => ({
  type: load_crime_news_search
})

const saveCrimeNewsSearch = (data,skip) => ({
  type: save_crime_news_search,
  data: data,
  skip:skip
})

const clearCrimeNewsSearch = (data) => ({
  type: clear_search_results_before_new_search,
  data: data,
})

export function fetchCrimeNewsSearch(search_query,from,size,clear_results) {
  return dispatch => {
    if(clear_results) dispatch(clearCrimeNewsSearch())
    dispatch(loadCrimeNewsSearch())
    let url = 'http://localhost:8004/backend/api/search/crime_news'
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        from,
        size,
        search_query
      })
    })
      .then(response => response.json())
      .then(data => {
        dispatch(saveCrimeNewsSearch(data,from))
      }).catch(error => console.log(error))
  }
}