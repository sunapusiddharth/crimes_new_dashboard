import {
    load_annual_balance_sheet,
    save_annual_balance_sheet,
    load_monthly_sheet,
    save_monthly_sheet,
    load_sector_sheet,
    save_sector_sheet,
    balance_sheet_saved
  } from './../actions/balanceSheetsActions';
  
  const initState = {
    is_loading:false,
    annual_balance_sheet:[],
    monthly_balance_sheet:[],
    sector_balance_sheet:[],
    annual_balance_sheet_headers:[],
    monthly_balance_sheet_headers:[],
    sector_balance_sheet_headers:[],
    is_saving:false
  }
  
  const balanceSheetReducer = (state=initState,action) =>{
    switch (action.type) {
      case load_annual_balance_sheet:
      return{
        ...state
      }
      break;
      case save_annual_balance_sheet:
      return{
        ...state,
        annual_balance_sheet:action.annual_balance_sheet,
        annual_balance_sheet_headers:action.annual_balance_sheet_headers
      }
      break;
      case load_monthly_sheet:
      return{
        ...state
      }
      break;
      case save_monthly_sheet:
      return{
        ...state,
        monthly_balance_sheet:action.monthly_balance_sheet,
        monthly_balance_sheet_headers:action.monthly_balance_sheet_headers
      }
      break;
      case load_sector_sheet:
      return{
        ...state
      }
      break;
      case save_sector_sheet:
      return{
        ...state,
        sector_balance_sheet:action.sector_balance_sheet,
        sector_balance_sheet_headers:action.sector_balance_sheet_headers
      }
      break;
      case balance_sheet_saved:
      return{
        ...state,
        is_saving:action.is_saving
      }
      break;
      default:
        return{
          ...state
        }
        break;
    }
  }
  
  export default balanceSheetReducer;