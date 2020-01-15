import { Switch,Route } from 'react-router-dom';
import React, { Component } from 'react';
import Dashboard from './layouts/Dashboard'
import PersonCard from './common/PersonCard';
import CrimeSummaryTable from './components/dashboard/CrimeSummaryTable';
import IncidentMedia from './components/dashboard/modals/IncidentMedia';
import IncidentVideos from './components/dashboard/modals/IncidentVideos';
import VideoPlayer from './common/VideoPlayer'
import VideoCarousel from './common/VideoCarousel';
import AudioPlayer from './common/AudioPlayer';
import AudioPlayerCard from './common/AudioPlayerCard';
import AudioPlayerCarousel from './common/AudioPlayerCarousel';
import IncidentModalTabs from './components/dashboard/modals/IncidentModalTabs';
import People from './layouts/People';
import SideNavBar from './components/SideNavBar';
import Maps from './layouts/Maps'
import Login from './layouts/Login';
import Investigation from './layouts/Investigation';
import TestTable from './components/dashboard/TestTable';
import Department from './layouts/Department';
import SideBarTry from './components/SideBarTry';
import { SignUp } from './layouts/SignUp';
import PrivateRoute  from './components/PrivateRoute'
import { history, Role } from './helpers';
import { AdminPage } from './components/AdminPage';
import { LoginPage } from './components/LoginPage';
import { HomePage } from './components/HomePage';
import DepartmentCard from './components/departments/DepartmentCard';
import PageLayout from './components/departments/PageLayout';
import AllPosts  from './components/departments/RecentPosts/AllPosts';
import  DetailedPost from './components/departments/RecentPosts/DetailedPost';
import PersonHoverCard from './common/PersonHoverCard';
import MailLayout from './components/mail/MailLayout';
import  Notifications  from './components/notifications/Notifications';
import Search from './layouts/Search';
import SearchAll  from './components/search/SearchAll';
import SearchPeople  from './components/search/SearchPeople';
import InfiniteScrollerVirtualized from './common/InfiniteScrollerVirtualized';
import InfinteScroll from './common/InfinteScroll';
import WordCloud from './components/real_time_dashboard/WordCloud';
import HoneyCombLayout from './common/HoneyCombLayout';
import  PeopleLayout  from './layouts/PeopleLayout';
import SearchForms from './components/search/SearchForms';
import  Pagination  from './common/Pagination';
import Facets from './common/Facets';
import SearchCrimes from './components/search/SearchCrimes';
import CDE from './layouts/CDE';
import Layout from './components/cde/explorer/Layout';
import LineGraphD3 from './common/LineGraphD3';
import PieChart from './common/PieChart';
import ChoroplethMap from './components/real_time_dashboard/charts/ChoroplethMap';
import BarChartD3 from './common/BarChartD3';
import HorizontalBarChart from './common/HorizontalBarChart';
import HorizontalBarChartSimple from './common/HorizontalBarChartSimple';
import GroupedChartDrilldown from './common/GroupedChartDrilldown';
import PieChartHighcharts from './common/PieChartHighcharts';
import PieChartDrillDownHigh from './common/PieChartDrillDownHigh';
import LineChartHigh from './common/LineChartHigh';
import Incident from './layouts/Incident';
import HighChartMapDrilldown from './common/HighChartMapDrilldown';
import HeatMapD3 from './common/HeatmapD3';
import NewMaps from './layouts/NewMaps';
import BostonCrimesTable from './components/tables/BostonCrimesTable';
import DenverCrimesTable from './components/tables/DenverCrimesTable';
import LandingPage from './components/tables/LandingPage';
import NewsLayout from './components/news/NewsLayout';
import CustomPagination from './common/CustomPagination';
import IndividualNewsLayout from './components/news/IndividualNewsLayout';
import CrimeNewsSearchLayout from './components/news/CrimeNewsSearchLayout';
import {withRouter} from 'react-router-dom';
import CrimesLayout from './components/crimes/CrimesLayout';
import IndividualCrimesLayout from './components/crimes/IndividualCrimesLayout';
import { CrimeAudioLayout } from './components/crimes/CrimeAudioLayout';
import CrimeSearchPage from './components/crimes/CrimeSearchPage';
import DepartmentLayout from './components/departments/DepartmentLayout';
import DepartmentSearchResults from './components/departments/DepartmentSearchResults';

// Forms:
import CrimeSingleBootstrapForm from './components/forms/crime_forms/CrimeSingleBootstrapForm'
import CrimeForm from './components/forms/crime_forms/CrimeForm'

import DarkTheme from './components/forms/crime_forms/DarkTheme';
import AutoCompletePeople from './components/forms/crime_forms/AutoCompletePeople';
import MegaMenu from './common/MegaMenu';
import CrimeFacetsMaterialUI from './components/crimes/CrimeFacetsMaterialUI';
import ContactForm from './common/ContactForm';
import CrimeFormLayout from './components/forms/crime_forms/CrimeFormLayout';
import DepartmentCreateNewBlog from './components/forms/department_blogs/DepartmentCreateNewBlog';
import AllPostsSearch from './components/departments/RecentPosts/AllPostsSearch';
import Speeches from './components/departments/Speeches';
import AllSpeeches from './components/departments/Speeches/AllSpeeches';
import AllSpeechesSearch from './components/departments/Speeches/AllSpeechesSearch';
import AllVacancies from './components/departments/JobVacancies/AllVacancies';
import JobVacanciesSearch from './components/departments/JobVacancies/JobVacanciesSearch';
import HomePageParralax from './common/HomePageParralax';
import Vacancy from './components/departments/JobVacancies/Vacancy';
import Speech from './components/departments/Speeches/Speech';
import { CriminalDetailedPage } from './components/people/CriminalDetailedPage';
// import NoMatch from './common/NoMatch';
// import RealTimeLiveMap from './common/RealTimeLiveMap';
// import { DepartmentRecentBogs } from './components/departments/DepartmentRecentBogs';
// import HomePageParralax from './common/HomePageParralax';

// Test :
import Contact from './components/forms/TestForms'


const Main = () => (
  <main>
    <Switch>
     
      <PrivateRoute exact roles={[Role.Admin, Role.User]} path="/dashboard" component={Dashboard} />
      <Route exact path="/table" component={CrimeSummaryTable} roles={[Role.Admin, Role.User]} />
      {/* testing PrivateRoutes */}
      <PrivateRoute exact path="/person_card" component={PersonCard} roles={[Role.Admin, Role.User]} />
      <PrivateRoute exact path="/test_form" component={Contact} roles={[Role.Admin, Role.User]} />
      <PrivateRoute exact path="/incident_media" component={IncidentMedia} roles={[Role.Admin, Role.User]} />
      <PrivateRoute exact path="/incident_videos" component={IncidentVideos} roles={[Role.Admin, Role.User]} />
      <PrivateRoute exact path="/video_player" component={VideoPlayer} roles={[Role.Admin, Role.User]} />
      <PrivateRoute exact path="/video_carousel" component={VideoCarousel} roles={[Role.Admin, Role.User]} />
      <PrivateRoute exact path="/audio_player" component={AudioPlayer} roles={[Role.Admin, Role.User]} />
      <PrivateRoute exact path="/card_column" component={AudioPlayerCard} roles={[Role.Admin, Role.User]} />
      <PrivateRoute exact path="/audio_player_carousel" component={AudioPlayerCarousel} roles={[Role.Admin, Role.User]} />
      <PrivateRoute exact path="/incident_modal_tabs" component={IncidentModalTabs} roles={[Role.Admin, Role.User]} />
      {/* <PrivateRoute exact path="/people" component={People} roles={[Role.Admin, Role.User]} /> */}
      <PrivateRoute exact path="/side_nav" component={SideNavBar} roles={[Role.Admin, Role.User]} />
      <PrivateRoute exact path="/maps/crimes_heat_map" component={NewMaps} roles={[Role.Admin, Role.User]} />
      <PrivateRoute exact path="/investigation" component={Investigation} roles={[Role.Admin, Role.User]} />
      <PrivateRoute exact path="/test_table" component={TestTable} roles={[Role.Admin, Role.User]} />
      <PrivateRoute exact path="/departments" component={DepartmentLayout} roles={[Role.Admin, Role.User]} />
      <PrivateRoute exact path="/department/:id" component={Department} roles={[Role.Admin, Role.User]} />
      <PrivateRoute exact path="/side_bar_try" component={SideBarTry} roles={[Role.Admin, Role.User]} />
      <PrivateRoute exact path="/signup" component={SignUp} roles={[Role.Admin, Role.User]} />
      <PrivateRoute exact path="/try" component={PersonHoverCard} roles={[Role.Admin, Role.User]} />


      {/* Blogs */}
      
      <PrivateRoute exact path="/department/:dept_id/posts" component={AllPosts} roles={[Role.Admin, Role.User]} />
      <PrivateRoute exact path="/department/:dept_id/posts/:post_id" component={DetailedPost} roles={[Role.Admin, Role.User]} />
      <PrivateRoute exact path="/departments/search" component={DepartmentSearchResults} roles={[Role.Admin, Role.User]} />
      <PrivateRoute exact path="/department/:dept_id/posts_search" component={AllPostsSearch} roles={[Role.Admin, Role.User]} />

      <PrivateRoute exact path="/department/:dept_id/speeches" component={AllSpeeches} roles={[Role.Admin, Role.User]} />
      <PrivateRoute exact path="/department/:dept_id/speeches/:speech_id" component={Speech} roles={[Role.Admin, Role.User]} />
      <PrivateRoute exact path="/department/:dept_id/speeches_search" component={AllSpeechesSearch} roles={[Role.Admin, Role.User]} />

      <PrivateRoute exact path="/department/:dept_id/vacancies" component={AllVacancies} roles={[Role.Admin, Role.User]} />
      <PrivateRoute exact path="/department/:dept_id/vacancies/:vacancies_id" component={Vacancy} roles={[Role.Admin, Role.User]} />
      <PrivateRoute exact path="/department/:dept_id/vacancies_search" component={JobVacanciesSearch} roles={[Role.Admin, Role.User]} />
      

      {/* Mail */}
      {/* <PrivateRoute exact path="/mail" component={Mail} roles={[Role.Admin, Role.User]} /> */}
      <PrivateRoute exact path="/mail" component={MailLayout} roles={[Role.Admin, Role.User]} />


      {/* Notifications */}
      <PrivateRoute exact path="/notification_demo" component={Notifications} roles={[Role.Admin, Role.User]} />

      {/* For Dashboard */}
      <PrivateRoute exact path="/d3_charts_try" component={ChoroplethMap} roles={[Role.Admin, Role.User]} />
      {/* Search page lyout */}
      <PrivateRoute exact path="/search" component={Search} roles={[Role.Admin, Role.User]} />
      <PrivateRoute  path="/search_all" component={SearchAll} roles={[Role.Admin, Role.User]} />
      <PrivateRoute exact path="/search/people" component={SearchPeople} roles={[Role.Admin, Role.User]} />
      <PrivateRoute exact path="/search/forms" component={SearchForms} roles={[Role.Admin, Role.User]} />
      <PrivateRoute exact path="/search/crimes" component={SearchCrimes} roles={[Role.Admin, Role.User]} />
      <PrivateRoute exact path="/facets" component={Facets} roles={[Role.Admin, Role.User]} />

      <PrivateRoute exact path="/infinte_scroll" component={InfiniteScrollerVirtualized} roles={[Role.Admin, Role.User]} />
      <PrivateRoute exact path="/word_cloud" component={WordCloud} roles={[Role.Admin, Role.User]} />
      {/* <PrivateRoute exact path="/honeycomb_layout" component={HoneyCombLayout} roles={[Role.Admin, Role.User]} /> */}
  {/* People */}
      <PrivateRoute exact path="/people" component={PeopleLayout} roles={[Role.Admin, Role.User]} />
      <PrivateRoute exact path="/person_detailed" component={CriminalDetailedPage} roles={[Role.Admin, Role.User]} />

      <PrivateRoute exact path="/pagination" component={Pagination} roles={[Role.Admin, Role.User]} />

    {/* CDE */}
    <PrivateRoute exact path="/cde" component={CDE} roles={[Role.Admin, Role.User]} />
    <PrivateRoute exact path="/cde/explorer/:state/:data_collection" component={Layout} roles={[Role.Admin, Role.User]} />
    <PrivateRoute exact path="/line_graph" component={LineGraphD3} roles={[Role.Admin, Role.User]} />
    <PrivateRoute exact path="/pie_chart" component={PieChart} roles={[Role.Admin, Role.User]} />
    <PrivateRoute exact path="/bar_chart" component={BarChartD3} roles={[Role.Admin, Role.User]} />
    <PrivateRoute exact path="/horizontal_bar_chart" component={HorizontalBarChart} roles={[Role.Admin, Role.User]} />
    <PrivateRoute exact path="/horizontal_bar_chart_simple" component={HorizontalBarChartSimple} roles={[Role.Admin, Role.User]} />
    <PrivateRoute exact path="/grouped_drill_down" component={GroupedChartDrilldown} roles={[Role.Admin, Role.User]} />
    <PrivateRoute exact path="/pie_chart_highcharts" component={PieChartHighcharts} roles={[Role.Admin, Role.User]} />
    <PrivateRoute exact path="/pie_chart_highcharts_drilldown" component={PieChartDrillDownHigh} roles={[Role.Admin, Role.User]} />
    <PrivateRoute exact path="/line_chart_high" component={LineChartHigh} roles={[Role.Admin, Role.User]} />
    <PrivateRoute exact path="/higchart_map_drilldown" component={HighChartMapDrilldown} roles={[Role.Admin, Role.User]} />
    <PrivateRoute exact path="/heatmap" component={HeatMapD3} roles={[Role.Admin, Role.User]} />

    {/* Incident Page  */}
    <PrivateRoute exact path="/incident/:id/summary" component={Incident} roles={[Role.Admin, Role.User]} />

    {/* Tables  */}
    <PrivateRoute exact path="/tables/boston_crimes" component={BostonCrimesTable} roles={[Role.Admin, Role.User]} />
    <PrivateRoute exact path="/tables/denver_crimes" component={DenverCrimesTable} roles={[Role.Admin, Role.User]} />
    <PrivateRoute exact path="/tables" component={LandingPage} roles={[Role.Admin, Role.User]} />


    {/* News */}
    <PrivateRoute exact path="/news" component={NewsLayout} roles={[Role.Admin, Role.User]} />
    <PrivateRoute  path="/news/single/:id" component={withRouter(IndividualNewsLayout)} roles={[Role.Admin, Role.User]} />
    <PrivateRoute exact path="/news/search" component={CrimeNewsSearchLayout} roles={[Role.Admin, Role.User]} />

    {/* Pagination */}
    <PrivateRoute exact path="/custom_pagination" component={CustomPagination} roles={[Role.Admin, Role.User]} />

    {/* Crimes */}
    <PrivateRoute exact path="/crimes" component={CrimesLayout} roles={[Role.Admin, Role.User]} />
    <PrivateRoute  path="/crimes/single/:id" component={withRouter(IndividualCrimesLayout)} roles={[Role.Admin, Role.User]} />
    <PrivateRoute exact path="/crimes/search" component={CrimeSearchPage} roles={[Role.Admin, Role.User]} />
    {/* test  */}
    <PrivateRoute  path="/cime_audio_layout" component={withRouter(CrimeAudioLayout)} roles={[Role.Admin, Role.User]} />


{/* ADMIN */}
<PrivateRoute  path="/forms/add_crimes" component={CrimeFormLayout} roles={[Role.Admin, Role.User]} />
<PrivateRoute  path="/forms/add_new_blog" component={DepartmentCreateNewBlog} roles={[Role.Admin, Role.User]} />
<PrivateRoute  path="/dark_theme" component={DarkTheme} roles={[Role.Admin, Role.User]} />
<PrivateRoute  path="/test_autocomplete_people_for_forms" component={AutoCompletePeople} roles={[Role.Admin, Role.User]} />

{/* Facet Crime Search Page */}
<PrivateRoute  path="/crime_search_facet" component={CrimeFacetsMaterialUI} roles={[Role.Admin, Role.User]} />

{/* Mega Menu */}
<PrivateRoute  path="/mega_menu" component={MegaMenu} roles={[Role.Admin, Role.User]} />

{/* Contact Us */}
<PrivateRoute  path="/contact_us" component={ContactForm} roles={[Role.Admin, Role.User]} />

{/* HOME*/}
<PrivateRoute  path="/home" component={HomePageParralax} roles={[Role.Admin, Role.User]} />

{/* USER*/}
<PrivateRoute  path="/login" component={LoginPage} roles={[Role.Admin, Role.User]} />
 {/* <Route component={NoMatch} exact path="*"/> */}
 

{/* D3 live Map*/}
{/* <PrivateRoute  path="/d3_live_map" component={RealTimeLiveMap} roles={[Role.Admin, Role.User]} /> */}
    </Switch>
  </main>
);

export default Main;