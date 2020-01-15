import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTable from "react-table";
import "react-table/react-table.css";
import "../../styles/crime_summary_table.css";
import { fetchDashboardTable, getIncidentTableData, fetchIncidentData } from '../../actions/dashboardActions'
import IncidentModal from './modals/IncidentModal'
class CrimeSummaryTable extends Component {
    constructor(props) {
        console.log("hi from tableconstructor")
        super(props)
        // this.resetState = this.resetState.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.setShow = this.setShow.bind(this);
        //defining the columns here :
        this.state = {
            columns: [
                // {
                //     expander: true,
                //     Header:'Offense Group',
                //     accessor:'_id',
                //     width: 100,
                //     Expander: ({ isExpanded, ...rest }) =>
                //     {
                //       // test your condition for Sub-Component here
                //       // I am using the presence of no comments
                //      return <
                //     },
                //     getProps: (state, rowInfo, column) => {
                //       // console.log('getProps:',{state,ri:rowInfo,column});
                //       if(rowInfo)
                //       {
                //         // same test as above
                //         if(rowInfo.original.comments.length == 0)
                //         {
                //           // hijack the onClick so it doesn't open
                //           return {
                //             onClick: () => {},
                //           }
                //         }
                //       }
                //       return {
                //         className: 'show-pointer', 
                //       };
                //     },
                //     style: {
                //       fontSize: 25,
                //       padding: "0",
                //       textAlign: "center",
                //       userSelect: "none"
                //     }
                //   },
                {
                    Header: 'Offense Group',
                    accessor: '_id',
                },
                {
                    Header: 'Offense Code',
                    accessor: 'offense_code'
                },
                {
                    Header: 'Offense Description',
                    accessor: 'offense_description'
                },
                {
                    Header: 'Number of Incidents',
                    accessor: 'count'
                }
            ],
            incident_columns: [
                {
                    Header: 'id',
                    accessor: '_id',
                    show: false
                },
                {
                    Header: 'Incident Number',
                    accessor: 'incident_number'
                },
                {
                    Header: 'District',
                    accessor: 'district'
                },
                {
                    Header: 'Reporting Area Code',
                    accessor: 'reporting_area'
                },
                {
                    Header: 'Shooting',
                    accessor: 'schooting'
                },
                {
                    Header: 'Occurred on Date',
                    accessor: 'occurence_on_date'
                }, {
                    Header: 'Year',
                    accessor: 'year'
                },
                {
                    Header: 'Month',
                    accessor: 'month'
                },
                {
                    Header: 'day of week',
                    accessor: 'day_of_week'
                },
                {
                    Header: 'hour',
                    accessor: 'hour'
                },
                {
                    Header: 'UCR Part',
                    accessor: 'ucr_part'
                },
                {
                    Header: 'Street',
                    accessor: 'street'
                }
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
        this.props.dispatch(fetchDashboardTable(this.state.filtered))
    }

    getSubComponentData = (row) => {
        console.log("called")
        this.props.dispatch(getIncidentTableData(row))
    }

    loadIncidentData = (cell_data) => {
        this.props.dispatch(fetchIncidentData(cell_data))
    }
    fetchData = (state, instance) => {
        console.log("fetchData", instance)
        // backend call
        this.props.dispatch(fetchDashboardTable(this.state.filtered))
    }

    resetState() {
        // this.setState(makeDefaultState());
        console.log("hi from reset state")
    }

    render() {
        return (
            <div className="custom_container">
                <div className="modal">
                    <IncidentModal show={this.state.show_modal} setShow={this.setShow} />
                </div>
                <div>
                    {/* <button onClick={this.resetState}>Reset State</button> */}
                    <h3>Crime Summary Table</h3> 
                    <p>This page shows all the crimes data in tabular format .The table has data grouped by offense groups On clicking of any row another sub table will be rendered which will show the table having actual incidents occurred .
                        Table columns are sortable as well as filterable ,user can select the no of rows to view at a time. All this sorting ,filtering and pagination is done on server side using node and mongoDB.On clicking of a incident , a separate modal will open which will hold a summary of that incident 
                        showing summary of incident, people related to that incident , Media (documents , audio clips , video clips , case hearings, news clippings...etc) and investigation report given by the investigator.</p>
                </div>
                <ReactTable
                    data={this.props.table_data}
                    columns={this.state.columns}
                    defaultPageSize={10}
                    className="-striped -highlight"
                    loading={this.props.dashboard_table_loading || this.props.dashboard_table_filtered_loading}
                    filterable
                    filtered={this.state.filtered}
                    onFilteredChange={filtered => this.setState({ filtered })}
                    onFetchData={this.fetchData}
                    getTrProps={(state, rowInfo) => {
                        if (rowInfo && rowInfo.row) {
                            return {
                                onClick: (e) => {
                                    this.props.dispatch(getIncidentTableData(rowInfo))
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
                    SubComponent={row => (
                        // this.getSubComponentData(row)
                        <SubComponent row={row} state={this.state} dashboard_incident_table_data={this.props.dashboard_incident_table_data} loadIncidentData={this.loadIncidentData} setShow={this.setShow} />
                    )}
                />
            </div>
        )
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
    table_data: state.dashboardReducer.dasboard_table_data,
    dashboard_table_loading: state.dashboardReducer.dashboard_table_loading,
    dashboard_incident_table_data: state.dashboardReducer.dashboard_incident_table_data,
    dashboard_incident_table_loading: state.dashboardReducer.dashboard_incident_table_loading,
    // table_data_filtered:state.dashboardReducer.table_data_filtered,
    // dashboard_table_filtered_loading:state.dashboardReducer.dashboard_table_filtered_loading
})
export default connect(mapStateToProps, null)(CrimeSummaryTable)




const SubComponent = (props) => {
    // debugger
    let { state, loadIncidentData, setShow } = props
    return (
        <div style={{ padding: "20px" }}>
            Another Sub Component!
          <ReactTable
                data={props.dashboard_incident_table_data}
                columns={state.incident_columns}
                defaultPageSize={10}
                className="-striped -highlight"
                loading={props.dashboard_incident_table_loading}
                getTdProps={(state, rowInfo, column, instance) => ({
                    onClick: (e) => {
                        let cell_name = column.id
                        let cell_data = rowInfo.original[cell_name]
                        if (cell_name == "incident_number") {
                            // debugger;
                            loadIncidentData(cell_data)
                            setShow(true)
                        }
                    }
                })}
            />
        </div>
    );
}