import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Card, Media, Jumbotron, Carousel } from 'react-bootstrap';
import '../../styles/search_combined.css'
import { fetchNewCombinedData } from '../../actions/searchActions'
import SearchAllJumbotron from './search_all/SearchAllJumbotron';
import SearchAllSearchBox from './search_all/SearchAllSearchBox';
import SearchAllCrimes from './search_all/SearchAllCrimes';
import SearchAllPeople from './search_all/SearchAllPeople';
import SearchAllNews from './search_all/SearchAllNews';
// import SearchAllDepartments from './search_all/SearchAllDepartments';
import SearchAllPosts from './search_all/SearchAllPosts';
import SearchAllVacancies from './search_all/SearchAllVacancies';
import SearchAllSpeeches from './search_all/SearchAllSpeeches';
import {Badge} from 'react-bootstrap'
import {Link} from 'react-router-dom'

class SearchAll extends Component {


  render() {
    return (
      <div className="search_combined" style={{backgroundImage:"assets/background3.jpg"}}>
        <h2>Search</h2>
        <SearchAllSearchBox />
        <hr/>
        <p>Use this page to search the entire site .Search for crimes by crime name, location .serch for criminals, victims ,Law people related to crime,judges assigned to crime.
          Search for departments , news , blogs, vacancies, speeches.Search for different people using their education info, professional info . Search for criminals by name, prisons ,their supervisors , parole officers , crimes committed , crime organizations.
          Search for victims by their name , address,education info,professional info etc..
          Featured results show top matching results based on their score.The categories having more score are included in the featured result .
          Page is built using elasticsearch node react and bootstrap.For more detailed search using facets click on detailed search in each section.
      </p>
        <SearchAllJumbotron />
        <h4>Crimes</h4>
        <p>Here you find all the crimes with summary info provided for each crime.Filtering will be provided in.All crimes accussed , victims , judges , laws , suspects etc. can be found here.To do a more detailed search click on <Link to="/search/crimes"><Badge variant="info">Search</Badge></Link>.Matching word hs been highlighted to show the matching words.</p>
        <Card className="search_all_crimes">
          <SearchAllCrimes />
        </Card>

        <SearchAllPeople />
        <div className="row">
          <div className="col">
            <h4>News</h4>
            <p>Find all the matching content from news section.To see more use pagination provided .To do a more detailed search click on <Link to="/news/search"><Badge variant="info">Search</Badge></Link>.Matching word hs been highlighted to show the matching words.</p>
            <Card className="search_all_news">
              <SearchAllNews />
            </Card>
          </div>
          <div className="col">
            <h4>Departments</h4>
            <p>Find all the matching content from departments section.YOu will find the deaprtment names here .Click on the card to see more details or click on summary to get a summarised version.To see more use pagination provided .To do a more detailed search click on <Link to="/departments/search"><Badge variant="info">Search</Badge></Link>.Matching word hs been highlighted to show the matching words.</p>
            <Card className="search_all_departments" style={{ minHeight: "500px" }}>
              Coming soon
        {/* <SearchAllDepartments /> */}
            </Card>
          </div>
        </div>

        <h4>Blog Posts</h4>
        <p>Find all the matching content from blog posts section.Click on the card to see more details or click on summary to get a summarised version.To see more use pagination provided .To do a more detailed search click on <Link to="/department/1234/posts_search"><Badge variant="info">Search</Badge></Link>.Matching word hs been highlighted to show the matching words.</p>
        <Card className="search_all_posts">
          <SearchAllPosts />
        </Card>

        <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12">
            <h4>Job Vacancies</h4>
            <p>Find all the matching content from Job Vacancies section.Click on the card to see more details or click on summary to get a summarised version.To see more use pagination provided .To do a more detailed search click on <Link to="/department/1234/vacancies_search"><Badge variant="info">Search</Badge></Link>.Matching word hs been highlighted to show the matching words.</p>
            <Card className="search_all_vacancies">
              <SearchAllVacancies />
            </Card>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <h4>Speeches</h4>
            <p>Find all the matching content from Speeches section.Click on the card to see more details or click on summary to get a summarised version.To see more use pagination provided .To do a more detailed search click on <Link to="/department/1234/speeches_search"><Badge variant="info">Search</Badge></Link>.Matching word hs been highlighted to show the matching words.</p>
            <Card className="search_all_speeches">
              <SearchAllSpeeches />
            </Card>
          </div>
        </div>


      </div>
    )
  }
}

export default connect(null, null)(SearchAll)