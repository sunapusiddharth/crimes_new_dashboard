import {
    load_boston_crimes, save_boston_crimes,
    load_denver_crimes, save_denver_crimes,
    load_vancouver_crimes, save_vancouver_crimes
} from './../actions/tableActions';

const initState = {
    boston_crimes_data: [],
    boston_crimes_loading: false,
    boston_crimes_sorting: false,
    boston_crimes_row_limit: 20,
    boston_crimes_pages: null,
    boston_crimes_current_page: 0,

    denver_crimes_data: [],
    denver_crimes_loading: false,
    denver_crimes_sorting: false,
    denver_crimes_row_limit: 20,
    denver_crimes_pages: null,
    denver_crimes_current_page: 0,

    vancouver_crimes_data: [],
    vancouver_crimes_loading: false,
    vancouver_crimes_sorting: false,
    vancouver_crimes_row_limit: 20,
    vancouver_crimes_pages: null,
    vancouver_crimes_current_page: 0,
}

const tableReducer = (state = initState, action) => {
    switch (action.type) {
        case load_boston_crimes:
            // debugger
            console.log("action_data=", action.data)
            return {
                ...state, boston_crimes_loading: true, boston_crimes_sorting: !state.boston_crimes_sorting,
                boston_crimes_row_limit: action.data.boston_crimes_row_limit,
                boston_crimes_current_page: action.data.boston_crimes_current_page
            }
        case save_boston_crimes:
            // debugger
            return {
                ...state,
                boston_crimes_loading: false,
                boston_crimes_data: action.data,
                boston_crimes_pages: Math.ceil(action.data[0].totalCount[0].count / state.boston_crimes_row_limit)
            }
        case load_denver_crimes:
            return {
                ...state, denver_crimes_loading: true, denver_crimes_sorting: !state.denver_crimes_sorting,
                denver_crimes_row_limit: action.data.denver_crimes_row_limit,
                denver_crimes_current_page: action.data.denver_crimes_current_page
            }
        case save_denver_crimes:
            return {
                ...state,
                denver_crimes_loading: false,
                denver_crimes_data: action.data,
                denver_crimes_pages: Math.ceil(action.data[0].totalCount[0].count / state.denver_crimes_row_limit)
            }

            case load_vancouver_crimes:
            return {
                ...state, vancouver_crimes_loading: true,
                // vancouver_crimes_sorting: !state.vancouver_crimes_sorting,
                // vancouver_crimes_row_limit: action.data.vancouver_crimes_row_limit,
                // vancouver_crimes_current_page: action.data.vancouver_crimes_current_page
            }
        case save_vancouver_crimes:
            debugger
            return {
                ...state,
                vancouver_crimes_loading: false,
                vancouver_crimes_data: action.data,
                // vancouver_crimes_pages: Math.ceil(action.data[0].totalCount[0].count / state.vancouver_crimes_row_limit)
            }

        default:
            return { ...state }
    }
}

export default tableReducer;

