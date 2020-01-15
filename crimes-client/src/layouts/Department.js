import React, { Component,Fragment } from 'react'
import { connect } from 'react-redux'
import { fetchDepartmentDetails } from '../actions/departmentActions'
import PageLoader from '../common/PageLoader'
import PageLayout from '../components/departments/PageLayout';
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


class Department extends Component {
   
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
        let department_id = this.props.match.params.id
        //fetch data for this department from mongodb . we use mongodb rather than elasticsearch since i dont store much data
        //in elasticsearch
        this.props.dispatch(fetchDepartmentDetails(department_id))
    }

    render() {
        if (this.props.department_loading) {
           return <PageLoader loading={this.props.department_loading}/>
        } else {
            if( !Object.keys(this.props.my_department).length){
                return <div className="no_results page_layout">No data found</div>
            }else{
                let recent_posts = this.props.department_details[1].blog_posts
                let press_release = this.props.department_details[2].press_release
                let speeches = this.props.department_details[3].speeches
                let vacancy_announcements = this.props.department_details[4].vacancy_announcements
                let most_wanted_people = this.props.department_details[5].most_wanted_people
                let news = this.props.department_details[6].news
                  return <PageLayout department ={this.props.my_department} recent_posts={recent_posts} press_release={press_release}
                  speeches={speeches}  vacancy_announcements={vacancy_announcements}  most_wanted_people={most_wanted_people} news={news}  />  
            }
        }
    }
}

const mapStateToProps = (state) => ({
    department_loading : state.departmentReducer.department_loading,
    my_department : state.departmentReducer.department,
    department_details : state.departmentReducer.department_details
})

export default connect(mapStateToProps, null)(Department)
