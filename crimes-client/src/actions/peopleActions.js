
export const load_people = 'load_people';
export const save_people = 'save_people';
export const load_person = 'load_person';
export const save_person = 'save_person';

const loadPeople = () => ({
    type: load_people
})

const savePeople = (data,skip) => ({
    type: save_people,
    data: data,
    skip:skip
})

export function fetchPeople(skip,limit) {
    return dispatch => {
      dispatch(loadPeople());
      let url = `http://${process.env.REACT_APP_API_HOST}:8004/api/people`
      fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            skip:skip,
            limit:limit
        })
      })
        .then(response => response.json())
        .then(data => {
          dispatch(savePeople(data,skip))
        }).catch(error => console.log(error))
    }
  }

// Recent Posts:
//get all posts

const loadPerson = () => ({
    type: load_person
})

const savePerson = (data) => ({
    type: save_person,
    data: data,
})


export function fetchPerson(person_id) {
    return (dispatch) => {
        dispatch(loadPerson());
        let url = `http://${process.env.REACT_APP_API_HOST}:8004/api/people/${person_id}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // console.log("from submit actions dispatch")
                dispatch(savePerson(data))
            }).catch(error => console.log(error))
    }
}

