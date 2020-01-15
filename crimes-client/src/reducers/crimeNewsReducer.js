import {
    load_crime_aggregated, save_crime_aggregated,
    load_crime_news, save_crime_news,
    load_single_crime_news, save_single_crime_news,
    load_crime_news_search, save_crime_news_search,
    clear_search_results_before_new_search,

} from './../actions/crimeNewsActions';

const initState = {
    crimes_aggregated: [],
    crimes_aggregated_loading: false,
    crimes: [],
    crimes_loading: false,
    single_crime: [],
    total_crimes: 0,
    single_crime_loading: false,
    crime_news_search_results: [],
    crime_news_search_results_loading: false,
    crime_news_search_results_total:0,
    offset_crime_news:0,
    search_crime_news_results_raw:{},
}

const crimeNewsReducer = (state = initState, action) => {
    switch (action.type) {
        case load_crime_aggregated:
            return {
                ...state, crimes_aggregated_loading: true
            }
        case save_crime_aggregated:
            return {
                ...state,
                crimes_aggregated_loading: false,
                crimes_aggregated: action.data
            }

        case load_crime_news:
            return {
                ...state, crimes_loading: true
            }
        case save_crime_news:
            // debugger
            return {
                ...state,
                crimes_loading: false,
                crimes: action.data && action.data.length && action.data[0].paginatedResults && action.data[0].paginatedResults,
                total_crimes: action.data && action.data.length && action.data[0].totalCount && action.data[0].totalCount[0].count
            }

        case load_single_crime_news:
            return {
                ...state, single_crime_loading: true
            }
        case save_single_crime_news:
            return {
                ...state,
                single_crime_loading: false,
                single_crime: action.data
            }

        case load_crime_news_search:
            return {
                ...state, crime_news_search_results_loading: true
            }

        case clear_search_results_before_new_search:
        return {
            ...state, crime_news_search_results:[]
        }
        case save_crime_news_search:
            return {
                ...state,
                crime_news_search_results_loading: false,
                crime_news_search_results: state.crime_news_search_results.concat(action.data && action.data.hits && action.data.hits.hits && action.data.hits.hits),
                crime_news_search_results_total: action.data && action.data.hits && action.data.hits.total && action.data.hits.total.value,
                offset_crime_news: action.skip,
                search_crime_news_results_raw:action.data
            }
        default:
            return { ...state }
    }
}

export default crimeNewsReducer;

