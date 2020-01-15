import React from 'react'
import '../styles/mega_menu.css'
import {Link} from 'react-router-dom'

export default function MegaMenu(props) {
    return (
        <div className="menu-wrapper">
            {props.currentUser ?  <ul class="nav mega_menu_nav">
                <li>
                    <a href="#">Coming Soon</a>
                    <div>
                        <div class="nav-column">
                            <h5>CDE</h5>
                            <ul>
                                <li><a href="#">All Pages by state for CDE</a></li>
                            </ul>
                        </div>

                        <div class="nav-column">
                            <h5>Personalised Home</h5>
                            <ul>
                                <li><a href="#">Your mails</a></li>
                                <li><a href="#">Current investigation(for investigator role)</a></li>
                                <li><a href="#">Recently watched crimes</a></li>
                                <li><a href="#">Recently viewed Departments</a></li>
                                <li><a href="#">Recently downloaded forms</a></li>
                            </ul>

                            <h5>Crimes</h5>
                            <ul>
                                <li><a href="#">Create Investigation Timeline for crime</a></li>
                                <li><a href="#">Live Map showing crimes committed in real time</a></li>
                            </ul>
                        </div>

                        <div class="nav-column">
                            <h5>Person</h5>
                            <ul>
                                <li><a href="#">Person Detail page</a></li>
                                <li><a href="#">Add Person Form</a></li>
                            </ul>
                        </div>
                    </div>
                </li>
                <li>
                <Link to="/cde">CDE</Link>
                    </li>
                <li>
                    <a href="#">Crimes</a>
                    <div>
                        <div class="nav-column">
                        <h5 class="grey"><Link to="/crimes">All Crimes</Link></h5>
                        <h5 class="grey"><Link to="/crimes/search">Search Crimes</Link></h5>
                            
                        </div>
                    </div>
                </li>
                <li>
                    <a href="#">Departments</a>
                    <div>
                        <div class="nav-column">
                        <h5 class="grey"><Link to="/departments">All Departments</Link></h5>
                        <h5 class="grey"><Link to="/departments/search">Search Departments</Link></h5>
                            </div>
                    </div>
                </li>
                <li>
                    <a href="#">Tables</a>
                    <div>
                        <div class="nav-column">
                        <h5 class="grey"><Link to="/table">All Crimes</Link></h5>
                        <h5 class="grey"><Link to="/tables">All tables</Link></h5>
                        <h5 class="grey"><Link to="/tables/denver_crimes">Denver Crimes</Link></h5>
                        <h5 class="grey"><Link to="/tables/boston_crimes">Boston Crimes</Link></h5>
                        </div>
                    </div>
                </li>
                <li>
                    <a href="#">Search</a>
                    <div>
                        <div class="nav-column">
                        <h5 class="grey"><Link to="/search/people">Search People</Link></h5>
                        <h5 class="grey"><Link to="/crimes/search">Search Crimes</Link></h5>
                        <h5 class="grey"><Link to="/search/forms">Search Forms</Link></h5>
                        <h5 class="grey"><Link to="/departments/search">Search Departments</Link></h5>
                        </div>
                    </div>
                </li>
                <li>
                    <a href="#">Report/Add</a>
                    <div>
                        <div class="nav-column">
                            <h5 class="grey"><Link to="/forms/add_crimes">Report Crime</Link></h5>
                            <h5 class="grey"><Link to="/">Add Person (coming soon)</Link></h5>
                            <h5 class="grey"><Link to="/">Add department (coming soon)</Link></h5>
                            <h5 class="grey"><Link to="/">Create News (coming soon)</Link></h5>
                        </div>
                    </div>
                </li>
                <li>
                    <a href="#">News</a>
                    <div>
                        <div class="nav-column">
                            <h5 class="grey"><Link to="/news">All News</Link></h5>
                            <h5 class="grey"><Link to="/news/search">Search News</Link></h5>
                        </div>
                    </div>
                </li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="#">Personalised Home </Link></li>
                <li><Link to="/">Home</Link></li>
                <li>
                    <a href="#">Maps</a>
                    <div>
                        <div class="nav-column">
                        <h5 class="grey"><Link to="/maps/crimes_heat_map">Crimes Heat Map</Link></h5>
                        </div>
                    </div>
                </li>
                <li>
                    <a href="#">People</a>
                    <div>
                        <div class="nav-column">
                        <h5 class="grey"><Link to="/people">All People</Link></h5>
                        <h5 class="grey"><Link to="/search/people">Search People</Link></h5>
                        </div>
                    </div>
                </li>
                {props.isAdmin && <li><Link to="/admin">Admin</Link></li>}
                <li onClick={props.logoutFn}><a href="#">Logout</a></li>
            </ul>:
             <ul class="nav mega_menu_nav">
             <li><Link to="/home">Home</Link></li>
             {props.isAdmin && <li><Link to="/admin">Admin</Link></li>}
             <li onClick={props.logoutFn}><a href="#">Logout</a></li>
         </ul>
       }
            </div>
    )
}
