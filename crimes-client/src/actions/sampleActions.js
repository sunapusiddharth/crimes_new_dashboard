import store from './../store/store';

export const load_annual_balance_sheet = 'load_annual_balance_sheet';
export const save_annual_balance_sheet = 'save_annual_balance_sheet';
export const load_monthly_sheet = 'load_monthly_sheet';
export const save_monthly_sheet = 'save_monthly_sheet';
export const load_sector_sheet = 'load_sector_sheet';
export const save_sector_sheet = 'save_sector_sheet';
export const balance_sheet_saved = 'balance_sheet_saved';


//annual  balance sheet
const RequestAnnualBalanceSheet=()=>({
  type:load_annual_balance_sheet,
  is_loading:true,
})

export function saveAnnualBalanceSheet(balance_sheet){
  let table_headers = createTableHeaders(balance_sheet);
  return{
    type:save_annual_balance_sheet,
    annual_balance_sheet:balance_sheet,
    annual_balance_sheet_headers:table_headers,
  }

}
export function createTableHeaders(data){
  let columns_for_table = [];
  var abc = Object.keys(data[0])
  // abc.shift();
  abc.map(a=>{columns_for_table.push({'Header':a,'accessor':a})})
  return columns_for_table;
}

export function fetchAnnualBalanceSheet(){
  return dispatch=>{
    dispatch(RequestAnnualBalanceSheet());
    let url = 'http5000/api/balance_sheets/get_annual_balance_sheet';
    fetch(url,{
      method:'GET'
    })
    .then(response =>response.json())
    .then(balance_sheet=>{dispatch(saveAnnualBalanceSheet(balance_sheet))});
  }
}

//monthly balance sheet:
const RequestMonthlyBalanceSheet=()=>({
  type:load_monthly_sheet,
  is_loading:true,
})

export function saveMonthlyBalanceSheet(balance_sheet){
  let table_headers = createTableHeaders(balance_sheet);
  return{
    type:save_monthly_sheet,
    monthly_balance_sheet:balance_sheet,
    monthly_balance_sheet_headers:table_headers
  }

}

export function fetchMonthlyBalanceSheet(){
  return dispatch=>{
    dispatch(RequestMonthlyBalanceSheet());
    let url = 'http5000/api/balance_sheets/get_building_consent_by_institutioanl_control_monthly';
    fetch(url,{
      method:'GET'
    })
    .then(response =>response.json())
    .then(balance_sheet=>{dispatch(saveMonthlyBalanceSheet(balance_sheet))});
  }
}

//sector balance sheet:

const RequestSectorBalanceSheet=()=>({
  type:load_sector_sheet,
  is_loading:true,
})

const balanceSheetSaved = ()=>({
  type:balance_sheet_saved,
  is_saved:true,
})

export function saveSectorBalanceSheet (balance_sheet){
  let table_headers = createTableHeaders(balance_sheet);
  return{
    type:save_sector_sheet,
    sector_balance_sheet:balance_sheet,
    sector_balance_sheet_headers:table_headers
  }

}


export function fetchSectorBalanceSheet(){
  return dispatch=>{
    dispatch(RequestSectorBalanceSheet());
    let url = 'http5000/api/balance_sheets/get_building_consent_by_institutioanl_sector_monthly';
    fetch(url,{
      method:'GET'
    })
    .then(response =>response.json())
    .then(balance_sheet=>{dispatch(saveSectorBalanceSheet(balance_sheet))});
  }
}



export function saveBalanceSheets(data,tableType){
  let url ='';
  return dispatch=>{
    // dispatch(request_table_data_saving());
    if(tableType == "annual"){
      url = 'http5000/api/balance_sheets/save_annual_data';
    }else if(tableType == "monthly"){
      url = 'http5000/api/balance_sheets/save_monthly_data';
    }else if(tableType == 'sector'){
      url = 'http5000/api/balance_sheets/save_sector_data';
    }

    fetch(url,{
      method:'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    })
    .then(response =>response.json())
    .then(data=>{dispatch(balanceSheetSaved(data))});
  }
}