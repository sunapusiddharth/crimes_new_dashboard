import React from 'react'
//contain sidebar for education , employment , prisons , cases , links to organizations , relatives and family , bio 
//criminal profile (suspects,accussed) - bio , crimes , prisons , links to org , relatives and family , properties ,external links ,death (optional),criminal career  
// victim - bio , education , employmnet , cases , relatives and family ,

export default function SideBar(props) {
    let sideBarClassName = props.sideBarState?'block':'none'
    console.log("sideBarClassName",sideBarClassName)
    return (
        <div className="w3-sidebar w3-bar-block w3-dark-grey w3-animate-left" style={{display:sideBarClassName}} id="mySidebar">
            <button className="w3-bar-item w3-button w3-large"
                onClick={props.closeSideBar}>Close &times;</button>
            <a href="#" className="w3-bar-item w3-button" onClick={()=>props.changeMainComponent('bio')}>Bio</a>
            <a href="#" className="w3-bar-item w3-button" onClick={()=>props.changeMainComponent('education')}>Education</a>
            <a href="#" className="w3-bar-item w3-button" onClick={()=>props.changeMainComponent('employment')}>Employment</a>
            <a href="#" className="w3-bar-item w3-button" onClick={()=>props.changeMainComponent('crimes')}>Crimes</a>
            <a href="#" className="w3-bar-item w3-button" onClick={()=>props.changeMainComponent('prisons')}>Prisons</a>
            <a href="#" className="w3-bar-item w3-button" onClick={()=>props.changeMainComponent('relatives_friends')}>Relatives/Family</a>
            <a href="#" className="w3-bar-item w3-button" onClick={()=>props.changeMainComponent('criminal_organizations')}>Criminal Organizations</a>
        </div>
    )
}