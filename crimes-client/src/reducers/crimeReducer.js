import {
    load_crime, save_crime,
    load_paginated_crime, save_paginated_crime,
    save_latest_crime, load_latest_crime,
    load_crime_search, save_crime_search,
    clear_crime_search_results_before_new_search,
    load_nearby_crimes, save_nearby_crimes,
    save_facet_filters,
    clear_facet_filters,
    save_search_term
} from './../actions/crimeActions';

const initState = {
    crime: [],
    crime_loading: false,
    latest_crimes: [],
    latest_crimes_loadng: false,
    paginated_crimes: [],
    paginated_crimes_loading: false,
    paginated_crimes_total: 0,
    crime_incident_data: [],
    crime_incident_people_data: [],
    crime_incident_law_data: [],
    crime_incident_judge_data: [],
    crime_incident_suspects_data: [],
    crime_incident_victims_data: [],
    crime_incident_accussed_data: [],
    crime_search_results: [],
    crime_search_results_loading: false,
    crime_search_results_total: 0,
    crime_search_facets: {},
    nearby_crimes_loading: false,
    nearby_crimes: [],
    nearby_crimes_total: 0,
    nearby_crimes_buckets:{},
    // Facets: will be an array so that user can search multiple.
    category: [],
    selected_state: [],
    city: [],
    year: [],
    month: [],
    start_date: '',
    end_date: '',
    search_query: null
}

const crimeReducer = (state = initState, action) => {
    switch (action.type) {
        case load_crime:
            return {
                ...state, crime_loading: true
            }
        case save_crime:
            return {
                ...state,
                crime_loading: false,
                crime: action.data && action.data.length && action.data[0],
                crime_incident_data: action.data && action.data.length && action.data[0] && action.data[0].incident_data,
                crime_incident_people_data: action.data && action.data.length && action.data[0] && action.data[0].incident_data,
                crime_incident_law_data: action.data && action.data.length && action.data[0] && action.data[0].law,
                crime_incident_accussed_data: action.data && action.data.length && action.data[0] && action.data[0].accussed,
                crime_incident_judge_data: action.data && action.data.length && action.data[0] && action.data[0].judge,
                crime_incident_victims_data: action.data && action.data.length && action.data[0] && action.data[0].victims,
                crime_incident_suspects_data: action.data && action.data.length && action.data[0] && action.data[0].suspects
            }

        case load_latest_crime:
            return {
                ...state, latest_crimes_loadng: true
            }
        case save_latest_crime:
            return {
                ...state,
                latest_crimes_loadng: false,
                latest_crimes: action.data
            }

        case load_paginated_crime:
            return {
                ...state, paginated_crimes_loading: true
            }
        case save_paginated_crime:
            // debugger
            return {
                ...state,
                paginated_crimes_loading: false,
                paginated_crimes: action.data && action.data[0] && action.data[0].paginatedResults,
                paginated_crimes_total: action.data && action.data[0] && action.data[0].totalCount[0].count,
            }


        case load_crime_search:
            return {
                ...state, crime_search_results_loading: true
            }

        case clear_crime_search_results_before_new_search:
            return {
                ...state, crime_search_results: []
            }
        case save_crime_search:
            return {
                ...state,
                crime_search_results_loading: false,
                crime_search_results: state.crime_search_results.concat(action.data && action.data.hits && action.data.hits.hits && action.data.hits.hits),
                crime_search_facets: action.data && action.data.aggregations,
                crime_search_results_total: action.data && action.data.hits && action.data.hits.total && action.data.hits.total.value
            }

        case load_nearby_crimes:
            return {
                ...state, nearby_crimes_loading: true
            }
        case save_nearby_crimes:
            return {
                ...state,
                nearby_crimes_loading: false,
                nearby_crimes:action.data && action.data.hits && action.data.hits.hits,
                nearby_crimes_total: action.data && action.data.hits && action.data.hits.total && action.data.hits.total.value,
                nearby_crimes_buckets: action.data.aggregations && action.data.aggregations.crimes_around &&action.data.aggregations.crimes_around.buckets 
            }

        case save_facet_filters:
            if (Object.keys(action.data)[0] == 'category') {
                return { ...state, category: action.data.category }
            } else if (Object.keys(action.data)[0] == 'city') {
                return { ...state, city: action.data.city }
            } else if (Object.keys(action.data)[0] == 'selected_state') {
                return { ...state, selected_state: action.data.selected_state }
            } else if (Object.keys(action.data)[0] == 'start_date') {
                return { ...state, start_date: action.data.start_date }
            } else if (Object.keys(action.data)[0] == 'end_date') {
                return { ...state, end_date: action.data.end_date }
            }
        case save_search_term:
            return {
                ...state, search_query: action.data
            }
        case clear_facet_filters:
            //reset the filters.
            return {
                ...state, start_date:'',end_date:'',category:'',city:'',state:'',selected_state:''
            }
        default:
            return { ...state }
    }
}

export default crimeReducer;

