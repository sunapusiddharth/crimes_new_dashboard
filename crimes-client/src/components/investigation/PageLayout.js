import React, { Fragment, useState } from 'react'
import '../../styles/incident.css'
import faker from 'faker'
import { Carousel } from 'react-responsive-carousel';
import IncidentPeople from '../dashboard/modals/IncidentOverview/IncidentPeople';

export default function PageLayout(props) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setDirection(e.direction);
  };
  debugger
  let {_id} = props.incident.incidentNumber
  let crime_data = (props.incident.crime_data && props.incident.crime_data[0])?props.incident.crime_data[0]:[]
  let incident_data = props.incident.incident_data
  let incidentPeople_data = props.incident.incidentPeople_data
  let occurence_date = crime_data.length &&crime_data.day_of_week+','+crime_data.month +','+crime_data.year
  let address = crime_data.length && crime_data.street?crime_data.street+', '+faker.address.streetName()+', '+faker.address.streetAddress()+','+faker.address.city()+','+faker.address.state():+faker.address.streetName()+', '+faker.address.streetAddress()+','+faker.address.city()+','+faker.address.state()
  let incident_photos = incident_data && incident_data[0] && incident_data[0].photos?incident_data[0].photos:faker.image.city()
  let judge = incidentPeople_data && incidentPeople_data[0], law = incidentPeople_data && incidentPeople_data[1], accussed = incidentPeople_data && incidentPeople_data[2], suspects = incidentPeople_data && incidentPeople_data[3], victims = incidentPeople_data && incidentPeople_data[4]; 
  
  return (
    <Fragment>
      <div className="w3-light-grey">
        <div className="w3-bar w3-black w3-hide-small">
          <a href={`/department/${_id}/forms`} className="w3-bar-item w3-button">Summary</a>
          <a href={`/department/${_id}/recent_posts`} className="w3-bar-item w3-button">Media</a>
          <a href={`/department/${_id}/press_release`} className="w3-bar-item w3-button">Incident People</a>
          <a href={`/department/${_id}/jobs`} className="w3-bar-item w3-button">Investigation Summary</a>
          <a href={`/department/${_id}/speeches`} className="w3-bar-item w3-button">Summary</a>
        </div>
        <div className="w3-content" style={{ maxWidth: "1600px" }}>
          <header className="w3-container w3-center w3-padding-21 w3-white">
            <h3 className="w3-xxxmeduim"><b>{"name"}</b></h3>
            <h6>Occured on{occurence_date} <span className="w3-tag">{address}</span></h6>
          </header>

{/* add image carousel  */}
{/* to change image to pull from s3 */}
          <header className="w3-display-container w3-wide" id="home">
            {incident_photos? <Carousel showThumbs={false} >
              {incident_photos.map(photo=><img className="w3-image" src="/assets/jane.jpg" alt="Fashion Blog" width="1600" height="300" />)}
                </Carousel>:<img className="w3-image" src="/assets/jane.jpg" alt="Fashion Blog" width="1600" height="300" />}
          </header>
        </div>

        {/* <!-- Grid --> */}
        <div className="w3-row w3-padding w3-border">

          {/* <!-- Blog entries --> */}
          <div className="w3-col l8 s12">
            <p>{incident_data.summary?incident_data.summary:faker.sentences.paragraphs(10)}</p>

            {/* <!-- Blog entry --> */}
            {judge.length?<Fragment>
              <h6>Judges</h6>
              <div className="w3-container w3-white w3-margin w3-padding-large">
                <IncidentPeople people={judge} display_name={"judge"} size={5} is_loading={0}/>
            </div>
            </Fragment>:''}
            <hr />

            <div className="w3-container w3-white w3-margin w3-padding-large">
              {/* <PressRelease data={press_release} department_id={_id} /> */}
            </div>
            <hr />

            {/* <div className="w3-container w3-white w3-margin w3-padding-large">
              <Services department_id={_id} />
            </div>
            <hr /> */}

            <div className="w3-container w3-white w3-margin w3-padding-large">
              {/* <Speeches data={speeches} department_id={_id} /> */}
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
                <p>{faker.lorem.sentences(5)}</p>
              </div>
            </div>
            <hr />

            {/* <!-- News --> */}
            <div className="w3-white w3-margin">
              <div className="w3-container w3-padding w3-black">
                <h4>In News</h4>
              </div>
              {/* <News data={news} department_id={_id} /> */}
            </div>
            <hr />

            {/* <!-- Vacancies --> */}
            <div className="w3-white w3-margin">
              <div className="w3-container w3-padding w3-black">
                <h4>Vacancies</h4>
              </div>
              {/* <VacancyAnnouncements data={vacancy_announcements} department_id={_id} /> */}
            </div>
            <hr />

            {/* <!-- Tags --> */}
            <div className="w3-white w3-margin">
              <div className="w3-container w3-padding w3-black">
                <h4>Resources</h4>
              </div>
              {/* <Resources department_id={_id} /> */}
            </div>
            <hr />

            {/* <!-- Tags --> */}
            <div className="w3-white w3-margin">
              <div className="w3-container w3-padding w3-black">
                <h4>What we investigate</h4>
              </div>
              {/* <WhatWeInvestigate department_id={_id} /> */}
            </div>
            <hr />

            {/* <!-- Inspiration --> */}
            <div className="w3-white w3-margin">
              <div className="w3-container w3-padding w3-black">
                <h4>Most Wanted</h4>
              </div>
              {/* <MostWanted data={most_wanted_people} department_id={_id} /> */}
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
