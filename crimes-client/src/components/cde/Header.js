import React, { Fragment } from 'react'

export default function Header(props) {
    return (
        <Fragment>
            <div className="">
                <div className="w3-bar w3-white w3-card" id="myNavbar">
                    <a href="#home" className="w3-bar-item w3-button w3-wide">LOGO</a>
                    {/* <!-- Right-sided navbar links --> */}
                    <div className="w3-right w3-hide-small">
                        <a href="#about" className="w3-bar-item w3-button">ABOUT</a>
                        <a href="#team" className="w3-bar-item w3-button"><i className="fa fa-user"></i> TEAM</a>
                        <a href="#work" className="w3-bar-item w3-button"><i className="fa fa-th"></i> WORK</a>
                        <a href="#pricing" className="w3-bar-item w3-button"><i className="fa fa-usd"></i> PRICING</a>
                        <a href="#contact" className="w3-bar-item w3-button"><i className="fa fa-envelope"></i> CONTACT</a>
                    </div>
                </div>
            </div>
            <nav class="w3-sidebar w3-bar-block w3-black w3-card w3-animate-left w3-hide-medium w3-hide-large" style={{ display: "none" }} id="mySidebar">
                <a href="javascript:void(0)" onclick="w3_close()" className="w3-bar-item w3-button w3-large w3-padding-16">Close ×</a>
                <a href="#about" onclick="w3_close()" className="w3-bar-item w3-button">ABOUT</a>
                <a href="#team" onclick="w3_close()" className="w3-bar-item w3-button">TEAM</a>
                <a href="#work" onclick="w3_close()" className="w3-bar-item w3-button">WORK</a>
                <a href="#pricing" onclick="w3_close()" className="w3-bar-item w3-button">PRICING</a>
                <a href="#contact" onclick="w3_close()" className="w3-bar-item w3-button">CONTACT</a>
            </nav>
        </Fragment>
    )
}
