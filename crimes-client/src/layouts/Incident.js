import React, { Component,Fragment } from 'react'
import { connect } from 'react-redux'
import { fetchIncidentData } from '../actions/dashboardActions'
import PageLoader from '../common/PageLoader'
import PageLayout from '../components/investigation/PageLayout';
// import '../styles/department.scss'



const ImageComponent = (props)=>{
    return (
        <img src={props.url}/>
    )
}




const dept_images = [
    {
        media:<ImageComponent url='/assets/poster.png'/>,
        // caption:''
    },
    {
        media:<ImageComponent url='/assets/poster.png'/>,
        // caption:''
    },
    {
        media:<ImageComponent url='/assets/poster.png'/>,
        // caption:''
    },
    {
        media:<ImageComponent url='/assets/poster.png'/>,
        // caption:''
    },
    {
        media:<ImageComponent url='/assets/poster.png'/>,
        // caption:''
    }
]


class Incident extends Component {
   
    constructor(props){
        super(props)
        this.state={
            modal_open:false,
            modal_data:{}
        }
    }

    
    openModal = (post)=>{
        console.log("open modal called here",post)
        this.setState({data:post,modal_open:true})
    }

    componentDidMount() {
        let incident_id = this.props.match.params.id
        this.props.dispatch(fetchIncidentData(incident_id))
    }

    render() {
        if (this.props.incident_data_loading ) {
           return <PageLoader loading={this.props.incident_data_loading}/>
        } else {
            if( !(Object.keys(this.props.incident_data).length)){
                return <div className="no_results page_layout">No data found</div>
            }else{
                  
                  return <PageLayout incident={this.props.incident_data}/>  
            }
        }
    }
}

const mapStateToProps = (state) => ({
    incident_data_loading : state.dashboardReducer.incident_data_loading,
    incident_data : state.dashboardReducer.incident_data,
})

export default connect(mapStateToProps, null)(Incident)
