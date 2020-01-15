import React from "react";
// Import React Table
import ReactTable from "react-table";

export default class TestTable extends React.Component {
  constructor() {
    super();
    this.state = {
      data: this.dummyData,
      expanded: {}
    };
  }

  dummyData = [
    {
      "firstName": "alice",
      "lastName": "adams",
      "age": 11,
      "comments": [],
    },
    {
      "firstName": "bob",
      "lastName": "brady",
      "age": 18,
      "comments": [
        "hello", "i like things that start with b"
      ]
    },
    {
      "firstName": "Another",
      "lastName": "User",
      "age": 15,
      "comments": []
    },
    {
      "firstName": "catherine",
      "lastName": "collins",
      "age": 22,
      "comments": [
        "just chiming in with things that start with c",
        "Mary Poppins does drugs",
        "Who is Donald anyway?"
      ]
    },
    {
      "firstName": "david",
      "lastName": "davidson",
      "age": 34,
      "comments": []
    },
  ]

  render() {
      console.log("expanded value in state :",this.state.expanded)
    const { data } = this.state;
    return (
      <div>
        <ReactTable
          data={data}
          columns={[
            {
              Header: "Last Name",
              accessor: "lastName"
            },
            {
              Header: "Age",
              accessor: "age",
              width: 50
            },
            {
              expander: true,
              Header: 'First Name',
              accessor: "firstName",
              width: 100,
              Expander: ({ isExpanded, ...rest }) =>
              {
                  let rowInfo = {...rest}
                return rowInfo.original.firstName;
              },
              getProps: (state, rowInfo, column) => {
                  debugger
                //   if(rowInfo.original.firstName !== 'alice'){
                //     return {
                //         style: {
                //             "text-decoration-line": "underline"
                //         },
                //     };
                //   }
                  return {}
            },
            }
          ]}
          onExpandedChange={(expanded, index, event) => {
            this.setState({expanded});            
          }}
          defaultPageSize={10}
          showPagination={false}
          className="-striped -highlight"
          expanded={this.state.expanded}
          SubComponent={row => {
            // this is the broken part

            // NOTE: you need to return your component if there a {}
            // and the correct semantics for the LI wrapper is UL (not DIV)
            return <SubComponent/>
          }}
        />
        <br />
      </div>
    );
  }
}




const SubComponent = (props)=>{
    const state = props.state
    const columns = props.columns
    return (
        <div style={{ padding: "20px" }}>
          Another Sub Component!
          <ReactTable
          data={
              [
            {
                "firstName": "bob",
                "lastName": "brady",
                "age": 18,
                "comments": [
                  "hello", "i like things that start with b"
                ]
              },
              {
                "firstName": "Another",
                "lastName": "User",
                "age": 15,
                "comments": []
              }]
          }
          columns={
            [
                {
                  Header: "First Name",
                  accessor: "firstName"
                },
                {
                  Header: "Last Name",
                  accessor: "lastName"
                },
                {
                  Header: "Age",
                  accessor: "age",
                  width: 50
                }]
          }
          defaultPageSize={10}
          className="-striped -highlight"
          />
        </div>
      );
}