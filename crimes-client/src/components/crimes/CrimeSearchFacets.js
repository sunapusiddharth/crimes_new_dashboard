import React, { Component } from 'react'
import '../../styles/facets.css'
import { fetchCrimeSearch,saveFacetFilters } from '../../actions/crimeActions';
import { connect } from 'react-redux'
import PageLoader from '../../common/PageLoader';

var brandFacets = [
    {
        "label": "Healthcare Equipment",
        "path": "/catalog/healthcare-equipment",
        "count": 45
    },
    {
        "label": "Foodservice",
        "path": "/catalog/foodservice",
        "count": 12
    },
    {
        "label": "Rehabilitation",
        "path": "/catalog/rehabilitation",
        "count": 8
    }
];

function FacetLink(props) {
    return <span className="facet">
        {props.label}&nbsp;<span className="facet-count">({props.count})</span>
    </span>;
}

function FacetLabel(props) {
    return <span className="facet">
        <label htmlFor={props.forInput}>{props.label}</label>&nbsp;<span className="facet-count">({props.count})</span>
    </span>;
}

function FacetGroup(props) {
    var facetListing;
    console.log("props1=",props)
    switch (props.type) {
        case "multi-select":
            facetListing = <FacetGroupMultiSelect facets={props.facets} title={props.title} onChangeSearchFilters={props.onChangeSearchFilters}/>;
            break;
        default:
            facetListing = <FacetGroupTree facets={props.facets} tree={props.tree} />;
            break;
    }
    return <div className="facet-group">
        <p><strong className="facet_title">{props.title}</strong></p>
        {facetListing}
    </div>
}


function FacetGroupTree(props) {

    var facetNodes = [];
    var overallBuild;

    if (props.facets) {
        props.facets.forEach(function (facet) {
            facetNodes.push(<li><FacetLink label={facet.label} count={facet.count} path={facet.path} /></li>);
        });
    }

    overallBuild = facetNodes;

    if (props.tree) {
        props.tree.reverse();
        props.tree.forEach(function (treeNode) {
            if (treeNode.isSelected) {
                var cn = <span className="x-selected">{treeNode.label}</span>;
            } else {
                var cn = <a href={treeNode.path} className="x-undo">{treeNode.label}</a>;
            }
            overallBuild = <li>{cn}
                <ul>
                    {overallBuild}
                </ul>
            </li>;
        });
    }

    return <ul>{overallBuild}</ul>;
}

function FacetGroupMultiSelect(props) {
    var rows = [],
        checked = '',
        name;
        let title = props.title
        console.log("props2=",props)
    props.facets.forEach(function (facet) {
        // console.log("facet=",facet)
        if (facet.isSelected) { checked = 'checked' }
        name = facet.label.replace(/[^\w+]/, "-");
        rows.push(<li><input type='checkbox' checked={checked} id={name} className="input_checkbox" onChange={()=>props.onChangeSearchFilters({[title]:facet.label})} /> <FacetLabel forInput={name} label={facet.label} count={facet.count} path={facet.path} /></li>);
        checked = '';
    });
    return <ul>{rows}</ul>;
}

class CrimeSearchFacets extends Component {
    componentDidMount() {
        // this.props.dispatch(fetchCrimeSearch("murder", 0, 10, true))
    }
    onChangeSearchFilters = (data)=>{
        debugger;
    }

    render() {
        // Facets - category , city, month, postalCode,state,year
        if (this.props.crime_search_results_loading) {
            return <PageLoader loading={this.props.crime_search_results_loading} />
        } else {
            // debugger;
            console.log("all_new_rops", this.props)
            var crime_facets = this.props.crime_search_facets
            var category_facets = []
            
            crime_facets.category && crime_facets.category.buckets && crime_facets.category.buckets.length && crime_facets.category.buckets.map(item => {
                category_facets.push({
                    "label": item.key,
                    "count": item.doc_count
                })
            })

            var city_facets = []
            
            crime_facets.city && crime_facets.city.buckets && crime_facets.city.buckets.length && crime_facets.city.buckets.map(item => {
                city_facets.push({
                    "label": item.key,
                    "count": item.doc_count
                })
            })

            var state_facets = []
            
            crime_facets.state && crime_facets.state.buckets && crime_facets.state.buckets.length && crime_facets.state.buckets.map(item => {
                state_facets.push({
                    "label": item.key,
                    "count": item.doc_count
                })
            })

            var month_facets = []
            var month_names=['Jannuary','February','March','April','May','June','July','Augugust','September',
        'October','November','December']
            
            crime_facets.month && crime_facets.month.buckets && crime_facets.month.buckets.length && crime_facets.month.buckets.map(item => {
                month_facets.push({
                    "label": month_names[item.key] ,
                    "count": item.doc_count
                })
            })

           

            var year_facets = []
            
            crime_facets.year && crime_facets.year.buckets && crime_facets.year.buckets.length && crime_facets.year.buckets.map(item => {
                year_facets.push({
                    "label": item.key.toString(),
                    "count": item.doc_count
                })
            })
            //Form the facet listing here to the desired format ...so that it can be done quickly rather than   
            // To query save the selections to redux and read it from there to make the respective classes active.
            return (
                
                <div className="col-lg-4 col-md-4" id="search_facets">
                    <span>
                    <FacetGroup title="category" facets={category_facets} type="multi-select" onChangeSearchFilters={this.onChangeSearchFilters}/>
                    <FacetGroup title="state" facets={state_facets}  type="multi-select"onChangeSearchFilters={this.onChangeSearchFilters}  />
                    <FacetGroup title="city" facets={city_facets} type="multi-select" onChangeSearchFilters={this.onChangeSearchFilters}  />    
                    <FacetGroup title="year" facets={year_facets}  type="multi-select" onChangeSearchFilters={this.onChangeSearchFilters}  />
                    <FacetGroup title="Month" facets={month_facets}  type="multi-select"onChangeSearchFilters={this.onChangeSearchFilters}  />
                    </span>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    crime_search_facets: state.crimeReducer.crime_search_facets,
    crime_search_results_loading: state.crimeReducer.crime_search_results_loading
})

export default connect(mapStateToProps, null)(CrimeSearchFacets)