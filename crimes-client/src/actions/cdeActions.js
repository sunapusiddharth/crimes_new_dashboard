
export const load_states = 'load_states';
export const save_states = 'save_states';
export const save_end_year_main = 'save_end_year_main';
export const save_start_year_main = 'save_start_year_main';
export const save_selected_state = 'save_selected_state';
export const load_crime_rates = 'load_crime_rates'
export const save_crime_rates = 'save_crime_rates'
export const load_victims_data = 'load_victims_data'
export const save_victims_data = 'save_victims_data'
export const load_offender_data = 'load_offender_data'
export const save_offender_data = 'save_offender_data'
export const load_victims_relationship = 'load_victims_relationship'
export const save_victims_relationship = 'save_victims_relationship'
export const load_property_stolen = 'load_property_stolen'
export const save_property_stolen = 'save_property_stolen'
export const load_property_recovered = 'load_property_recovered'
export const save_property_recovered = 'save_property_recovered'
export const save_arrests_national = 'save_arrests_national'
export const load_arrests_national = 'load_arrests_national'
export const load_arrests_national_drug = 'load_arrests_national_drug'
export const save_arrests_national_drug = 'save_arrests_national_drug'
export const load_arrests_national_juvenile = 'load_arrests_national_juvenile'
export const save_arrests_national_juvenile = 'save_arrests_national_juvenile'
export const load_arrests_national_adults = 'load_arrests_national_adults'
export const save_arrests_national_adults = 'save_arrests_national_adults'
export const load_pe_breakout = 'load_pe_breakout'
export const save_pe_breakout = 'save_pe_breakout'
export const load_pe_per_1000 = 'load_pe_per_1000'
export const save_pe_per_1000 = 'save_pe_per_1000'
export const save_offense_code = 'save_offense_code'
export const save_start_year_crime = 'save_start_year_crime'
export const save_end_year_crime = 'save_end_year_crime'
export const change_variable_key = 'change_variable_key'
export const load_estimated_crimes_heat_map = 'load_estimated_crimes_heat_map'
export const save_estimated_crimes_heat_map = 'save_estimated_crimes_heat_map'


const loadStates = () => ({
    type: load_states
})

const saveStates = (data) => ({
    type: save_states,
    data: data,
})

export function fetchStates(crime_id) {
    return (dispatch) => {
        dispatch(loadStates());
        let url = `http://${process.env.REACT_APP_API_HOST}:8007/api/lookup/states`;
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(states => {
                dispatch(saveStates(states))
            }).catch(error => console.log(error))
    }
}

// Filtersexport :
const saveStartYearMain = (data) => ({
    type: save_start_year_main,
    data: data,
})
const saveEndYearMain = (data) => ({
    type: save_end_year_main,
    data: data,
})

const saveStartYearCrime = (data) => ({
    type: save_start_year_crime,
    data: data,
})
const saveEndYearCrime = (data) => ({
    type: save_end_year_crime,
    data: data,
})

const saveSelectedState = (data) => ({
    type: save_selected_state,
    data: data,
})

export function changeStartYearMain(start_year) {
    return (dispatch) => {
        dispatch(saveStartYearMain(start_year))
    }
}


// to save the offense code:
const saveOffenseCode = (data) => ({
    type: save_offense_code,
    data: data,
})
export function changeOffenseCode(offense_code) {
    return (dispatch, getState) => {
        let cdeReducer = getState().cdeReducer
        let { crime_start_year, crime_end_year, crime_offense_code, selected_state, variable_key } = cdeReducer
        let type
        if (selected_state == 'United States') {
            type = 'national'
        } else {
            type = 'state'
        }
        dispatch(saveOffenseCode(offense_code))
        dispatch(getVictimsData(type, offense_code, variable_key, crime_start_year, crime_end_year))

    }
}

const saveVariableKey = (data) => ({
    type: change_variable_key,
    data: data,
})
export function changeVariableKey(variable_key) {
    return (dispatch, getState) => {
        let cdeReducer = getState().cdeReducer
        let { crime_start_year, crime_end_year, crime_offense_code, selected_state } = cdeReducer
        let type
        if (selected_state == 'United States') {
            type = 'national'
        } else {
            type = 'state'
        }
        dispatch(saveVariableKey(variable_key))
        dispatch(getVictimsData(type, crime_offense_code, variable_key, crime_end_year, crime_end_year))
    }
}

export function changeEndYearMain(end_year) {
    return (dispatch) => {
        dispatch(saveEndYearMain(end_year))
    }
}

export function changecrimeEndYear(end_year) {
    return (dispatch, getState) => {
        let cdeReducer = getState().cdeReducer
        let { crime_start_year, crime_end_year, crime_offense_code, selected_state, variable_key } = cdeReducer
        let type
        if (selected_state == 'United States') {
            type = 'national'
        } else {
            type = 'state'
        }
        dispatch(saveEndYearCrime(end_year))
        dispatch(getVictimsData(type, crime_offense_code, variable_key, end_year, end_year))
    }
}

export function changecrimeStartYear(start_year) {
    return (dispatch, getState) => {
        let cdeReducer = getState().cdeReducer
        let { crime_start_year, crime_end_year, crime_offense_code, selected_state, variable_key } = cdeReducer
        let type
        if (selected_state == 'United States') {
            type = 'national'
        } else {
            type = 'state'
        }
        dispatch(saveStartYearCrime(start_year))
        dispatch(getVictimsData(type, crime_offense_code, variable_key, start_year, start_year))
    }
}



export function changeSelectedState(selected_state) {

    return (dispatch) => {
        dispatch(saveSelectedState(selected_state))
    }
}



// Main Layout 
// Crime Page:

const loadCrimeRates = (data) => ({
    type: load_crime_rates,
    data: data,
})

const saveCrimeRates = (data) => ({
    type: save_crime_rates,
    data: data,
})


function fetchCrimeRates(type) {
    return dispatch => {
        dispatch(loadCrimeRates)
        let url = ''
        if (type == 'national') {
            url = `http://${process.env.REACT_APP_API_HOST}:8007/api/offense_tkm/crime_rates_national`
        }
        fetch(url).then(res => res.json()).then(data => dispatch(saveCrimeRates(data)))
    }
}

export function loadAllCrimeData() {

    //will dispatch multiple to load different data:
    return dispatch => {
        //do seaarch inside the store to get the state selected.
        let type = "national"
        dispatch(fetchCrimeRates(type))
    }
}


// NIBRS data :
// victims data ;
const loadVictimsData = (data) => ({
    type: load_victims_data,
    data: data,
})

const saveVictimsData = (data) => ({
    type: save_victims_data,
    data: data,
})

export function getVictimsData(type, offense_code, variable, start_year, end_year) {
    return dispatch => {
        dispatch(loadVictimsData)
        let url = `http://${process.env.REACT_APP_API_HOST}:8007/api/victims/${type}/${offense_code}/${variable}?start_year=${start_year}&end_year=${end_year}`
        fetch(url).then(res => res.json()).then(data => {
            dispatch(saveVictimsData(data))
        }).catch(error => console.log(error))
    }
}

//Offender data
const loadOffenderData = (data) => ({
    type: load_offender_data,
    data: data,
})

const saveOffenderData = (data) => ({
    type: save_offender_data,
    data: data,
})

export function getOffenderData(type, offense_code, variable, start_year, end_year) {
    return dispatch => {
        dispatch(loadOffenderData)
        let url = `http://${process.env.REACT_APP_API_HOST}:8007/api/offender_tkm/offender_data/${type}/${offense_code}/${variable}?start_year=${start_year}&end_year=${end_year}`
        fetch(url).then(res => res.json()).then(data => {
            dispatch(saveOffenderData(data))
        }).catch(error => console.log(error))
    }
}


// Victims relationshpp data :
//Offender data
const loadVicitmsRelationship = (data) => ({
    type: load_victims_relationship,
    data: data,
})

const saveVicitmsRelationship = (data) => ({
    type: save_victims_relationship,
    data: data,
})

export function fetchVictimsRelationship(type, offense_code, start_year, end_year) {
    return dispatch => {
        dispatch(loadVicitmsRelationship)
        let url = `http://${process.env.REACT_APP_API_HOST}:8007/api/victims/${type}/${offense_code}/relationship?start_year=${start_year}&end_year=${end_year}`
        fetch(url).then(res => res.json()).then(data => {
            delete data[0]._id
            //data of form
            let chart_data = Object.keys(data[0]).map(key => ({
                "letter": key,
                "frequency": data[0][key]
            }))
            dispatch(saveVicitmsRelationship(chart_data))
        }).catch(error => console.log(error))
    }
}

// Property stolen :
//
const loadPropertyStolen = (data) => ({
    type: load_property_stolen,
    data: data,
})

const savePropertyStolen = (data, chart_data,chart_start_point) => ({
    type: save_property_stolen,
    data: [data, chart_data,chart_start_point],
})

export function fetchPropertyStolen(type, year, year_range) {
    return dispatch => {
        let url
        dispatch(loadPropertyStolen)
        if (year_range) {
            url = `http://${process.env.REACT_APP_API_HOST}:8007/api/supplemental/property_stolen/${type}?year_range=${year_range}`
        } else if(year){
            url = `http://${process.env.REACT_APP_API_HOST}:8007/api/supplemental/property_stolen/${type}?year=${year}`
        }else{
            url = `http://${process.env.REACT_APP_API_HOST}:8007/api/supplemental/property_stolen/${type}`
        }
        fetch(url).then(res => res.json()).then(data => {
            var final_object = {}
            var final_array = []
            // debugger
            let duplicate_years = []
            data.map(items => {
                if (!duplicate_years.includes(items.data_year)) {
                    duplicate_years.push(items.data_year)
                    Object.keys(items).map(key => {
                        if (key !== "data_year") {
                            if (!final_object.hasOwnProperty(key)) final_object[key] = { name: key, data: [] }
                            final_object[key].data.push(Math.abs(items[key]))
                        }
                    })
                }
            })
            Object.keys(final_object).map(key => final_array.push(final_object[key]))
            let chart_start_point = Math.min(...duplicate_years)
            dispatch(savePropertyStolen(data, final_array,chart_start_point))
        }).catch(error => console.log(error))
    }
}

// Property recovered :
//
const loadPropertyRecovered = (data) => ({
    type: load_property_recovered,
    data: data,
})

const savePropertyRecovered = (data, chart_data,chart_start_point) => ({
    type: save_property_recovered,
    data: [data, chart_data,chart_start_point],
})

export function fetchPropertyRecovered(type, year, year_range) {
    return dispatch => {
        let url
        dispatch(loadPropertyRecovered)
        if (year_range) {
            url = `http://${process.env.REACT_APP_API_HOST}:8007/api/supplemental/property_recovered/${type}?year_range=${year_range}`
        } else if (year) {
            url = `http://${process.env.REACT_APP_API_HOST}:8007/api/supplemental/property_recovered/${type}?year=${year}`
        } else {
            url = `http://${process.env.REACT_APP_API_HOST}:8007/api/supplemental/property_recovered/${type}`
        }
        fetch(url).then(res => res.json()).then(data => {
            var final_object = {}
            var final_array = []
            // debugger
            let duplicate_years = []
            data.map(items => {
                if (!duplicate_years.includes(items.data_year)) {
                    duplicate_years.push(items.data_year)
                    Object.keys(items).map(key => {
                        if (key !== "data_year") {
                            if (!final_object.hasOwnProperty(key)) final_object[key] = { name: key, data: [] }
                            final_object[key].data.push(Math.abs(items[key]))
                        }
                    })
                }
            })
            Object.keys(final_object).map(key => final_array.push(final_object[key]))
            let chart_start_point = Math.min(...duplicate_years)
            dispatch(savePropertyRecovered(data, final_array,chart_start_point))
        }).catch(error => console.log(error))
    }
}


// ARRESTS:


const loadArrestsNational = (data) => ({
    type: load_arrests_national,
    data: data,
})

const saveArrestsNational = (data) => ({
    type: save_arrests_national,
    data: data,
})

export function fetchArrestsNational(type, year) {
    return dispatch => {
        let url
        dispatch(loadArrestsNational)
        year = year ? year : 2017
        url = `http://${process.env.REACT_APP_API_HOST}:8007/api/arrests/national_summary?year=${year}`
        fetch(url).then(res => res.json()).then(data => {
            dispatch(saveArrestsNational(data))
        }).catch(error => console.log(error))
    }
}


// Drug:
const loadArrestsNationalDrug = (data) => ({
    type: load_arrests_national_drug,
    data: data,
})

const saveArrestsNationalDrug = (data) => ({
    type: save_arrests_national_drug,
    data: data,
})

export function fetchArrestsNationalDrug(type, year) {
    return dispatch => {
        let url
        dispatch(loadArrestsNationalDrug)
        year = year ? year : 2017
        url = `http://${process.env.REACT_APP_API_HOST}:8007/api/arrests/drug_summary?year=${year}`
        fetch(url).then(res => res.json()).then(data => {
            dispatch(saveArrestsNationalDrug(data))
        }).catch(error => console.log(error))
    }
}

//Juvenile:
const loadArrestsNationalJuvenile = (data) => ({
    type: load_arrests_national_juvenile,
    data: data,
})

const saveArrestsNationalJuvenile = (data) => ({
    type: save_arrests_national_juvenile,
    data: data,
})

export function fetchArrestsNationalJuvenile(type, year) {
    return dispatch => {
        let url
        dispatch(loadArrestsNationalJuvenile)
        year = year ? year : 2017
        url = `http://${process.env.REACT_APP_API_HOST}:8007/api/arrests/juvenile_summary?year=${year}`
        fetch(url).then(res => res.json()).then(data => {
            dispatch(saveArrestsNationalJuvenile(data))
        }).catch(error => console.log(error))
    }
}

// Adults:

const loadArrestsNationalAdult = (data) => ({
    type: load_arrests_national_adults,
    data: data,
})

const saveArrestsNationalAdult = (data) => ({
    type: save_arrests_national_adults,
    data: data,
})

export function fetchArrestsNationalAdult(type, year) {
    return dispatch => {
        let url
        dispatch(loadArrestsNationalAdult)
        year = year ? year : 2017
        url = `http://${process.env.REACT_APP_API_HOST}:8007/api/arrests/adults_summary?year=${year}`
        fetch(url).then(res => res.json()).then(data => {
            dispatch(saveArrestsNationalAdult(data))
        }).catch(error => console.log(error))
    }
}

// Police employment:

const loadPeBreakout = (data) => ({
    type: load_pe_breakout,
    data: data,
})

const savePeBreakout = (data) => ({
    type: save_pe_breakout,
    data: data,
})

export function fetchPeBreakout(type, year) {
    return dispatch => {
        let url
        dispatch(loadPeBreakout)
        year = year ? year : 2017
        url = `http://${process.env.REACT_APP_API_HOST}:8007/api/police_employment/pe_breakout`
        fetch(url).then(res => res.json()).then(data => {
            dispatch(savePeBreakout(data))
        }).catch(error => console.log(error))
    }
}

const loadPePer1000 = (data) => ({
    type: load_pe_per_1000,
    data: data,
})

const savePePer1000 = (data) => ({
    type: save_pe_per_1000,
    data: data,
})

export function fetchPePer1000(type, year) {
    return dispatch => {
        let url
        dispatch(loadPePer1000)
        year = year ? year : 2017
        url = `http://${process.env.REACT_APP_API_HOST}:8007/api/police_employment/pe_per_1000`
        fetch(url).then(res => res.json()).then(data => {
            dispatch(savePePer1000(data))
        }).catch(error => console.log(error))
    }
}


///heatmaps: estimated crimes

const loadEstimatedCrimesHeatMap = (data) => ({
    type: load_estimated_crimes_heat_map,
    data: data,
})

const saveEstimatedCrimesHeatMap = (data) => ({
    type: save_estimated_crimes_heat_map,
    data: data,
})

export function fetchEstimatedCrimesHeatMap(type, year) {
    return dispatch => {
        let url
        dispatch(loadEstimatedCrimesHeatMap)
        year = year ? year : 2017
        url = `http://${process.env.REACT_APP_API_HOST}:8007/api/estimated_crimes/highmap`
        fetch(url).then(res => res.json()).then(data => {
            dispatch(saveEstimatedCrimesHeatMap(data))
        }).catch(error => console.log(error))
    }
}