//contain sidebar for education , employment , prisons , cases , links to organizations , relatives and family , bio 
//criminal profile (suspects,accussed) - bio , crimes , prisons , links to org , relatives and family , properties ,external links ,death (optional),criminal career  
// victim - bio , education , employmnet , cases , relatives and family , 

import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import '../../styles/person_detailed.css'
import SideBar from './SideBar';
import CriminalBio from './CriminalBio';
import PersonEducation from './PersonEducation';
import CriminalCrimes from './CriminalCrimes';
import PersonEmployment from './PersonEmployment';
import CriminalRelatives from './CriminalRelatives';
import CriminalOrganizations from './CriminalOrganizations';


export class CriminalDetailedPage extends Component {
    constructor() {
        super()
        this.state = {
            sidebar: false,
            main_component:'bio'
        }
    }

    openSideBar = () => {
        this.setState({ sidebar: !this.state.sidebar })
    }

    changeMainComponent = (changed_component) => {
        this.setState({ main_component:changed_component,sidebar: !this.state.sidebar})
    }

    render() {
        let main_component 
        if(this.state.main_component == 'bio'){
            main_component = <CriminalBio/>
        }else if(this.state.main_component == 'education'){
            main_component = <PersonEducation/>
        }else if(this.state.main_component == 'employment'){
            main_component = <PersonEmployment/>
        }else if(this.state.main_component == 'crimes'){
            main_component = <CriminalCrimes/>
        }else if(this.state.main_component == 'relatives_friends'){
            main_component = <CriminalRelatives/>
        }else if(this.state.main_component == 'criminal_organizations'){
            main_component = <CriminalOrganizations/>
        }



        return (
            <Fragment>
                <SideBar closeSideBar={this.openSideBar} sideBarState={this.state.sidebar} changeMainComponent={this.changeMainComponent} />
                <button class="w3-button w3-white w3-xxlarge" onClick={this.openSideBar}>&#9776;</button>
                {/* <!-- Page Container --> */}
                <div className="w3-content w3-margin-top" style={{ maxWidth: "1400px" }}>

                    {/* <!-- The Grid --> */}
                    <div className="w3-row-padding">

                        {/* <!-- Left Column --> */}
                        <div className="w3-third">

                            <div className="w3-white w3-text-grey w3-card-4">
                                <div className="w3-display-container">
                                    <img src="/assets/avatar_hat.jpg" style={{ width: "100%" }} alt="Avatar" />
                                    <div className="w3-display-bottomleft w3-container w3-text-black">
                                        <h2>Jane Doe</h2>
                                    </div>
                                </div>
                                <div className="w3-container">
                                    <p><i className="fa fa-briefcase fa-fw w3-margin-right w3-large w3-text-teal"></i></p>
                                    <p><i className="fa fa-home fa-fw w3-margin-right w3-large w3-text-teal"></i>London, UK</p>
                                    <p><i className="fa fa-envelope fa-fw w3-margin-right w3-large w3-text-teal"></i>ex@mail.com</p>
                                    <p><i className="fa fa-phone fa-fw w3-margin-right w3-large w3-text-teal"></i>1224435534</p>
                                    <hr />

                                    <p className="w3-large"><b><i className="fa fa-asterisk fa-fw w3-margin-right w3-text-teal"></i>Skills</b></p>
                                    <p>Adobe Photoshop</p>
                                    <div className="w3-light-grey w3-round-xlarge w3-small">
                                        <div className="w3-container w3-center w3-round-xlarge w3-teal" style={{ width: "90%" }}>90%</div>
                                    </div>
                                    <p>Photography</p>
                                    <div className="w3-light-grey w3-round-xlarge w3-small">
                                        <div className="w3-container w3-center w3-round-xlarge w3-teal" style={{ width: "80%" }}>
                                            <div className="w3-center w3-text-white">80%</div>
                                        </div>
                                    </div>
                                    <p>Illustrator</p>
                                    <div className="w3-light-grey w3-round-xlarge w3-small">
                                        <div className="w3-container w3-center w3-round-xlarge w3-teal" style={{ width: "75%" }}>75%</div>
                                    </div>
                                    <p>Media</p>
                                    <div className="w3-light-grey w3-round-xlarge w3-small">
                                        <div className="w3-container w3-center w3-round-xlarge w3-teal" style={{ width: "50%" }}>50%</div>
                                    </div>
                                    <br />

                                    <p className="w3-large w3-text-theme"><b><i className="fa fa-globe fa-fw w3-margin-right w3-text-teal"></i>Languages</b></p>
                                    <p>English</p>
                                    <div className="w3-light-grey w3-round-xlarge">
                                        <div className="w3-round-xlarge w3-teal" style={{ height: "24px;width:100%" }}></div>
                                    </div>
                                    <p>Spanish</p>
                                    <div className="w3-light-grey w3-round-xlarge">
                                        <div className="w3-round-xlarge w3-teal" style={{ height: "24px;width:55%" }}></div>
                                    </div>
                                    <p>German</p>
                                    <div className="w3-light-grey w3-round-xlarge">
                                        <div className="w3-round-xlarge w3-teal" style={{ height: "24px;width:25%" }}></div>
                                    </div>
                                    <br />
                                </div>
                            </div><br />

                            {/* <!-- End Left Column --> */}
                        </div>

                        {/* <!-- Right Column --> */}
                        <div className="w3-twothird">
                            {main_component}
                            {/* <!-- End Right Column --> */}
                        </div>

                        {/* <!-- End Grid --> */}
                    </div>

                    {/* <!-- End Page Container --> */}
                </div>

                <footer className="w3-container w3-teal w3-center w3-margin-top">
                    <p>Powered by <a href="https://www.w3schools.com/w3css/default.asp" target="_blank">w3.css</a></p>
                </footer>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({

})



export default connect(mapStateToProps, null)(CriminalDetailedPage)
