import React, { Component } from 'react'
// import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import { Dropdown, FormControl } from 'react-bootstrap'
import { fetchDepartmentFilters, saveFilters } from '../../actions/departmentActions'

class DepartmentFilters extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected_filter: 'agency',
      values: [],
      searched_term: ''
    }
    this.textInput = React.createRef();
  }
  componentDidMount() {
    this.props.dispatch(fetchDepartmentFilters())
    this.setState({ values: this.props.department_filters })
  }

  filterSelected = (filter, value) => {
    console.log('clcked', value, filter)
    this.props.dispatch(saveFilters({ filter, value }))
  }
  // render(){
  //     // debugger;
  //     // console.log("state=",this.state)
  //     let {department_filters} = this.props
  //     return Object.keys(department_filters).map(filter => (
  //         <Dropdown drop={"right"}>
  //              <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
  //                  {filter}
  //                </Dropdown.Toggle>

  //                <Dropdown.Menu as={CustomMenu}>
  //                    {department_filters[filter].buckets.map((value,index)=>{
  //                        if(["city","state","organization"].includes(filter)){
  //                         return <Dropdown.Item as={customCheckBox} eventKey={index} filterSelected={this.filterSelected} filter={filter} value={value.key} doc_count={value.doc_count} key={index}/>
  //                        }else{
  //                         return <Dropdown.Item eventKey={index} onSelect={()=>this.filterSelected(filter,value.key)}>{value.key} ({value.count})</Dropdown.Item>
  //                        }
  //                    })}
  //                </Dropdown.Menu>
  //              </Dropdown>
  //         ))
  // }
  changeSubMenuValues(filter) {
    if (this.textInput.current) {
      this.textInput.current.value = ''
    }
    this.setState({ selected_filter: filter, values: this.props.department_filters[filter].buckets })
  }

  SearchItems = (event) => {
    if (typeof event == 'undefined' || event.target.value == '') {
      console.log("here", this.state.selected_filter)
      this.setState({ values: this.props.department_filters[this.state.selected_filter].buckets })
      return
    }
    let searcjQery = event.target.value.toLowerCase(),
      displayedContacts = this.state.values.filter((el) => {
        let searchValue = el.key.toLowerCase();
        return searchValue.indexOf(searcjQery) !== -1;
      })
    this.setState({
      values: displayedContacts
    })
    console.log('displayed terms -', displayedContacts)
  }
  render() {
    let { department_filters } = this.props
    //setting the first one as default 


    // debugger
    if (!Object.keys(department_filters).length) {
      return <span className="no_results">No Filter data</span>
    } else {
      console.log("state=", this.state.values)
      let first_filter = Object.keys(department_filters)[0]
      // this.setState({selected_filter:first_filter})
      return (
        <div className="row filter_main_box">
          <div className="col-lg-4 col-md-4 filter_main_options">
            <ul>
              {Object.keys(department_filters).map(filter => {
                return <li onClick={() => this.changeSubMenuValues(filter)}>{filter}</li>
              })}
            </ul>
          </div>
          <div className="col-lg-8 col-md-8 filters_search_sub_menu">
            
              <input type="text" placeholder="type to search..." ref={this.textInput} onChange={this.SearchItems} />
              <ul className="filter_values">
                {this.state.values.length ?
                  this.state.values.map((bucket, index) => {
                    return <li className="checkbox form-group">
                      <input type="checkbox" id={`${this.props.selected_filter}-${index}`} value={bucket.doc_count} name={bucket.key} onChange={() => this.filterSelected(this.selected_filter, bucket.key)} />
                      <label htmlFor="valuePot">{bucket.key} ({bucket.doc_count})</label>
                    </li>
                  })
                  : <li>No results found</li>
                }
              </ul>
          </div>
        </div>
      )
    }

  }
}

const mapStateToProps = state => ({
  department_filters: state.departmentReducer.filters_data
})

export default connect(mapStateToProps, null)(DepartmentFilters)


const customCheckBox = (props) => {
  // debugger;
  return (
    <li className="checkbox form-group">
      <input type="checkbox" id={props.id} value={props.value} name={props.value} onChange={() => props.filterSelected(props.filter, props.value)} />
      <label htmlFor="valuePot">{props.value} ({props.doc_count})</label>
    </li>
  )
}

class CustomToggle extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();

    this.props.onClick(e);
  }

  render() {
    return (
      <a href="" onClick={this.handleClick}>
        {this.props.children}
      </a>
    );
  }
}


class SearchFilterMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected_value: '',
      values: []
    }
  }
  // handleChange(e) {
  //   this.setState({ value: e.target.value.toLowerCase().trim() });
  // }

  componentDidMount() {
    this.setState({ values: this.props.filter_options })
  }
  onFilterChange = (e) => {
    console.log("this,", this)
    debugger
  }

  render() {
    // debugger
    return (
      <form>
        <input type="text" placeholder="type to search..." onChange={this.onFilterChange} />
        <ul className="filter_values">
          {this.props.filter_options.buckets.map((bucket, index) => {
            return <li className="checkbox form-group">
              <input type="checkbox" id={`${this.props.selected_filter}-${index}`} value={bucket.doc_count} name={bucket.key} onChange={() => this.filterSelected(this.selected_filter, bucket.key)} />
              <label htmlFor="valuePot">{bucket.key} ({bucket.doc_count})</label>
            </li>
          })}
        </ul>
      </form>
    )
  }

}


class CustomMenu extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = { value: '' };
  }

  handleChange(e) {
    this.setState({ value: e.target.value.toLowerCase().trim() });
  }

  render() {
    const {
      children,
      style,
      className,
      'aria-labelledby': labeledBy,
    } = this.props;

    const { value } = this.state;

    return (
      <div style={style} className={className} aria-labelledby={labeledBy}>
        <FormControl
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={this.handleChange}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            child =>
              !value || child.props.children.toLowerCase().startsWith(value),
          )}
        </ul>
      </div>
    );
  }
}
