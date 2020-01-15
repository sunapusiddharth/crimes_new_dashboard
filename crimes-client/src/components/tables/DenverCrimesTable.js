import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTable from "react-table";
import "react-table/react-table.css";

import { fetchDenverCrimes } from '../../actions/tableActions'
import PageLoader from '../../common/PageLoader';

class DenverCrimesTable extends Component {
    constructor(props) {
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
                    Header: "INCIDENT_ID",
                    accessor: "INCIDENT_ID",
                },
                {
                    Header: "OFFENSE_ID",
                    accessor: "OFFENSE_ID",
                },
                {
                    Header: "OFFENSE_CODE",
                    accessor: "OFFENSE_CODE",
                },
                {
                    Header: "OFFENSE_CODE_EXTENSION",
                    accessor: "OFFENSE_CODE_EXTENSION",
                },
                {
                    Header: "OFFENSE_TYPE_ID",
                    accessor: "OFFENSE_TYPE_ID",
                },
                {
                    Header: "OFFENSE_CATEGORY_ID",
                    accessor: "OFFENSE_CATEGORY_ID",
                },
                {
                    Header: "FIRST_OCCURRENCE_DATE",
                    accessor: "FIRST_OCCURRENCE_DATE",
                },
                {
                    Header: "LAST_OCCURRENCE_DATE",
                    accessor: "LAST_OCCURRENCE_DATE",
                },
                {
                    Header: "REPORTED_DATE",
                    accessor: "REPORTED_DATE",
                },
                {
                    Header: "INCIDENT_ADDRESS",
                    accessor: "INCIDENT_ADDRESS",
                },
                {
                    Header: "GEO_X",
                    accessor: "GEO_X",
                },
                {
                    Header: "GEO_Y",
                    accessor: "GEO_Y",
                },
                {
                    Header: "GEO_LON",
                    accessor: "GEO_LON",
                },
                {
                    Header: "GEO_LAT",
                    accessor: "GEO_LAT",
                },
                {
                    Header: "DISTRICT_ID",
                    accessor: "DISTRICT_ID",
                },
                {
                    Header: "PRECINCT_ID",
                    accessor: "PRECINCT_ID",
                },
                {
                    Header: "NEIGHBORHOOD_ID",
                    accessor: "NEIGHBORHOOD_ID",
                },
                {
                    Header: "IS_CRIME",
                    accessor: "IS_CRIME",
                },
                {
                    Header: "IS_TRAFFIC",
                    accessor: "IS_TRAFFIC",
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
        this.props.dispatch(fetchDenverCrimes({}, { YEAR: 1 }, 20, 0))
    }

    fetchData(state, instance) {
        console.log("fetchData", instance)
        //this function is called on sort / column click:
        let filtered_field = {}
        let sort_field = {}

        let sort_column = instance.state.sorted.length && instance.state.sorted[0].id
        let sort_order = !this.props.denver_crimes_sorting

        if (instance.state.filtered.length) {
            instance.state.filtered.map(filter => {
                let filter_name = filter.id
                filtered_field[filter_name] = filter.desc
            })
        }
        if (sort_column) {
            sort_field[sort_column] = sort_order ? 1 : -1
        } else {
            sort_field.YEAR = 1
        }
        let page = instance.state.page
        let pageSize = instance.state.pageSize
        instance.props.data.length && (sort_column || Object.keys(filtered_field).length || page != this.props.denver_crimes_current_page || pageSize != this.props.denver_crimes_row_limit) && this.props.dispatch(fetchDenverCrimes(filtered_field, sort_field, pageSize, page))
        // backend call
    }

    resetState() {
        // this.setState(makeDefaultState());
        console.log("hi from reset state")
    }

    render() {

        const customProps = { id: 'denver_crime_table' };
        let table_data = this.props.denver_crimes_data && this.props.denver_crimes_data.length ? this.props.denver_crimes_data[0].paginatedResults ? this.props.denver_crimes_data[0].paginatedResults : [] : []
        // console.log("table_data_denver",table_data)
        return (
            <div className="custom_container">
                <div>
                    {/* <button onClick={this.resetState}>Reset State</button> */}
                    <h3>Denver Crimes Table</h3>
                    <p>This page shows all the crimes data of denver city in  tabular format .Table columns are sortable as well as filterable ,user can select the no of rows to view at a time. All this sorting ,filtering and pagination is done on server side using node and mongoDB.
                    This table holds data for about 3 Million records.To improve performance caching can be implemented both in client (using selectors) and in server side using (redis).But due to time constraint, didn't apply it here.</p>
                </div>
                <ReactTable
                    data={table_data}
                    columns={this.state.columns}
                    defaultPageSize={10}
                    className="-striped -highlight"
                    loading={this.props.denver_crimes_loading}
                    filterable={false}
                    filtered={this.state.filtered}
                    // onFilteredChange={filtered => this.setState({ filtered })}
                    onFetchData={this.fetchData}
                    // getTheadThProps={(state, rowInfo, column, instance)=>{
                    //     console.log("getTheadThProps", instance)
                    // }}
                    // getProps={() => customProps}
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
                    pages={this.props.denver_crimes_pages}
                    pageSize={this.props.denver_crimes_row_limit}
                    page={this.props.denver_crimes_current_page}
                />
            </div>
        )


    }
}



const mapStateToProps = (state) => ({
    denver_crimes_data: state.tableReducer.denver_crimes_data,
    denver_crimes_loading: state.tableReducer.denver_crimes_loading,
    denver_crimes_sorting: state.tableReducer.denver_crimes_sorting,
    denver_crimes_row_limit: state.tableReducer.denver_crimes_row_limit,
    denver_crimes_pages: state.tableReducer.denver_crimes_pages,
    denver_crimes_current_page: state.tableReducer.denver_crimes_current_page,
})
export default connect(mapStateToProps, null)(DenverCrimesTable)
