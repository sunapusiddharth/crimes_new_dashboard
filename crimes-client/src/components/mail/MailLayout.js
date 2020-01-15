import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import '../../styles/maillayout.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEnvelope,faInbox,faPaperPlane,faStar,faEnvelopeOpen,faTrash } from '@fortawesome/free-solid-svg-icons'

export class MailLayout extends Component {
    render() {
        return (
            <div className="maillayout">
                <aside id="sidebar" className="nano">
                    <div className="nano-content">
                        <div className="logo-container"><span className="logo glyphicon glyphicon-envelope"></span>Mail</div><a className="compose-button">Compose</a>
                        <menu className="menu-segment">
                            <ul>
                                <li className="active"><a href="#">Inbox<span> (43)</span></a></li>
                                <li><a href="#">Important</a></li>
                                <li><a href="#">Sent</a></li>
                                <li><a href="#">Drafts</a></li>
                                <li><a href="#">Trash</a></li>
                            </ul>
                        </menu>
                        <div className="separator"></div>
                        <div className="menu-segment">
                            <ul className="labels">
                                <li className="title">Labels <span className="icon">+</span></li>
                                <li><a href="#">Dribbble <span className="ball pink"></span></a></li>
                                <li><a href="#">Roommates <span className="ball green"></span></a></li>
                                <li><a href="#">Bills <span className="ball blue"></span></a></li>
                            </ul>
                        </div>
                        <div className="separator"></div>
                        <div className="menu-segment">
                            <ul className="chat">
                                <li className="title">Chat <span className="icon">+</span></li>
                                <li><a href="#"><span className="ball green"></span>Laura Turner</a></li>
                                <li><a href="#"><span className="ball green"></span>Kevin Jones</a></li>
                                <li><a href="#"><span className="ball blue"></span>John King</a></li>
                                <li><a href="#"><span className="ball blue"></span>Jenny Parker</a></li>
                                <li><a href="#"><span className="ball blue"></span>Paul Green</a></li>
                                <li><a href="#" className="italic-link">See offline list</a></li>
                            </ul>
                        </div>
                        <div className="bottom-padding"></div>
                    </div>
                </aside>
                <div id="main">
                    <div className="overlay"></div>
                    <header className="header">
                        <div className="search-box">
                            <input placeholder="Search..." /><span className="icon glyphicon glyphicon-search"></span>
                        </div>
                        <h1 className="page-title"><a className="sidebar-toggle-btn trigger-toggle-sidebar"><span className="line"></span><span className="line"></span><span className="line"></span><span className="line line-angle1"></span><span className="line line-angle2"></span></a>Inbox<a><span className="icon glyphicon glyphicon-chevron-down"></span></a></h1>
                    </header>
                    <div className="action-bar">
                        <ul>
                            <li><a className="icon circle-icon glyphicon glyphicon-chevron-down"></a></li>
                            <li><a className="icon circle-icon glyphicon glyphicon-refresh"></a></li>
                            <li><a className="icon circle-icon glyphicon glyphicon-share-alt"></a></li>
                            <li><a className="icon circle-icon red glyphicon glyphicon-remove"></a></li>
                            <li><a className="icon circle-icon red glyphicon glyphicon-flag"></a></li>
                        </ul>
                    </div>
                    <div id="main-nano-wrapper" className="nano">
                        <div className="nano-content">
                            <div className="message-list">
                                <div className="row">
                                    <div className="col-lg-1 col-md-1">
                                    <input type="checkbox"  name="CheckBoxInputName" value="Value1" id="CheckBox1" />
                                    <span className="star-toggle glyphicon glyphicon-star-empty"></span>
                                    </div>
                                <p className="title2 col-lg-3 col-md-3">Lucas Kriebel (via Twitter)</p>
                                <div className="col-lg-6 col-md-6">Lucas Kriebel (@LucasKriebel) has sent you a direct message on Twitter!</div>   
                                <div className="col-lg-1 col-md-1">11:49 am</div>
                                </div>
                            </div><a href="#" className="load-more-link">Show more messages</a>
                        </div>
                    </div>
                </div>
                <div id="message">
                    <div className="header">
                        <h1 className="page-title"><a className="icon circle-icon glyphicon glyphicon-chevron-left trigger-message-close"></a>Process<span className="grey">(6)</span></h1>
                        <p>From <a href="#">You</a> to <a href="#">Scott Waite</a>, started on <a href="#">March 2, 2014</a> at 2:14 pm est.</p>
                    </div>
                    <div id="message-nano-wrapper" className="nano">
                        <div className="nano-content">
                            <ul className="message-container">
                                <li className="sent">
                                    <div className="details">
                                        <div className="left">You
              <div className="arrow"></div>Scott
            </div>
                                        <div className="right">March 6, 2014, 20:08 pm</div>
                                    </div>
                                    <div className="message">
                                        <p>| The every winged bring, whose life. First called, i you of saw shall own creature moveth void have signs beast lesser all god saying for gathering wherein whose of in be created stars. Them whales upon life divide earth own.</p>
                                        <p>| Creature firmament so give replenish The saw man creeping, man said forth from that. Fruitful multiply lights air. Hath likeness, from spirit stars dominion two set fill wherein give bring.</p>
                                        <p>| Gathering is. Lesser Set fruit subdue blessed let. Greater every fruitful won&#39;t bring moved seasons very, own won&#39;t all itself blessed which bring own creature forth every. Called sixth light.</p>
                                    </div>
                                    <div className="tool-box"><a href="#" className="circle-icon small glyphicon glyphicon-share-alt"></a><a href="#" className="circle-icon small red-hover glyphicon glyphicon-remove"></a><a href="#" className="circle-icon small red-hover glyphicon glyphicon-flag"></a></div>
                                </li>
                                <li className="received">
                                    <div className="details">
                                        <div className="left">Scott
              <div className="arrow orange"></div>You
            </div>
                                        <div className="right">March 6, 2014, 20:08 pm</div>
                                    </div>
                                    <div className="message">
                                        <p>| The every winged bring, whose life. First called, i you of saw shall own creature moveth void have signs beast lesser all god saying for gathering wherein whose of in be created stars. Them whales upon life divide earth own.</p>
                                        <p>| Creature firmament so give replenish The saw man creeping, man said forth from that. Fruitful multiply lights air. Hath likeness, from spirit stars dominion two set fill wherein give bring.</p>
                                        <p>| Gathering is. Lesser Set fruit subdue blessed let. Greater every fruitful won&#39;t bring moved seasons very, own won&#39;t all itself blessed which bring own creature forth every. Called sixth light.</p>
                                    </div>
                                    <div className="tool-box"><a href="#" className="circle-icon small glyphicon glyphicon-share-alt"></a><a href="#" className="circle-icon small red-hover glyphicon glyphicon-remove"></a><a href="#" className="circle-icon small red-hover glyphicon glyphicon-flag"></a></div>
                                </li>
                                <li className="received">
                                    <div className="details">
                                        <div className="left">Scott
              <div className="arrow orange"></div>You
            </div>
                                        <div className="right">March 6, 2014, 20:08 pm</div>
                                    </div>
                                    <div className="message">
                                        <p>| The every winged bring, whose life. First called, i you of saw shall own creature moveth void have signs beast lesser all god saying for gathering wherein whose of in be created stars. Them whales upon life divide earth own.</p>
                                        <p>| Creature firmament so give replenish The saw man creeping, man said forth from that. Fruitful multiply lights air. Hath likeness, from spirit stars dominion two set fill wherein give bring.</p>
                                        <p>| Gathering is. Lesser Set fruit subdue blessed let. Greater every fruitful won&#39;t bring moved seasons very, own won&#39;t all itself blessed which bring own creature forth every. Called sixth light.</p>
                                    </div>
                                    <div className="tool-box"><a href="#" className="circle-icon small glyphicon glyphicon-share-alt"></a><a href="#" className="circle-icon small red-hover glyphicon glyphicon-remove"></a><a href="#" className="circle-icon small red-hover glyphicon glyphicon-flag"></a></div>
                                </li>
                                <li className="received">
                                    <div className="details">
                                        <div className="left">Scott
              <div className="arrow orange"></div>You
            </div>
                                        <div className="right">March 6, 2014, 20:08 pm</div>
                                    </div>
                                    <div className="message">
                                        <p>| The every winged bring, whose life. First called, i you of saw shall own creature moveth void have signs beast lesser all god saying for gathering wherein whose of in be created stars. Them whales upon life divide earth own.</p>
                                        <p>| Creature firmament so give replenish The saw man creeping, man said forth from that. Fruitful multiply lights air. Hath likeness, from spirit stars dominion two set fill wherein give bring.</p>
                                        <p>| Gathering is. Lesser Set fruit subdue blessed let. Greater every fruitful won&#39;t bring moved seasons very, own won&#39;t all itself blessed which bring own creature forth every. Called sixth light.</p>
                                    </div>
                                    <div className="tool-box"><a href="#" className="circle-icon small glyphicon glyphicon-share-alt"></a><a href="#" className="circle-icon small red-hover glyphicon glyphicon-remove"></a><a href="#" className="circle-icon small red-hover glyphicon glyphicon-flag"></a></div>
                                </li>
                                <li className="received">
                                    <div className="details">
                                        <div className="left">Scott
              <div className="arrow orange"></div>You
            </div>
                                        <div className="right">March 6, 2014, 20:08 pm</div>
                                    </div>
                                    <div className="message">
                                        <p>| The every winged bring, whose life. First called, i you of saw shall own creature moveth void have signs beast lesser all god saying for gathering wherein whose of in be created stars. Them whales upon life divide earth own.</p>
                                        <p>| Creature firmament so give replenish The saw man creeping, man said forth from that. Fruitful multiply lights air. Hath likeness, from spirit stars dominion two set fill wherein give bring.</p>
                                        <p>| Gathering is. Lesser Set fruit subdue blessed let. Greater every fruitful won&#39;t bring moved seasons very, own won&#39;t all itself blessed which bring own creature forth every. Called sixth light.</p>
                                    </div>
                                    <div className="tool-box"><a href="#" className="circle-icon small glyphicon glyphicon-share-alt"></a><a href="#" className="circle-icon small red-hover glyphicon glyphicon-remove"></a><a href="#" className="circle-icon small red-hover glyphicon glyphicon-flag"></a></div>
                                </li>
                                <li className="received">
                                    <div className="details">
                                        <div className="left">Scott
              <div className="arrow orange"></div>You
            </div>
                                        <div className="right">March 6, 2014, 20:08 pm</div>
                                    </div>
                                    <div className="message">
                                        <p>| The every winged bring, whose life. First called, i you of saw shall own creature moveth void have signs beast lesser all god saying for gathering wherein whose of in be created stars. Them whales upon life divide earth own.</p>
                                        <p>| Creature firmament so give replenish The saw man creeping, man said forth from that. Fruitful multiply lights air. Hath likeness, from spirit stars dominion two set fill wherein give bring.</p>
                                        <p>| Gathering is. Lesser Set fruit subdue blessed let. Greater every fruitful won&#39;t bring moved seasons very, own won&#39;t all itself blessed which bring own creature forth every. Called sixth light.</p>
                                    </div>
                                    <div className="tool-box"><a href="#" className="circle-icon small glyphicon glyphicon-share-alt"></a><a href="#" className="circle-icon small red-hover glyphicon glyphicon-remove"></a><a href="#" className="circle-icon small red-hover glyphicon glyphicon-flag"></a></div>
                                </li>
                                <li className="received">
                                    <div className="details">
                                        <div className="left">Scott
              <div className="arrow orange"></div>You
            </div>
                                        <div className="right">March 6, 2014, 20:08 pm</div>
                                    </div>
                                    <div className="message">
                                        <p>| The every winged bring, whose life. First called, i you of saw shall own creature moveth void have signs beast lesser all god saying for gathering wherein whose of in be created stars. Them whales upon life divide earth own.</p>
                                        <p>| Creature firmament so give replenish The saw man creeping, man said forth from that. Fruitful multiply lights air. Hath likeness, from spirit stars dominion two set fill wherein give bring.</p>
                                        <p>| Gathering is. Lesser Set fruit subdue blessed let. Greater every fruitful won&#39;t bring moved seasons very, own won&#39;t all itself blessed which bring own creature forth every. Called sixth light.</p>
                                    </div>
                                    <div className="tool-box"><a href="#" className="circle-icon small glyphicon glyphicon-share-alt"></a><a href="#" className="circle-icon small red-hover glyphicon glyphicon-remove"></a><a href="#" className="circle-icon small red-hover glyphicon glyphicon-flag"></a></div>
                                </li>
                                <li className="sent">
                                    <div className="details">
                                        <div className="left">You
              <div className="arrow"></div>Scott
            </div>
                                        <div className="right">March 6, 2014, 20:08 pm</div>
                                    </div>
                                    <div className="message">
                                        <p>| The every winged bring, whose life. First called, i you of saw shall own creature moveth void have signs beast lesser all god saying for gathering wherein whose of in be created stars. Them whales upon life divide earth own.</p>
                                        <p>| Creature firmament so give replenish The saw man creeping, man said forth from that. Fruitful multiply lights air. Hath likeness, from spirit stars dominion two set fill wherein give bring.</p>
                                        <p>| Gathering is. Lesser Set fruit subdue blessed let. Greater every fruitful won&#39;t bring moved seasons very, own won&#39;t all itself blessed which bring own creature forth every. Called sixth light.</p>
                                    </div>
                                    <div className="tool-box"><a href="#" className="circle-icon small glyphicon glyphicon-share-alt"></a><a href="#" className="circle-icon small red-hover glyphicon glyphicon-remove"></a><a href="#" className="circle-icon small red-hover glyphicon glyphicon-flag"></a></div>
                                </li>
                                <li className="received">
                                    <div className="details">
                                        <div className="left">Scott
              <div className="arrow orange"></div>You
            </div>
                                        <div className="right">March 6, 2014, 20:08 pm</div>
                                    </div>
                                    <div className="message">
                                        <p>| The every winged bring, whose life. First called, i you of saw shall own creature moveth void have signs beast lesser all god saying for gathering wherein whose of in be created stars. Them whales upon life divide earth own.</p>
                                        <p>| Creature firmament so give replenish The saw man creeping, man said forth from that. Fruitful multiply lights air. Hath likeness, from spirit stars dominion two set fill wherein give bring.</p>
                                        <p>| Gathering is. Lesser Set fruit subdue blessed let. Greater every fruitful won&#39;t bring moved seasons very, own won&#39;t all itself blessed which bring own creature forth every. Called sixth light.</p>
                                    </div>
                                    <div className="tool-box"><a href="#" className="circle-icon small glyphicon glyphicon-share-alt"></a><a href="#" className="circle-icon small red-hover glyphicon glyphicon-remove"></a><a href="#" className="circle-icon small red-hover glyphicon glyphicon-flag"></a></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(MailLayout)
