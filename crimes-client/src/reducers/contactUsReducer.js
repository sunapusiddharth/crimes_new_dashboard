import {
    start_saving, end_saving
} from './../actions/contactUsActions';

const initState = {
    saved_success: '',
    saved_error_message: '',
    saving_start: false,
}

const contactUsReducer = (state = initState, action) => {
    switch (action.type) {
        case start_saving:
            return {
                ...state, saving_start: true
            }
        case end_saving:
                if(action.data && Object.keys(action.data)){
                    if(Object.keys(action.data) == 'success'){
                        return {...state,saving_start: false,saved_success:"Your data has been saved successfully"}
                    }else{
                        return {...state,saving_start: false,saved_error_message:`Your data was not able to be  saved successfully Reason - ${action.data}`}
                    }
                }
        default:
            return { ...state }
    }
}

export default contactUsReducer;

