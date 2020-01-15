import React, { Component } from 'react'
import { Dropdown, FormControl } from 'react-bootstrap'
import { fetchStates,changeSelectedState } from '../../actions/cdeActions'
import { connect } from 'react-redux'
import PageLoader from '../../common/PageLoader';

class CustomToggle extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        console.log("selected_state changed=",e.target.value,this.props)
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

class DropMenu extends Component {
    componentDidMount() {
        this.props.dispatch(fetchStates())
    }

    changeSelectedState = (e)=>{
        let state = this.props.states[e-2]
        let state_name = state && state.state_name
        this.props.dispatch(changeSelectedState(state_name))
    }

    render() {
        if (this.props.states_loading) {
            return <PageLoader loading={this.props.states_loading} />
        } else {
            console.log("states",this.props.states)
            let type = this.props.selected_state == 'United States'? 'national':'state'
            return (
                <div className="row">
                    <div className="col">
                        <Dropdown>
                            <h3><Dropdown.Toggle as={CustomToggle} dispatch={this.props.dispatch} id="dropdown-custom-components">
                                {this.props.selected_state}
                            </Dropdown.Toggle>
                            </h3>

                            <Dropdown.Menu as={CustomMenu} className="states_menu" >
                                <Dropdown.Item eventKey="1" onSelect={this.changeSelectedState}>United States</Dropdown.Item>
                                {this.props.states.map((state, index) => <Dropdown.Item onSelect={this.changeSelectedState} eventKey={index + 2}>{state.state_name}</Dropdown.Item>)}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="col">
                        <Dropdown>
                            <h3><Dropdown.Toggle variant="success" id="dropdown-basic">
                                Data Collections
                        </Dropdown.Toggle>
                            </h3>
                            <Dropdown.Menu >
                                <Dropdown.Item key="crime" href={`/cde/explorer/${this.props.selected_state.toLowerCase().split(" ").join("_")}/crime`}>Crime</Dropdown.Item>
                                <Dropdown.Item key="expanded_property_crime_data" href={`/cde/explorer/${this.props.selected_state.toLowerCase().split(" ").join("_")}/expanded_property_crime_data`}>Expanded Property Crime Data</Dropdown.Item>
                                <Dropdown.Item key="arrest" href={`/cde/explorer/${this.props.selected_state.toLowerCase().split(" ").join("_")}/arrest`}>Arrest</Dropdown.Item>
                                <Dropdown.Item key="action-5" href={`/cde/explorer/${this.props.selected_state.toLowerCase().split(" ").join("_")}/police_employment`}>Police Employment</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    states: state.cdeReducer.states,
    states_loading: state.cdeReducer.states_loading,
    selected_state:state.cdeReducer.selected_state,
})

export default connect(mapStateToProps, null)(DropMenu)