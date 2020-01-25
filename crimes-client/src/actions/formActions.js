
export const save_crime_summary_values = 'save_crime_summary_values'
export const save_crime_media_values = 'save_crime_media_values'
export const save_crime_peple_values = 'save_crime_peple_values'
export const delete_crime_peple_values = 'delete_crime_peple_values'
export const start_saving = 'start_saving'
export const end_saving = 'end_saving'

// Blogs:
export const save_department_blog_values = 'save_department_blog_values'

export const saveCrimeSummaryValues = (data) => {
    return {
        type: save_crime_summary_values,
        data: data,
    }
}

export const saveCrimeMediaValues = (data) => {
    return {
        type: save_crime_media_values,
        data: data,
    }
}

export const saveCrimePople = (data) => {
    return {
        type: save_crime_peple_values,
        data: data,
    }
}

export const deleteCrimePople = (person_type, person) => {
    return {
        type: delete_crime_peple_values,
        data: [person_type, person],
    }
}

// Saving all data to server:
const startSaving = () => {
    return {
        type: start_saving,
    }
}

const endSaving = (data) => {
    return {
        type: end_saving,
        data: data,
    }
}

export function saveCrimeDataToServer(page_number) {
    return (dispatch, getState) => {
        dispatch(startSaving());
        let formReducer = getState().formReducer
        let address = formReducer.address,
            category = formReducer.category,
            description = formReducer.description,
            district = formReducer.district,
            file = formReducer.file,
            incident_number = formReducer.incident_number,
            occurence_on_date = formReducer.occurence_on_date,
            offense_code = formReducer.offense_code,
            offense_code_group = formReducer.offense_code_group,
            offense_description = formReducer.offense_description,
            reporting_area = formReducer.reporting_area,
            schooting = formReducer.schooting,
            street = formReducer.street,
            title = formReducer.title,
            ucr_part = formReducer.ucr_part,
            crime_files = formReducer.crime_files,
            audios = formReducer.audios,
            videos = formReducer.videos,
            photos = formReducer.photos,
            victim = formReducer.victim,
            accussed = formReducer.accussed,
            suspect = formReducer.suspect,
            judge = formReducer.judge,
            law = formReducer.law;

        const obj = {
            address, category, description, district, incident_number, occurence_on_date, offense_code, offense_code_group, offense_description,
            reporting_area, street, title, schooting, ucr_part,
            accussed, suspect, judge, law, victim
        };
        const json = JSON.stringify(obj);
        const data = new FormData();
        for (const file of file) {
            data.append('file', file);
        }

        for (const file of crime_files) {
            data.append('file', file);
        }
        for (const file of audios) {
            data.append('file', file);
        }
        for (const file of videos) {
            data.append('file', file);
        }
        for (const file of photos) {
            data.append('file', file);
        }

        data.append("data", json);
        let url = `http://${process.env.REACT_APP_API_HOST}:8004/api/crimes/add`;
        fetch(url, {
            method: 'POST',
            body: data,
        })
            .then(response => response.json())
            .then(data => {
                // console.log("from submit actions dispatch")
                dispatch(endSaving(data))
            }).catch(error => console.log(error))
    }
}

// Deparment Blogs:


export function saveDepartmentBlogToServer(form_values) {
    return (dispatch, getState) => {
        dispatch(startSaving());
        let formReducer = getState().formReducer
        let {title,body,file} = form_values
        let author_id = '5d7631ae5450143c288ce02e' //random id for now ..will add later using some other id.
        const obj = {
            title,body,author_id
        };
        const json = JSON.stringify(obj);
        const data = new FormData();
        data.append('file', file);
        // for (const file_single of file) {
           
        // }
        data.append("data", json);
        let url = `http://${process.env.REACT_APP_API_HOST}:8004/api/forms/department_blogs/add_new_blog`;
        fetch(url, {
            method: 'POST',
            body: data,
        })
            .then(response => response.json())
            .then(data => {
                // console.log("from submit actions dispatch")
                dispatch(endSaving(data))
            }).catch(error => console.log(error))
    }
}