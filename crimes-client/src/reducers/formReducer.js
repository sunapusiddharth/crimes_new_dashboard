import {
    save_crime_media_values,
    save_crime_summary_values,
    save_crime_peple_values,
    delete_crime_peple_values,
    start_saving, end_saving,
    save_department_blog_values
} from '../actions/formActions';

const initState = {
    address: '',
    category: '',
    description: '',
    district: '',
    file: null,
    incident_number: '',
    occurence_on_date: '',
    offense_code: '',
    offense_code_group: '',
    offense_description: '',
    reporting_area: '',
    schooting: 0,
    street: '',
    title: '',
    ucr_part: 0,
    crime_files: null,
    audios: null,
    videos: null,
    photos: null,
    victim: [],
    accussed: [],
    suspect: [],
    judge: [],
    law: [],
    start_save_loading: false,
    start_save_response: ""
}

const formReducer = (state = initState, action) => {
    switch (action.type) {
        case save_crime_summary_values:
            let data = action.data
            return {
                ...state, address: data.address, category: data.category, description: data.description,
                district: data.district, file: data.file, incident_number: data.incident_number,
                occurence_on_date: data.occurence_on_date, offense_code: data.offense_code, offense_code_group: data.offense_code_group,
                offense_description: data.offense_description, reporting_area: data.reporting_area, schooting: data.schooting,
                street: data.street, title: data.title, ucr_part: data.ucr_part
            }
        case save_crime_media_values:
            // debugger

            console.log("form_crime_reducer_values_step1", action.data.file)
            return {
                ...state, crime_files: action.data.crime_files, audios: action.data.audios, videos: action.data.videos, photos: action.data.photos
            }

        case save_crime_peple_values:
            if (Object.keys(action.data)[0] == 'victim') {
                return { ...state, victim: state.victim.concat(Object.values(action.data)[0]) }
            } else if (Object.keys(action.data)[0] == 'accussed') {
                return { ...state, accussed: state.accussed.concat(Object.values(action.data)[0]) }
            } else if (Object.keys(action.data)[0] == 'suspect') {
                return { ...state, suspect: state.suspect.concat(Object.values(action.data)[0]) }
            } else if (Object.keys(action.data)[0] == 'law') {
                return { ...state, law: state.law.concat(Object.values(action.data)[0]) }
            } else {
                return { ...state, judge: state.judge.concat(Object.values(action.data)[0]) }
            }
        case delete_crime_peple_values:
            // debugger
            if (action.data[0] == 'victim') {
                return { ...state, victim: state.victim.filter(item => item._id !== action.data[1]._id) }
            } else if (action.data[0] == 'accussed') {
                return { ...state, accussed: state.accussed.filter(item => item._id !== action.data[1]._id) }
            } else if (action.data[0] == 'suspect') {
                return { ...state, suspect: state.suspect.filter(item => item._id !== action.data[1]._id) }
            } else if (action.data[0] == 'law') {
                return { ...state, law: state.law.filter(item => item._id !== action.data[1]._id) }
            } else {
                return { ...state, judge: state.judge.filter(item => item._id !== action.data[1]._id) }
            }
        case start_saving:
            return { ...state, start_save_loading: true }
        case end_saving:
            return { ...state, start_save_loading: false, start_save_response: action.data }
       
        default:
            return { ...state }
    }
}

export default formReducer

