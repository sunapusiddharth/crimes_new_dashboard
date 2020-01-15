
export const load_boston_crimes = 'load_boston_crimes'
export const save_boston_crimes = 'save_boston_crimes'
export const load_denver_crimes = 'load_denver_crimes'
export const save_denver_crimes = 'save_denver_crimes'
export const load_vancouver_crimes = 'load_vancouver_crimes'
export const save_vancouver_crimes = 'save_vancouver_crimes'


const loadBostonCrimes = (data) => ({
    type: load_boston_crimes,
    data: data,
})

const saveBostonCrimes = (data) => ({
    type: save_boston_crimes,
    data: data,
})

export function fetchBostonCrimes(filtered_field, sort_field, rowLimit,page) {
    return (dispatch) => {
        dispatch(loadBostonCrimes({boston_crimes_row_limit:rowLimit,boston_crimes_current_page:page}));
        let req_body = {
            "filters": filtered_field,
            "sort": sort_field,
            "limit": rowLimit,
            "skipPage": page
        }

        let url = `http://localhost:8004/backend/api/tables/populate_tables_boston_crimes_data`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req_body)
        })
            .then(response => response.json())
            .then(data => {
                dispatch(saveBostonCrimes(data))
            }).catch(error => console.log(error))
    }
}

// DENVER CRIMES

const loadDenverCrimes = (data) => ({
    type: load_denver_crimes,
    data: data,
})

const saveDenverCrimes = (data) => ({
    type: save_denver_crimes,
    data: data,
})

export function fetchDenverCrimes(filtered_field, sort_field, rowLimit,page) {
    return (dispatch) => {
        dispatch(loadDenverCrimes({denver_crimes_row_limit:rowLimit,denver_crimes_current_page:page}));
        let req_body = {
            "filters": filtered_field,
            "sort": sort_field,
            "limit": rowLimit,
            "skipPage": page
        }

        let url = `http://localhost:8004/backend/api/tables/populate_tables_denver_crimes_data`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req_body)
        })
            .then(response => response.json())
            .then(data => {
                console.log("denver_data",data)
                dispatch(saveDenverCrimes(data))
            }).catch(error => console.log(error))
    }
}


// Vancouver CRIMES

const loadVancouverCrimes = (data) => ({
    type: load_vancouver_crimes,
    data: data,
})

const saveVancouverCrimes = (data) => ({
    type: save_vancouver_crimes,
    data: data,
})

export function fetchVancouverCrimes() {
    return (dispatch) => {
        dispatch(loadVancouverCrimes());
        // let req_body = {
        //     "filters": filtered_field,
        //     "sort": sort_field,
        //     "limit": rowLimit,
        //     "skipPage": page
        // }

        let url = `http://localhost:8004/backend/api/tables/vancouver_crimes`;
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify(req_body)
        })
            .then(response => response.json())
            .then(data => {
                // console.log("denver_data",data)
                dispatch(saveVancouverCrimes(data))
            }).catch(error => console.log(error))
    }
}