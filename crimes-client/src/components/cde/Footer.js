import React from 'react'

export default function Footer() {
  return (
    <div className="w3-container" style={{ padding: "128px 16px" }} id="about">
      <h5>Data collected from sources:</h5>
      <div className="w3-row-padding w3-center" style={{ marginTop: "64px" }}>
        <div className="w3-third">
          <i className="fa fa-desktop w3-margin-bottom w3-jumbo w3-center"></i>
          <p className="w3-large strong">Estimated crime data</p>
          <p>Crime trends at the state and national level for violent crime and property crime since 1995</p>
        </div>
        <div className="w3-third">
          <i className="fa fa-desktop w3-margin-bottom w3-jumbo w3-center"></i>
          <p className="w3-large strong">NIBRS data</p>
          <p>Incident-based data for crimes known to law enforcement for states reporting NIBRS.</p>
        </div>
        <div className="w3-third">
          <i className="fa fa-desktop w3-margin-bottom w3-jumbo w3-center"></i>
          <p className="w3-large strong" >Other datasets
</p>
          <p>Hate crime, assaults on law enforcement, police employee data, agency participation, cargo theft, and human trafficking..</p>
        </div>
      </div>
    </div>

  )
}
