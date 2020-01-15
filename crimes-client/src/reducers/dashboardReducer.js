import {
    load_table_data,
    save_table_data,
    load_incident_table_data,
    save_incident_table_data,
    load_incident_data,
    save_incident_data,
    load_incident_people_data,
    save_incident_people_data,
    load_recent_victims,
    save_recent_victims,
    load_create_victim,
    save_create_victim
} from '../actions/dashboardActions';

const initState = {
    dashboard_table_loading: false,
    dasboard_table_data: [],
    dashboard_incident_table_loading: false,
    dashboard_incident_table_data: [],
    offense_code_selected: 0,
    incident_data_loading: false,
    incident_data: [],
    incident_people_data_loading: false,
    incident_people_data: [],
    recent_victims:[],
    recent_victims_loading:false,
    create_victim_loading:false,
    create_victims:''
}

const dashboardReducer = (state = initState, action) => {
    switch (action.type) {
        case load_table_data:
            return {
                ...state,
                dashboard_table_loading: true
            }
        case save_table_data:
            return {
                ...state,
                dashboard_table_loading: false,
                dasboard_table_data: action.data
            }

        //incidents :
        case load_incident_table_data:
            return {
                ...state,
                dashboard_incident_table_loading: true
            }
        case save_incident_table_data:
            return {
                ...state,
                dashboard_incident_table_loading: false,
                dashboard_incident_table_data: action.data
            }
        //incident single 
        case load_incident_data:
            return {
                ...state,
                incident_data_loading: true
            }
        case save_incident_data:
            return {
                ...state,
                incident_data_loading: false,
                incident_data: action.data
            }
        //incident related people
        case load_incident_people_data:
            return {
                ...state,
                incident_people_data_loading: true
            }
        case save_incident_people_data:
            return {
                ...state,
                incident_people_data_loading: false,
                incident_people_data: action.data
            }

            // recent victims :
            case load_recent_victims:
            return {
                ...state,
                recent_victims_loading: true
            }
        case save_recent_victims:
            return {
                ...state,
                recent_victims_loading: false,
                recent_victims: action.data
            }
            // add new victims :
            case load_create_victim:
            return {
                ...state,
                create_victim_loading: true
            }
        case save_create_victim:
            return {
                ...state,
                create_victim_loading: false,
                create_victims: action.data
            }
        default:
            return {
                ...state
            }
    }
}

export default dashboardReducer;