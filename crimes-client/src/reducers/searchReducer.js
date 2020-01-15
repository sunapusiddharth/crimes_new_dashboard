import {
    request_people, save_people, request_word_cloud,
    save_word_cloud, request_forms, save_forms,
    request_crimes, save_crimes,
    request_autocomplete_people, save_autocomplete_people,
    save_autocomplete_people_concat_results,
    clear_autocomplete_people_results,
    request_posts, save_posts,
    save_autocomplete_posts_concat_results, save_autocomplete_posts,
    clear_autocomplete_posts_results,
    request_autocomplete_posts,
    request_bookmark_posts, save_bookmark_posts,
    request_add_bookmarked_post, save_add_bookmarked_post,
    request_speeches, save_speeches,
    request_autocomplete_speeches, save_autocomplete_speeches,
    save_autocomplete_speeches_concat_results,
    clear_autocomplete_speeches_results,
    request_vacancies, save_vacancies,
    change_search_query_keyword

} from './../actions/searchActions';

const initState = {
    people: {},
    search_loading: false,
    word_cloud: {},
    word_cloud_loading: false,
    forms: [],
    forms_loading: false,
    total_forms: 0,
    crimes: [],
    crimes_loading: false,
    total_crimes: 0,
    offset_crimes: 0,
    all_search_data: [],
    all_search_data_loading: false,
    autocomplete_people: [],
    total_people: 0,
    posts_loading: false,
    posts: {},
    total_posts: 0,
    offset_posts: 0,
    autocomplete_posts: [],
    bookmarked_posts: [],
    bookmark_post_success: false,
    bookmark_post_loading: false,
    add_bookmark_post_loading: false,
    speeches_loading: false,
    speeches: {},
    total_speeches: 0,
    offset_speeches: 0,
    autocomplete_speeches: [],
    vacancies_loading: false,
    vacancies: {},
    total_vacancies: 0,
    offset_vacancies: 0,
    query_word: '',
    // all the searcvh resullts raw response which helps in calculating the max=-score :
    crimes_results_raw:{},
    // people_results_raw:{},
    
}

const searchReducer = (state = initState, action) => {
    switch (action.type) {
        case request_people:
            return {
                ...state, search_loading: true
            }
        case save_people:
            return {
                ...state,
                search_loading: false,
                people: action.data,
                total_people: action.data && action.data.hits && action.data.hits.total && action.data.hits.total.value
            }
        case request_word_cloud:
            return {
                ...state, word_cloud_loading: true
            }
        case save_word_cloud:
            return {
                ...state,
                word_cloud_loading: false,
                word_cloud: action.data
            }
        case request_forms:
            return {
                ...state,
                forms_loading: true,
            }
        case save_forms:
            if (action.data && action.data.hits && action.data.hits.total && action.data.hits.hits) {
                return {
                    ...state,
                    forms_loading: false,
                    forms: action.data.hits.hits,
                    total_forms: action.data.hits.total.value
                }
            } else {
                return { ...state }
            }
        case request_crimes:
            return {
                ...state,
                crimes_loading: true,
            }
        case save_crimes:
            if (action.data && action.data.hits && action.data.hits.total && action.data.hits.hits) {
                return {
                    ...state,
                    crimes_loading: false,
                    crimes: action.data.hits.hits,
                    total_crimes: action.data.hits.total.value,
                    offset_crimes: action.skip,
                    crimes_results_raw:action.data
                }
            } else {
                return { ...state }
            }

        // case request_combined_data:
        //     return {
        //         ...state,
        //         all_search_data_loading: true,
        //     }
        // case save_combined_data:
        //     // debugger;
        //     //logic to create random results effect put all the elemnts in single array and then create a random effect
        //     let combined_array = []

        //     if (action.data[0] && action.data[0].hits && action.data[0].hits.hits) {
        //         if (action.data[1] && action.data[1].hits && action.data[1].hits.hits) {
        //             combined_array = action.data[0].hits.hits.concat(action.data[1].hits.hits)
        //         } else {
        //             combined_array = action.data[0].hits.hits
        //         }
        //     } else {
        //         combined_array = action.data[1].hits.hits
        //     }
        //     return {
        //         ...state,
        //         all_search_data_loading: false,
        //         all_search_data: combined_array,
        //     }

        case request_autocomplete_people:
            return {
                ...state, search_loading: true
            }
        case save_autocomplete_people:
            let autocomplete_results = []
            autocomplete_results = action.data && action.data.hits && action.data.hits.hits
            return {
                ...state,
                search_loading: false,
                autocomplete_people: autocomplete_results, search_loading: false
            }
        case save_autocomplete_people_concat_results:
            let autocomplete_results_concat = []
            autocomplete_results_concat = action.data && action.data.hits && action.data.hits.hits
            // debugger
            return {
                ...state,
                search_loading: false,
                autocomplete_people: state.autocomplete_people.concat(autocomplete_results_concat), search_loading: false
            }

        case clear_autocomplete_people_results:
            return {
                ...state,
                autocomplete_people: []
            }
        case request_posts:
            return {
                ...state, posts_loading: true
            }
        case save_posts:
            return {
                ...state,
                posts_loading: false,
                posts: action.data,
                total_posts: action.data && action.data.hits && action.data.hits.total && action.data.hits.total.value,
                offset_posts: action.skip
            }
        case request_autocomplete_posts:
            return {
                ...state, search_loading: true
            }
        case save_autocomplete_posts:
            autocomplete_results = []
            autocomplete_results = action.data && action.data.hits && action.data.hits.hits
            return {
                ...state,
                posts_loading: false,
                autocomplete_people: autocomplete_results
            }
        case save_autocomplete_posts_concat_results:
            autocomplete_results_concat = []
            autocomplete_results_concat = action.data && action.data.hits && action.data.hits.hits
            // debugger
            return {
                ...state,
                posts_loading: false,
                autocomplete_posts: state.autocomplete_posts.concat(autocomplete_results_concat),
            }

        case clear_autocomplete_posts_results:
            return {
                ...state,
                autocomplete_people: []
            }

        case request_bookmark_posts:
            return {
                ...state,
                bookmark_post_loading: false
            }

        case save_bookmark_posts:
            return {
                ...state,
                bookmark_post_loading: true,
                bookmarked_posts: action.data,
            }

        case request_add_bookmarked_post:
            return {
                ...state,
                add_bookmark_post_loading: true,
            }

        case save_add_bookmarked_post:
            return {
                ...state,
                bookmark_post_loading: true,
                bookmarked_posts: state.bookmarked_posts.concat(action.data),
            }
        //speeches:
        case request_speeches:
            return {
                ...state, speeches_loading: true
            }
        case save_speeches:
            return {
                ...state,
                speeches_loading: false,
                speeches: action.data,
                total_speeches: action.data && action.data.hits && action.data.hits.total && action.data.hits.total.value,
                offset_speeches: action.skip
            }
        case request_autocomplete_speeches:
            return {
                ...state, speeches_loading: true
            }
        case save_autocomplete_speeches:
            autocomplete_results = []
            autocomplete_results = action.data && action.data.hits && action.data.hits.hits
            return {
                ...state,
                speeches_loading: false,
                autocomplete_speeches: autocomplete_results
            }
        case save_autocomplete_speeches_concat_results:
            autocomplete_results_concat = []
            autocomplete_results_concat = action.data && action.data.hits && action.data.hits.hits
            // debugger
            return {
                ...state,
                posts_loading: false,
                autocomplete_speeches: state.autocomplete_posts.concat(autocomplete_results_concat),
            }

        case clear_autocomplete_speeches_results:
            return {
                ...state,
                autocomplete_speeches: []
            }
        //speeches:
        case request_vacancies:
            return {
                ...state, vacancies_loading: true
            }
        case save_vacancies:
            return {
                ...state,
                vacancies_loading: false,
                vacancies: action.data,
                total_vacancies: action.data && action.data.hits && action.data.hits.total && action.data.hits.total.value,
                offset_vacancies: action.skip
            }
            // Change the query word for search_all
        case change_search_query_keyword:
            return {
                ...state,
                query_word: action.data,
            }
        default:
            return { ...state }
    }
}

export default searchReducer;

