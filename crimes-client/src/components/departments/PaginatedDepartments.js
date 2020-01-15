import React, { Component ,createRef} from 'react'
import { connect } from 'react-redux'
import { Media, Badge } from 'react-bootstrap'
import {fetchAllDepartments} from '../../actions/departmentActions'
import PageLoader from '../../common/PageLoader';
import Pagination from '../../common/Pagination';
import {Link} from 'react-router-dom'

class PaginatedDepartments extends Component {
    constructor(props) {
        super(props)
        this.state = { onceLoaded:false,allCountries: [], currentCountries: [], currentPage: null, totalPages: null, totalRecords: null, pageLimit: 10 }
        this.ref = createRef() 
    }

    componentDidMount() {
        this.props.dispatch(fetchAllDepartments(0, 10))
    }

    onPageChanged = data => {
        var { currentPage, totalPages, pageLimit } = data;
        let from = (currentPage * pageLimit) +1
        console.log("focus obj=t",this.myInp)
        this.ref.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        //   debugger
        //   if(currentPage !=1)this.props.dispatch(fetchCrimeNews(from, pageLimit))
        //   if(!this.state.onceLoaded && currentPage ==1 ){
        //     this.setState({ currentPage, totalPages, pageLimit ,onceLoaded:true})
        //   }else{
        //       if(this.state.onceLoaded && currentPage !=1){
        //         this.setState({ currentPage, totalPages, pageLimit })
        //       }
        //   }
        this.setState({ currentPage, totalPages, pageLimit })
        this.props.dispatch(fetchAllDepartments(from, pageLimit))
    }


    render() {
        // debugger
        if (this.props.all_departments_loading) {
            return <PageLoader loading={this.props.all_departments_loading} />
        } else {
            if (!this.props.all_departments.length) {
                // debugger
                return <div >No data </div>
            } else {
                // debugger
                var { currentPage, totalPages } = this.state;
                currentPage = currentPage == null?1:currentPage
                totalPages = totalPages == null?Math.ceil((this.props.all_departments_total-10)/10):totalPages
                // debugger
                let currentCountries = this.props.all_departments
                const totalCountries = this.props.all_departments_total-10
                console.log("currentCountries=", currentCountries,totalCountries)
                if (totalCountries === 0) return null;
                const headerClass = ['text-dark py-2 pr-4 m-0', currentPage ? 'border-gray border-right' : ''].join(' ').trim();
            return (
                <div className="departments_small container h-100">
                    <h3 className="row h-100 justify-content-center align-items-center">{this.props.title ? this.props.title : 'All Departments'}</h3>
                    <p>Provides all departments paginated click on each to see more. Search for departments using the filters .</p>
                    <hr />
                    {currentPage && (
                            <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                                Page <span className="font-weight-bold">{currentPage}</span> / <span className="font-weight-bold">{totalPages}</span>
                            </span>
                        )}
                    <ul className="list-unstyled departments_list"  ref={this.ref}>
                        {currentCountries.map(news => {
                            return (<Link to={`/department/${news._id}`}><Media as="li" key={news._id}>
                                <img src={news.logo.thumb_url} className="departments_logo_thumb"/>
                                
                                <Media.Body>
                                <h5 className="departments_title">{news.agency} {news.organization}({news.short_name}) ,{news.city} {news.state}</h5>
                                    <p className="departments_description">
                                        {news.description}
                                    </p>
                                    <div className="departments_footer">
                                    <p>Forms <Badge variant="dark">{news.forms.length}</Badge> Domain Type <Badge variant="dark">{news.domain_type}</Badge></p>
                                </div>
                                </Media.Body>
                            </Media></Link>)

                        }
                        )}
                    </ul>
                    <div className="container mb-5">
                            <div className="row d-flex flex-row py-5">
                                <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
                                    <div className="d-flex flex-row align-items-center">
                                        <h2 className={headerClass}>
                                            <strong className="text-secondary">{totalCountries}</strong> Crimes Commited
                                    </h2>
                                    </div>
                                    <div className="d-flex flex-row py-4 align-items-center">
                                        <Pagination totalRecords={totalCountries} pageLimit={10} pageNeighbours={1} onPageChanged={this.onPageChanged} currentPage={currentPage}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            )
            }
        }
    }
}

const mapStateToProps = (state) => {
    // debugger
    return {
    
    all_departments: state.departmentReducer.all_departments,
    all_departments_loading: state.departmentReducer.all_departments_loading,
    all_departments_total:state.departmentReducer.all_departments_total,
}}
export default connect(mapStateToProps, null)(PaginatedDepartments)
