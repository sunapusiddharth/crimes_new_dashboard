import React, { Fragment, useState } from 'react'
import '../../styles/try.css'
import RecentPosts from './RecentPosts';
import PressRelease from './PressRelease';
import Services from './Services';
import News from './News';
import Speeches from './Speeches';
import Resources from './Resources';
import WhatWeInvestigate from './WhatWeInvestigate';
import MostWanted from './MostWanted';
import VacancyAnnouncements from './VacancyAnnouncements';
import faker from 'faker'

export default function PageLayout(props) {
  let { agency, agency_url, city, description, domain_name, forms, logo, name, organization, recent_articles_url,
    securuity_contact_email, state, url, _id } = props.department
  let { recent_posts, press_release, speeches, vacancy_announcements, most_wanted_people, news } = props
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setDirection(e.direction);
  };
  return (
    <Fragment>
      <div className="w3-light-grey">
        <div className="w3-bar w3-black w3-hide-small">
          <a href={`/department/${_id}/forms`} className="w3-bar-item w3-button disabled">Forms</a>
          <a href={`/department/${_id}/posts`} className="w3-bar-item w3-button">Recent Posts</a>
          <a href={`/department/${_id}/press_release`} className="w3-bar-item w3-button disabled">Press Releases</a>
          <a href={`/department/${_id}/vacancies`} className="w3-bar-item w3-button">Jobs</a>
          <a href={`/department/${_id}/speeches`} className="w3-bar-item w3-button">Speeches</a>
          <a href={`/department/${_id}/news`} className="w3-bar-item w3-button disabled">News</a>
        </div>
        <div className="w3-content" style={{ maxWidth: "1600px" }}>
          <header className="w3-container w3-center w3-padding-21 w3-white">
            <h3 className="w3-xxxmeduim"><b>{name}</b></h3>
            <h6>{agency}, {organization}<span className="w3-tag">{city},{state}</span></h6>
          </header>


          <header className="w3-display-container w3-wide" id="home">
            <img className="w3-image" src="/assets/jane.jpg" alt="Fashion Blog" width="1600" height="300" />
            <div className="w3-display-left w3-padding-large">
              <h4 className="w3-text-white">{domain_name}</h4>
              {/* <h6 className="w3-jumbo w3-text-white w3-hide-small"><b>Dept moto</b></h6> */}
              <h6><button className="w3-button w3-white w3-padding-large w3-large w3-opacity w3-hover-opacity-off"
              //  onclick="document.getElementById('subscribe').style.display='block'"
              >Contact Us</button></h6>
            </div>
          </header>
        </div>

        {/* <!-- Grid --> */}
        <div className="w3-row w3-padding w3-border">

          {/* <!-- Blog entries --> */}
          <div className="w3-col l8 s12">

            {/* <!-- Blog entry --> */}
            <div className="w3-container w3-white w3-margin w3-padding-large">
              <RecentPosts data={recent_posts} />
            </div>
            <hr />

            <div className="w3-container w3-white w3-margin w3-padding-large">
              <PressRelease data={press_release} department_id={_id} />
            </div>
            <hr />

            {/* <div className="w3-container w3-white w3-margin w3-padding-large">
              <Services department_id={_id} />
            </div>
            <hr /> */}

            <div className="w3-container w3-white w3-margin w3-padding-large">
              <Speeches data={speeches} department_id={_id} />
            </div>
            <hr />

            {/* <!-- END BLOG ENTRIES --> */}
          </div>

          {/* <!-- About/Information menu --> */}
          <div className="w3-col l4">
            {/* <!-- About Card --> */}
            <div className="w3-white w3-margin">
              <div className="w3-container w3-black">
                <h4>About Us</h4>
                <p>{description?description:faker.lorem.sentences(5)}</p>
              </div>
            </div>
            <hr />

            {/* <!-- News --> */}
            <div className="w3-white w3-margin">
              <div className="w3-container w3-padding w3-black">
                <h4>In News</h4>
              </div>
              <News data={news} department_id={_id} />
            </div>
            <hr />

            {/* <!-- Vacancies --> */}
            <div className="w3-white w3-margin">
              <div className="w3-container w3-padding w3-black">
                <h4>Vacancies</h4>
              </div>
              <VacancyAnnouncements data={vacancy_announcements} department_id={_id} />
            </div>
            <hr />

            {/* <!-- Tags --> */}
            <div className="w3-white w3-margin">
              <div className="w3-container w3-padding w3-black">
                <h4>Resources</h4>
              </div>
              <Resources department_id={_id} />
            </div>
            <hr />

            {/* <!-- Tags --> */}
            <div className="w3-white w3-margin">
              <div className="w3-container w3-padding w3-black">
                <h4>What we investigate</h4>
              </div>
              <WhatWeInvestigate department_id={_id} />
            </div>
            <hr />

            {/* <!-- Inspiration --> */}
            <div className="w3-white w3-margin">
              <div className="w3-container w3-padding w3-black">
                <h4>Most Wanted</h4>
              </div>
              <MostWanted data={most_wanted_people} department_id={_id} />
            </div>
            <hr />


            {/* <!-- END About/Intro Menu --> */}
          </div>

          {/* <!-- END GRID --> */}
        </div>


      </div>


      <div id="subscribe" className="w3-modal w3-animate-opacity">
        <div className="w3-modal-content" style={{ padding: "32px" }}>
          <div className="w3-container w3-white">
            <i
              //  onclick="document.getElementById('subscribe').style.display='none'"
              className="fa fa-remove w3-transparent w3-button w3-xlarge w3-right"></i>
            <h2 className="w3-wide">SUBSCRIBE</h2>
            <p>Join my mailing list to receive updates on the latest blog posts and other things.</p>
            <p><input className="w3-input w3-border" type="text" placeholder="Enter e-mail" /></p>
            <button type="button" className="w3-button w3-block w3-padding-large w3-red w3-margin-bottom"
            // onclick="document.getElementById('subscribe').style.display='none'"
            >Subscribe</button>
          </div>
        </div>
      </div>


      <footer className="w3-container w3-dark-grey" style={{ padding: "32px" }}>
        <a href="#" className="w3-button w3-black w3-padding-large w3-margin-bottom"><i className="fa fa-arrow-up w3-margin-right"></i>To the top</a>
        <p>Powered by <a href="https://www.w3schools.com/w3css/default.asp" target="_blank">w3.css</a></p>
      </footer>
    </Fragment>
  )
}
