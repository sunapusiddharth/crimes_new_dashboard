import moment from 'moment'
export const start_saving = 'start_saving'
export const end_saving = 'end_saving'


const preStartSaving = () => ({
    type: start_saving
})

const endSaving = (data) => ({
    type: end_saving,
    data: data,
})

export function startSaving(form_values) {
    // debugger
    return (dispatch,getState) => {
        dispatch(preStartSaving());
        // debugger
        let url = `http://${process.env.REACT_APP_API_HOST}:8004/api/contact/save_contact_feedback`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(form_values)
        })
            .then(response => response.json())
            .then(data => {
                dispatch(endSaving({"success":""}))
            }).catch(error =>{
                dispatch(endSaving({"error":error}))
                console.log("error=",error)
            })
    }
}