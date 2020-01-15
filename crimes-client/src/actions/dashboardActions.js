export const load_table_data = 'load_table_data';
export const save_table_data = 'save_table_data';
export const load_incident_table_data = 'load_incident_table_data';
export const save_incident_table_data = 'save_incident_table_data';
export const load_incident_data = 'load_incident_data';
export const save_incident_data = 'save_incident_data';
export const load_incident_people_data = 'load_incident_people_data';
export const save_incident_people_data = 'save_incident_people_data';
export const load_recent_victims = 'load_recent_victims';
export const save_recent_victims = 'save_recent_victims';
export const load_create_victim = 'load_create_victim';
export const save_create_victim = 'save_create_victim';



const requestDashboardTable = () => ({
  type: load_table_data
})

const saveDashboardTable = (data) => ({
  type: save_table_data,
  data: data,
})

export function fetchDashboardTable(filters) {
  console.log("from action file=", filters)
  return dispatch => {
    dispatch(requestDashboardTable());
    let url = 'http://localhost:8004/backend/api/crime/dashboard_table';
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        filters,
        start: 0,
        limit: 50,
        offset: 0,
        sort: ''
      })
    })
      .then(response => response.json())
      .then(table_data => {
        // console.log("table_data=",table_data)
        dispatch(saveDashboardTable(table_data))
      }).catch(error => console.log(error))
  }
}

//for incidents data :
const requestIncidentsTable = () => ({
  type: load_incident_table_data
})

const saveIncidentsTable = (data) => ({
  type: save_incident_table_data,
  data: data,
})


export function getIncidentTableData(row) {
  let offense_code = row.original.offense_code
  console.log("offense_code=", offense_code)
  return dispatch => {
    dispatch(requestIncidentsTable())
    let url = `http://localhost:8004/backend/api/crime/dashboard_incident_table`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        filters: [],
        start: 0,
        limit: 50,
        offset: 0,
        sort: '',
        offense_code: offense_code
      })
    })
      .then(response => response.json())
      .then(table_data => {
        console.log("table_data=", table_data)
        dispatch(saveIncidentsTable(table_data))
      }).catch(error => console.log(error))
  }
}


//get incident data :
const requestIncidentData = () => ({
  type: load_incident_data
})

const saveIncidentData = (data) => ({
  type: save_incident_data,
  data: data,
})

const requestPeopleData = () => ({
  type: load_incident_people_data
})

const savePeopleData = (data) => ({
  type: save_incident_people_data,
  data: data,
})

export function fetchIncidentData(incident_number) {
  return dispatch => {
    console.log("incident_number", incident_number)
    // debugger;
    dispatch(requestIncidentData())
    let url = `http://localhost:8004/backend/api/incident/${incident_number}`;
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(async incident_data => {
        dispatch(saveIncidentData(incident_data))
        //parsing the response to save additional data of people:
        dispatch(requestPeopleData())
        let { jugde, law, suspects, accussed, victims } = incident_data.incidentPeople_data[0]

        let people_ids = [jugde, law, suspects, accussed, victims]
        let aggregated_data = await getIncidentPeopleData(people_ids)
        // console.log("aggregated_data",aggregated_data)
        dispatch(savePeopleData(aggregated_data))
      }).catch(error => console.log(error))
  }
}


async function getIncidentPeopleData(people_ids) {
  // console.log("people_ids=",people_ids)
  let people_data_url = 'http://localhost:8004/backend/api/incident/people'
  return await Promise.all(people_ids.map(people_id => {
    if (typeof people_id !== 'undefined') {
      if (people_id.length) {
        // console.log("in")
        return fetch(people_data_url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "people_ids": people_id
          })
        }).then(res => res.json())
      }
    }
  }))
}

//get recent victims :
const requestRecentVictims = () => ({
  type: load_recent_victims
})

const saveRecentVictims = (data) => ({
  type: save_recent_victims,
  data: data,
})

export function fetchRecentVictims() {
  return dispatch => {
    dispatch(requestRecentVictims())
    let url = `http://localhost:8004/backend/api/people/recent/victim/3`;
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(async data => {
        dispatch(saveRecentVictims(data))
      }).catch(error => console.log(error))
  }
}

//create random new victims :
const requestCreateVictim = () => ({
  type: load_create_victim
})

const saveCreateVictim = (data) => ({
  type: save_create_victim,
  data: data,
})

export function fetchCreateVictim() {
  return dispatch => {
    dispatch(requestCreateVictim())
    let url = `http://localhost:8004/backend/api/people/add_person/victim`;
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(async data => {
        dispatch(saveCreateVictim("success"))
      }).catch(error =>{
        console.log(error)
        dispatch(saveCreateVictim("error"))
      })
  }
}