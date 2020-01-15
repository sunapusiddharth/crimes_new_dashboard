import {
    load_states, save_states, save_end_year_main, save_start_year_main, save_selected_state,
    load_crime_rates, save_crime_rates,
    load_victims_data, save_victims_data,
    save_victims_stats, load_victims_stats,
    load_offender_data, save_offender_data,
    load_victims_relationship, save_victims_relationship,
    load_property_stolen, save_property_stolen,
    load_property_recovered, save_property_recovered,
    load_arrests_national, save_arrests_national,
    load_arrests_national_adults, save_arrests_national_adults,
    load_arrests_national_drug, save_arrests_national_drug,
    load_arrests_national_juvenile, save_arrests_national_juvenile,
    load_pe_breakout, save_pe_breakout,
    load_pe_per_1000, save_pe_per_1000,
    save_offense_code,
    save_start_year_crime,save_end_year_crime,
    change_variable_key,
    load_estimated_crimes_heat_map,save_estimated_crimes_heat_map
} from './../actions/cdeActions';

const initState = {
    states: [],
    states_loading: false,
    selected_state: 'United States',
    start_year_main: 2000,
    end_year_main: 2010,
    crime_rates: [],
    crime_rates_loading: false,
    victims_data: [],
    victims_loading: false,
    crime_offense_code: 'aggravated-assault',
    crime_start_year: 2017,
    crime_end_year: 2017,
    offender_data: [],
    offender_loading: false,
    victim_relationship_data: [],
    victim_relationship_loading: false,
    property_stolen: [],
    property_stolen_chart: [],
    property_stolen_loading: false,
    property_recovered: [],
    property_recovered_chart: [],
    property_recovered_loading: false,
    arrests_national_loading: false,
    arrests_national: [],
    arrests_national_drug_loading: false,
    arrests_national_drug: [],
    arrests_national_juvenile_loading: false,
    arrests_national_juvenile: [],
    arrests_national_adult_loading: false,
    arrests_national_adult: [],
    pe_breakout_loading: false,
    pe_breakout: [],
    pe_per_1000: false,
    pe_per_1000_loading: [],
    variable_key:'sex',
    property_stolen_chart_start_point:2000,
    property_recovered_chart_start_point:2000,
    estimated_crimes_heat_map_data:[],
    estimated_crimes_heat_map_data_loading:false
}

const cdeReducer = (state = initState, action) => {
    switch (action.type) {
        case load_states:
            return {
                ...state, states_loading: true
            }
        case save_states:
            return {
                ...state,
                states_loading: false,
                states: action.data
            }
        case save_start_year_main:
            return {
                ...state,
                start_year_main: action.data
            }
        case save_end_year_main:
            return {
                ...state,
                end_year_main: action.data
            }
        case save_selected_state:
            return {
                ...state,
                selected_state: action.data
            }
        case load_crime_rates:
            return {
                ...state,
                crime_rates_loading: true
            }
        case save_crime_rates:
            return {
                ...state,
                crime_rates_loading: false,
                crime_rates: action.data
            }
        case load_victims_data:
            return {
                ...state,
                victims_loading: true
            }
        case save_victims_data:
            state.victims_data = []
            return {
                ...state,
                victims_loading: false,
                victims_data: action.data,
            }
        case load_offender_data:
            return {
                ...state,
                offender_loading: true
            }
        case save_offender_data:
            return {
                ...state,
                offender_loading: false,
                offender_data: action.data,
            }

        case load_victims_relationship:
            return {
                ...state,
                victim_relationship_loading: true
            }
        case save_victims_relationship:
            return {
                ...state,
                victim_relationship_loading: false,
                victim_relationship_data: action.data,
            }
        case load_property_stolen:
            return {
                ...state,
                property_stolen_loading: true
            }
        case save_property_stolen:
            return {
                ...state,
                property_stolen_loading: false,
                property_stolen: action.data[0],
                property_stolen_chart: action.data[1],
                property_stolen_chart_start_point:action.data[2]
            }
        case load_property_recovered:
            return {
                ...state,
                property_recovered_loading: true
            }
        case save_property_recovered:
            return {
                ...state,
                property_recovered_loading: false,
                property_recovered: action.data[0],
                property_recovered_chart: action.data[1],
                property_recovered_chart_start_point: action.data[2]
            }
        case load_arrests_national:
            return {
                ...state,
                arrests_national_loading: true
            }
        case save_arrests_national:
            return {
                ...state,
                arrests_national_loading: false,
                arrests_national: action.data
            }
        case load_arrests_national_adults:
            return {
                ...state,
                arrests_national_adult_loading: true
            }
        case save_arrests_national_adults:
            return {
                ...state,
                arrests_national_adult_loading: false,
                arrests_national_adult: action.data
            }

        case load_arrests_national_juvenile:
            return {
                ...state,
                arrests_national_juvenile_loading: true
            }
        case save_arrests_national_juvenile:
            return {
                ...state,
                arrests_national_juvenile_loading: false,
                arrests_national_juvenile: action.data
            }

        case load_arrests_national_drug:
            return {
                ...state,
                arrests_national_drug_loading: true
            }
        case save_arrests_national_drug:
            return {
                ...state,
                arrests_national_drug_loading: false,
                arrests_national_drug: action.data
            }

        case load_pe_per_1000:
            return {
                ...state,
                pe_per_1000_loading: true
            }
        case save_pe_per_1000:
            return {
                ...state,
                pe_per_1000_loading: false,
                pe_per_1000: action.data
            }

        case load_pe_breakout:
            return {
                ...state,
                pe_breakout_loading: true
            }
        case save_pe_breakout:
            return {
                ...state,
                pe_breakout_loading: false,
                pe_breakout: action.data
            }

        case save_offense_code:
            return {
                ...state,
                crime_offense_code: action.data
            }

            case save_end_year_crime:
            return {
                ...state,
                crime_end_year: action.data
            }

            case save_start_year_crime:
            return {
                ...state,
                crime_start_year: action.data
            }

            case change_variable_key:
            return {
                ...state,
                variable_key: action.data
            }

            case load_estimated_crimes_heat_map:
                return {
                    ...state,
                    estimated_crimes_heat_map_data_loading: true
                }
    
                case save_estimated_crimes_heat_map:
                return {
                    ...state,
                    estimated_crimes_heat_map_data_loading: false,
                    estimated_crimes_heat_map_data: action.data
                }

        default:
            return { ...state }
    }
}

export default cdeReducer;

