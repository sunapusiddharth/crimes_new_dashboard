import moment from 'moment'
export const load_crime = 'load_crime'
export const save_crime = 'save_crime'
export const save_latest_crime = 'save_latest_crime'
export const load_latest_crime = 'load_latest_crime'
export const save_paginated_crime = 'save_paginated_crime'
export const load_paginated_crime = 'load_paginated_crime'
export const load_crime_search = 'load_crime_search'
export const save_crime_search = 'save_crime_search'
export const clear_crime_search_results_before_new_search = 'clear_crime_search_results_before_new_search'
export const load_nearby_crimes = 'load_nearby_crimes'
export const save_nearby_crimes = 'save_nearby_crimes'
export const save_facet_filters = 'save_facet_filters'
export const clear_facet_filters = 'clear_facet_filters'
export const save_search_term = 'save_search_term'


const loadCrime = () => ({
    type: load_crime
})

const saveCrime = (data) => ({
    type: save_crime,
    data: data,
})

export function fetchCrime(crime_id) {
    return (dispatch) => {
        dispatch(loadCrime());
        let url = `http://localhost:8004/backend/api/crime/${crime_id}`;
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(crime => {
                console.log("from submit actions dispatch crime", crime)
                dispatch(saveCrime(crime))
            }).catch(error => console.log(error))
    }
}

// latest crimes 

const loadLatesCrime = () => ({
    type: load_latest_crime
})

const saveLatestCrime = (data) => ({
    type: save_latest_crime,
    data: data,
})

export function fetchLatestCrime(crime_id) {
    return (dispatch) => {
        dispatch(loadLatesCrime());
        let url = `http://localhost:8004/backend/api/crimes/latest_crimes`;
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(crime => {
                dispatch(saveLatestCrime(crime))
            }).catch(error => console.log(error))
    }
}


// All Paginated crimes 

const loadPaginatedCrime = () => ({
    type: load_paginated_crime
})

const savePaginatedCrime = (data) => ({
    type: save_paginated_crime,
    data: data,
})

export function fetchPaginatedCrime(skip, limit) {
    return (dispatch) => {
        dispatch(loadPaginatedCrime());
        let url = `http://localhost:8004/backend/api/crimes/crimes`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "skip": skip,
                "limit": limit
            })
        })
            .then(response => response.json())
            .then(crime => {
                dispatch(savePaginatedCrime(crime))
            }).catch(error => console.log(error))
    }
}


// Search crimes 

const loadCrimeSearch = () => ({
    type: load_crime_search
})

const clearCrimeSearch = (data) => ({
    type: clear_crime_search_results_before_new_search,
    data: data,
})


const saveCrimeSearch = (data) => ({
    type: save_crime_search,
    data: data,
})


export function fetchCrimeSearch(search_query, from, size, clear_results) {
    return (dispatch, getState) => {
        let crimes_reducer = getState().crimeReducer
        let filters = []
        console.log("crime_reducer",crimes_reducer)
        if (crimes_reducer.category.length) {
            filters.push({
                "terms": {
                    "category": crimes_reducer.category
                }
            })
        }
        if (crimes_reducer.selected_state.length) {
            filters.push({
                "terms": {
                    "state": crimes_reducer.selected_state
                }
            })
        }
        if (crimes_reducer.city.length) {
            filters.push({
                "terms": {
                    "city": crimes_reducer.city
                }
            })
        }

        //date range ;
        if (crimes_reducer.start_date || crimes_reducer.end_date) {
            let current_date = new Date()
            let current_date_string = `${current_date.getFullYear()}-${("0" + (current_date.getMonth() + 1)).slice(-2)}-${("0" + current_date.getDate()).slice(-2)}`
            let past_10_years_date = moment(current_date).subtract(10, 'years').format('YYYY-MM-DD');
            filters.push({
                "range": {
                    "occurence_on_date":{
                        "gte":crimes_reducer.start_date? crimes_reducer.start_date:past_10_years_date,
                        "lte":crimes_reducer.end_date ?crimes_reducer.end_date:current_date_string
                    }
                }
                
            })
        }
        console.log("filter from search = ",filters)
        if (clear_results) dispatch(clearCrimeSearch())
        dispatch(loadCrimeSearch())
        if(!search_query){
            if(crimes_reducer.search_query){
                search_query = crimes_reducer.search_query
            }
        }
        search_query = search_query ? search_query:""
        let url = 'http://localhost:8004/backend/api/search/crimes'
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from,
                size,
                search_query:search_query,
                filters
            })
        })
            .then(response => response.json())
            .then(data => {
                dispatch(saveCrimeSearch(data))
            }).catch(error => console.log(error))
    }
}

//search nearby crimes :

const loadNearbyCrimes = () => ({
    type: load_nearby_crimes
})


const saveNearbyCrimes = (data) => ({
    type: save_nearby_crimes,
    data: data,
})


export function fetchNearbyCrimes(skip, limit) {
    return (dispatch, getState) => {
        let crimes_reducer = getState().crimeReducer
        let currently_loaded_crime = crimes_reducer.crime
        if (!currently_loaded_crime) dispatch(saveNearbyCrimes([]))
        let lat = currently_loaded_crime && currently_loaded_crime.loc && currently_loaded_crime.loc.coordinates && currently_loaded_crime.loc.coordinates[0]
        let lon = currently_loaded_crime && currently_loaded_crime.loc && currently_loaded_crime.loc.coordinates && currently_loaded_crime.loc.coordinates[1]
        dispatch(loadNearbyCrimes())
        let url = 'http://localhost:8004/backend/api/crime/nearby_crimes'
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                lat,
                lon,
                "skip": skip,
                "limit": limit
            })
        })
            .then(response => response.json())
            .then(data => {
                dispatch(saveNearbyCrimes(data))
            }).catch(error => console.log(error))
    }
}

//   saving facet filter values
export const saveFacetFilters = (data) => ({
    type: save_facet_filters,
    data: data,
})

export const clearFacetFilters = (data) => ({
    type: clear_facet_filters,
    data: data,
})

export const saveSearchTerm = (data) => ({
    type: save_search_term,
    data: data,
})

