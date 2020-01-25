export const load_mail = 'load_mail';
export const load_inbox = 'load_inbox';
export const save_inbox = 'save_inbox';




const requestMail=()=>({
  type:load_mail
})

const loadInbox = (data)=>({
  type:load_inbox,
  data:data,
})

const saveInbox = (data)=>({
    type:save_inbox,
    data:data,
  })

export function fetchInbox(filters){
  return dispatch=>{
    dispatch(requestMail());
    let url = `http://${process.env.REACT_APP_API_HOST}:8004/api/crime/dashboard_table`
    fetch(url,{
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        filters,
        start:0,
        limit:50,
        offset:0,
        sort:'' 
      })
    })
    .then(response =>response.json())
    .then(table_data=>{
        // console.log("table_data=",table_data)
        dispatch(loadInbox(table_data))
    }).catch(error=>console.log(error))
  }
}

export function addMail(mail){
    debugger;
    return dispatch=>{
      dispatch(requestMail());
      let url = `http://${process.env.REACT_APP_API_HOST}:8006/api/mail/inbox/add`;
      fetch(url,{
        method:'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(mail)
      })
      .then(response =>response.json())
      .then(table_data=>{
          // console.log("table_data=",table_data)
          dispatch(loadInbox(table_data))
      }).catch(error=>console.log(error))
    }
  }