import React, { Component, Fragment ,createRef} from 'react'
import { connect } from 'react-redux'
import { Nav, Form, FormControl, Media, Button, Navbar,Badge } from 'react-bootstrap'
import '../../styles/news.css'
import '../../styles/crime_news_search.css'
import { fetchCrimeNewsSearch } from '../../actions/crimeNewsActions';
import PageLoader from '../../common/PageLoader';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar  } from "@fortawesome/free-solid-svg-icons"
import { faTimesCircle  } from "@fortawesome/free-solid-svg-icons"
import { List } from "react-virtualized";


class CrimeNewsSearchLayout extends Component {
    constructor() {
        super()
        this.ref = createRef()
        this.state={
            searched_keyword:'',
            isFetching:false,
            start:10,
            loaded:false
        }
        
    }
    fetchMoreListItems = ()=>{
        let query_word = this.ref.current.value
        this.props.history.push({
            pathname: '/news/search',
            search: '?query='+query_word
          })
        this.setState({search_keyword:query_word,isFetching:false,start:(this.state.start+10),loaded_once:true})
        this.props.dispatch(fetchCrimeNewsSearch(query_word,this.state.start,10,false))
    }

    componentDidMount(){
        var params = new URLSearchParams(this.props.location.search); 
        var search_keyword = params.get('query');
        this.ref.current.value = search_keyword
        window.addEventListener('scroll', this.handleScroll);
        this.setState({search_keyword})
        this.props.dispatch(fetchCrimeNewsSearch(search_keyword,0,10,true))
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleOnScroll);
      }

    componentDidUpdate(){
        // console.log("hi here cdu start")
        window.addEventListener('scroll', this.handleScroll);
        if(!this.state.isFetching || this.state.start >= (this.props.crime_news_search_results_total>10?this.props.crime_news_search_results_total:10)) return 
        console.log("hi here cdu",this.state,this.props.crime_news_search_results_total)
        this.fetchMoreListItems()
    }

     handleScroll = () =>{
        //  console.log(window.innerHeight + document.docducumentElement.scrollTop)
        var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        var clientHeight = document.documentElement.clientHeight || window.innerHeight;
        var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
        if (scrolledToBottom) {
            console.log("in")
            if(this.state.start < this.props.crime_news_search_results_total) this.setState({isFetching:true})
            
          }else{
            // console.log("else")
          }
      }

    onSearch = (event) => {
        console.log(this.ref.current,this.ref)
        let query_word = this.ref.current.value
        this.props.history.push({
            pathname: '/news/search',
            search: '?query='+query_word
          })
        this.setState({search_keyword:query_word})
        this.props.dispatch(fetchCrimeNewsSearch(query_word,0,10,true))
        event.preventDefault()
     }

    render() {
        let {search_keyword} = this.state
        return (
            <Fragment>
                <Navbar bg="dark" variant="dark">
                    <Link to="/news"><Navbar.Brand>Crime News</Navbar.Brand></Link>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" ref={this.ref}/>
                        <Button variant="outline-info" type="submit" onClick={this.onSearch}>Search</Button>
                    </Form>
                </Navbar>
                <br /><br />
                <hr />
                {this.props.crime_news_search_results_loading && !this.props.crime_news_search_results.length ? <PageLoader loading={this.props.crime_news_search_results_loading} /> :
               <SearchResultsRender data={this.props.crime_news_search_results} total={this.props.crime_news_search_results_total} search_keyword={search_keyword} start={this.state.start} />
                }
                    }
                    {this.state.isFetching && 'Fetching more list items...'}
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    crime_news_search_results: state.crimeNewsReducer.crime_news_search_results,
    crime_news_search_results_loading: state.crimeNewsReducer.crime_news_search_results_loading,
    crime_news_search_results_total: state.crimeNewsReducer.crime_news_search_results_total,
})



const SearchResultsRender = (props) => (
    <Fragment>
        <hgroup class="mb20">
		<h1>Search Results</h1>
		<h2 class="lead"><strong class="text-danger">{props.total}</strong> results were found for the search for <strong class="text-danger">{props.search_keyword}</strong></h2>
        <p>Search records in title and content . Title field used edge ngram analyzer helps in partial searching of words possible.By default results are sorted first by score , then published date and then by the no of hits.</p>
	</hgroup>
        {props.data && props.data.length ? <section class="col-xs-12 col-sm-6 col-md-12">
   { props.data.map(data => {
       let record = data && data._source
       if(!record) return <div></div>
       let date =  new Date(record.publishedAt)
       let date_string =  `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
       let time_string = `${date.getHours()}:${date.getMinutes()}`

       return 	<article class="search-result row">
       <div class="col-xs-12 col-sm-12 col-md-3 search_result_image">
           <a href="#" title="Lorem ipsum" class="thumbnail"><img src={record.urlToImage} alt={record.title} /></a>
       </div>
       <div class="col-xs-12 col-sm-12 col-md-2">
           <ul class="meta-search">
               <li><FontAwesomeIcon icon={faCalendar}/> <span>{date_string}</span></li>
               <li><FontAwesomeIcon icon={faTimesCircle}/><span>{time_string}</span></li>
               <li><Badge variant="dark">{record.tags}</Badge></li>
           </ul>
       </div>
       <div class="col-xs-12 col-sm-12 col-md-7 excerpet">
           <h3><a href={`/news/single/${data._id}`} title="" dangerouslySetInnerHTML={{__html:data.highlight && data.highlight.title && data.highlight.title.length?data.highlight.title[0]:record.title}}></a></h3>
           <p dangerouslySetInnerHTML={{__html:data.highlight && data.highlight.description && data.highlight.description.length?data.highlight.description[0]:record.description}}></p>	
           <p>Published By:{record.author}   on {date_string}  HITS: <Badge variant="dark">{record.hits}</Badge></p>
       </div>
   </article>
   }
    )}
    </section>
  : <ul className="list-unstyled"><Media as="li">
      <h3>{(props.start >= (props.total>10?props.total:10) && props.loaded_once)?"You have reached end":"Sorry no results found !!! Please try again by changing the keywords."}</h3>
  </Media></ul>}
  </Fragment>
    )
export default connect(mapStateToProps, null)(CrimeNewsSearchLayout)
