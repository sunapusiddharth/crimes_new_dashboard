import {combineReducers} from 'redux';
import dashboardReducer from './dashboardReducer'
import departmentReducer from './departmentReducer'
import searchReducer from './searchReducer'
import peopleReducer from './peopleReducer'
import crimeReducer from './crimeReducer'
import cdeReducer from './cdeReducer'
import tableReducer from './tableReducer'
import crimeNewsReducer from './crimeNewsReducer'
import formReducer from './formReducer'
import contactUsReducer from './contactUsReducer'


export default combineReducers({
    dashboardReducer,
    departmentReducer,
    searchReducer,
    peopleReducer,
    crimeReducer,
    cdeReducer,
    tableReducer,
    crimeNewsReducer,
    formReducer,
    contactUsReducer
});