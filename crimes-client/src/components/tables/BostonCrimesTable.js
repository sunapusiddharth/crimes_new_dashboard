import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTable from "react-table";
import "react-table/react-table.css";
import "../../styles/all_table.css";

import { fetchBostonCrimes } from '../../actions/tableActions'
import PageLoader from '../../common/PageLoader';

class BostonCrimesTable extends Component {
    constructor(props) {
        console.log("hi from tableconstructor")
        super(props)
        this.fetchData = this.fetchData.bind(this);
        //defining the columns here :
        this.state = {
            data: [],
            pages: null,
            loading: true,
            sorted: [],
            columns: [
                {
                    Header: 'INCIDENT_NUMBER',
                    accessor: 'INCIDENT_NUMBER',
                },
                {
                    Header: 'OFFENSE_CODE',
                    accessor: 'OFFENSE_CODE',
                },
                {
                    Header: 'OFFENSE_CODE_GROUP',
                    accessor: 'OFFENSE_CODE_GROUP',
                },
                {
                    Header: 'OFFENSE_DESCRIPTION',
                    accessor: 'OFFENSE_DESCRIPTION',
                },
                {
                    Header: 'DISTRICT',
                    accessor: 'DISTRICT',
                },
                {
                    Header: 'REPORTING_AREA',
                    accessor: 'REPORTING_AREA',
                },
                {
                    Header: 'SHOOTING',
                    accessor: 'SHOOTING',
                },
                {
                    Header: 'OCCURRED_ON_DATE',
                    accessor: 'OCCURRED_ON_DATE',
                },
                {
                    Header: 'YEAR',
                    accessor: 'YEAR',
                },
                {
                    Header: 'MONTH',
                    accessor: 'MONTH',
                },
                {
                    Header: 'DAY_OF_WEEK',
                    accessor: 'DAY_OF_WEEK',
                },
                {
                    Header: 'HOUR',
                    accessor: 'HOUR',
                },
                {
                    Header: 'UCR_PART',
                    accessor: 'UCR_PART',
                },
                {
                    Header: 'STREET',
                    accessor: 'STREET',
                },
                {
                    Header: 'Lat',
                    accessor: 'Lat',
                },
                {
                    Header: 'Long',
                    accessor: 'Long',
                },
                {
                    Header: 'Location',
                    accessor: 'Location',
                },
               
            ],
            offense_code: 0,
            filtered: [],
            show_modal: false
        }
    }

    setShow = (show) => {
        this.setState({ show_modal: show })
    }

    componentDidMount() {
        this.props.dispatch(fetchBostonCrimes({},{YEAR:1},20,0))
    }

    fetchData(state, instance){
        console.log("fetchData", instance)
        //this function is called on sort / column click:
        let filtered_field = {}
        let sort_field = {} 

        let sort_column = instance.state.sorted.length && instance.state.sorted[0].id
        let sort_order = !this.props.boston_crimes_sorting
        
        if(instance.state.filtered.length){
            instance.state.filtered.map(filter=>{
                let filter_name = filter.id
                filtered_field[filter_name] = filter.desc
            })
        }
        if(sort_column){
            sort_field[sort_column] = sort_order?1:-1
        }else{
            sort_field.YEAR =  1
        }
        let page = instance.state.page
        let pageSize = instance.state.pageSize
        instance.props.data.length && (sort_column || Object.keys(filtered_field).length || page !=this.props.boston_crimes_current_page || pageSize !=this.props.boston_crimes_row_limit) && this.props.dispatch(fetchBostonCrimes(filtered_field,sort_field,pageSize,page))
        // backend call
    }

    resetState() {
        // this.setState(makeDefaultState());
        console.log("hi from reset state")
    }

    render() {
        // if(this.props.boston_crimes_loading){
        //     return <PageLoader loading = {this.props.boston_crimes_loading}/>
        // }else{
            const customProps = { id: 'denver_crime_table' };
            let table_data = this.props.boston_crimes_data && this.props.boston_crimes_data.length ? this.props.boston_crimes_data[0].paginatedResults ? this.props.boston_crimes_data[0].paginatedResults:[]:[]
            return (
                <div className="custom_container">
                    <div>
                    {/* <button onClick={this.resetState}>Reset State</button> */}
                    <h3>Boston Crimes Table</h3> 
                    <p>This page shows all the crimes data of boston city in  tabular format .Table columns are sortable as well as filterable ,user can select the no of rows to view at a time. All this sorting ,filtering and pagination is done on server side using node and mongoDB.
                        This table holds data for about 3 Million records.To improve performance caching can be implemented both in client (using selectors) and in server side using (redis).But due to time constraint, didn't apply it here.</p>
                </div>
                    <ReactTable
                    //  getProps={() => customProps}
                        data={table_data}
                        columns={this.state.columns}
                        defaultPageSize={10}
                        className="-striped -highlight"
                        loading={this.props.boston_crimes_loading}
                        filterable={false}
                        filtered={this.state.filtered}
                        // onFilteredChange={filtered => this.setState({ filtered })}
                        onFetchData={this.fetchData}
                        // getTheadThProps={(state, rowInfo, column, instance)=>{
                        //     console.log("getTheadThProps", instance)
                        // }}
                        getTrProps={(state, rowInfo) => {
                            if (rowInfo && rowInfo.row) {
                                return {
                                    onClick: (e) => {
                                        // this.props.dispatch(getIncidentTableData(rowInfo))
                                        console.log("from row cick")
                                    },
                                    style: {
                                        background: rowInfo.original.offense_code === this.state.offense_code ? '#00afec' : 'white',
                                        color: rowInfo.original.offense_code === this.state.offense_code ? 'white' : 'black'
                                    }
                                }
                            } else {
                                return {}
                            }
                        }}
                        manual
                        pages={this.props.boston_crimes_pages}
                        pageSize={this.props.boston_crimes_row_limit}
                        page={this.props.boston_crimes_current_page}
                    />
                </div>
            )
        // }
    }
}

const onRowClick = (state, rowInfo, column, instance) => {
    console.log("hi", rowInfo)

    return {
        className: (rowInfo && rowInfo.original && rowInfo.original.status == 'D') ? "status-refused -highlight" : "",
        style: { // works as expected
            color: (rowInfo && rowInfo.row && rowInfo.row.status == 'D') ? "#a00" : "#000",
            opacity: (rowInfo && rowInfo.row && rowInfo.row.status == 'D') ? 0.5 : 1.0,
            disabled: true
        }
    }
}

const mapStateToProps = (state) => ({
    boston_crimes_data: state.tableReducer.boston_crimes_data,
    boston_crimes_loading: state.tableReducer.boston_crimes_loading,
    boston_crimes_sorting: state.tableReducer.boston_crimes_sorting,
    boston_crimes_row_limit: state.tableReducer.boston_crimes_row_limit,
    boston_crimes_pages: state.tableReducer.boston_crimes_pages,
    boston_crimes_current_page:state.tableReducer.boston_crimes_current_page,
})
export default connect(mapStateToProps, null)(BostonCrimesTable)
