import {
    load_department_filters,
    save_department_filters,
    save_selected_filters,
    load_search_results,
    save_search_results,
    load_department,
    save_department,
    load_department_without_details, save_department_without_details,
    load_all_posts,
    save_all_posts,
    load_individual_posts,
    save_individual_posts,
    load_all_departmenst,
    save_all_departments,
    FILTERS_CHANGE,
    clear_department_search_results_before_new_search,
    load_all_speeches, save_all_speeches,
    load_all_vacancies, save_all_vacancies,
    load_individual_vacancy, save_individual_vacancy,
    load_individual_speech, save_individual_speech,
    save_dept_blog_likes_count, add_comment

} from './../actions/departmentActions';

const initState = {
    filters_data_loading: false,
    filters_data: [],
    city: [],
    state: [],
    organization: [],
    domain_types: [],
    search_results_loading: false,
    search_results: [],
    department_search_results_total: 0,
    department_loading: false,
    department: {},
    department_loading_without_details: false,
    department_without_details: {},
    department_details: {},
    posts: [],
    post_add_comment_status: false,
    all_posts_loading: false,
    post: [],
    post_comments: [],
    post_loading: false,
    total_posts: 0,
    all_departments: [],
    all_departments_loading: false,
    all_departments_total: 0,
    selected_organization: '',
    selected_state: '',
    selected_domain_type: '',
    selected_city: '',
    search_aggs: {},
    speeches: [],
    all_speeches_loading: false,
    total_speeches: 0,
    vacancies: [],
    all_vacancies_loading: false,
    total_vacancies: 0,
    vacancy: {},
    loading_vacancy: false,
    speech: {},
    loading_speech: false,
    search_departments_results_raw:{},

}

const departmentReducer = (state = initState, action) => {
    switch (action.type) {
        case FILTERS_CHANGE:
            // debugger
            let type = action.payload && Object.keys(action.payload)
            let filter_value = action.payload && Object.values(action.payload)
            // state[type] = value // not using this line since though it updates redux but doesn't call selectors
            if (type == 'selected_state') {
                return { ...state, selected_state: filter_value }
            } else if (type == 'selected_city') {
                return { ...state, selected_city: filter_value }
            } else if (type == 'selected_domain_type') {
                return { ...state, selected_domain_type: filter_value }
            } else if (type == 'selected_organization') {
                return { ...state, selected_organization: filter_value }
            }
        case load_department_filters:
            return {
                ...state, filters_data_loading: true
            }
        case save_department_filters:
            return {
                ...state,
                filters_data_loading: false,
                filters_data: action.data
            }
        case save_selected_filters:
            let { filter, value } = action.data
            return {
                ...state,
                [filter]: [
                    ...state[filter],
                    value
                ]
            }
        case load_search_results:
            return { ...state, search_results_loading: true }
        case save_search_results:
            return {
                ...state, search_results_loading: false,
                search_results: state.search_results.concat(action.data && action.data.hits && action.data.hits.hits),
                search_aggs: action.data && action.data.aggregations && action.data.aggregations,
                department_search_results_total: action.data && action.data.hits && action.data.hits.total && action.data.hits.total.value,
                search_departments_results_raw:action.data
            }
        case clear_department_search_results_before_new_search:
            return {
                ...state, search_results: []
            }
        case load_department:
            return { ...state, department_loading: true }
        case save_department:
            let department = action.data.slice(0, 1)[0]
            let department_details = action.data.slice([1, action.data.length])
            return { ...state, department_loading: false, department, department_details }
        case load_department_without_details:
            return { ...state, department_loading_without_details: true }
        case save_department_without_details:
            return { ...state, department_loading_without_details: false, department_without_details: action.data }
        case load_all_posts:
            return { ...state, all_posts_loading: true }
        case save_all_posts:
            return { ...state, all_posts_loading: false, posts: action.data.results, total_posts: action.data.metadata.resultset.count }
        case load_individual_posts:
            return { ...state, post_loading: true }
        case save_individual_posts:
            //need to form a heirarchial way of data for comments.
            return { ...state, post_loading: false, post: action.data[0], post_comments: action.data[1] }
        case load_all_departmenst:
            return { ...state, all_departments_loading: true }
        case save_all_departments:
            return {
                ...state, all_departments_loading: false,
                city: action.data && action.data[0] && action.data[0].cities,
                state: action.data && action.data[1] && action.data[1].states,
                organization: action.data && action.data[2] && action.data[2].organizations,
                domain_types: action.data && action.data[3] && action.data[3].domain_types,
                all_departments: action.data && action.data[4] && action.data[4].departments,
                all_departments_total: action.data && action.data[5] && action.data[5].total_records
            }
        case load_all_speeches:
            return { ...state, all_speeches_loading: true }
        case save_all_speeches:
            return { ...state, all_speeches_loading: false, speeches: action.data.results, total_speeches: action.data.metadata.resultset.count }
        case load_all_vacancies:
            return { ...state, all_vacancies_loading: true }
        case save_all_vacancies:
            return { ...state, all_vacancies_loading: false, vacancies: action.data.results, total_vacancies: action.data.metadata.resultset.count }
        case load_individual_vacancy:
            return { ...state, loading_vacancy: true }
        case save_individual_vacancy:
            return { ...state, loading_vacancy: false, vacancy: action.data }
        case load_individual_speech:
            return { ...state, loading_speech: true }
        case save_individual_speech:
            return { ...state, loading_speech: false, speech: action.data }
        case save_dept_blog_likes_count:
            
            //should change the post object
            return { ...state, loading_speech: false, speech: action.data }
        case add_comment:
            
            if (action.data == 'error') {
                return { ...state, post_add_comment_status: "error" }
            }
            var new_post_comments = state.post_comments
            if (action.data && action.data.parent_id) {
                let newComments = runRecursive(new_post_comments,action.data)
            } else {
                new_post_comments.push(action.data)
            }
            return { ...state, post_comments: [...new_post_comments],post_add_comment_status: "success " }
        default:
            return { ...state }
    }
}

export default departmentReducer;

// Helpers:
function runRecursive(input,new_comment) {
    for (var i = 0, l = input.length; i < l; i++) {
        if(input[i].full_slug == new_comment.parent_id){
            if(typeof input[i]['comment'] == 'undefined'){
                input[i]['comment'] = []
            }
            input[i]['comment'].push(new_comment)
            return input
            break
        }
        if (input[i].comment && input[i].comment.length > 0) {
            runRecursive(input[i].comment,new_comment);
        };
    };
};

