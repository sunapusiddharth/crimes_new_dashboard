import {
    load_people, save_people, save_person, load_person
} from './../actions/peopleActions';

const initState = {
    people: [],
    people_loading: false,
    total_people: 0,
    person: [],
    person_loading: false,
}

const peopleReducer = (state = initState, action) => {
    switch (action.type) {
        case load_people:
            return {
                ...state, people_loading: true
            }
        case save_people:
            return {
                ...state,
                people_loading: false,
                people: action.data && action.data.length && action.data[0].paginatedResults && action.data[0].paginatedResults,
                total_people: action.data && action.data.length && action.data[0].totalCount && action.data[0].totalCount[0].count,
                offset_people: action.skip
            }
        case load_person:
            return {
                ...state, person_loading: true
            }
        case save_person:
            return {
                ...state,
                person_loading: false,
                person: action.data
            }
        default:
            return { ...state }
    }
}

export default peopleReducer;

