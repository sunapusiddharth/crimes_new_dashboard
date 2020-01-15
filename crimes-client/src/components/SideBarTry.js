import React, { Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
import '../styles/sidebar.css'



const  items = [
    {name:"Home",link:'/'},
    {name:"Dashboard",link:'/dashboard'},
    {name:"Crimes",link:'/crimes'},
    {name:"Departments",link:'/departments'},
    {name:"Investigation",link:'/investigation'},
    {name:"Maps",link:'/maps'},
    {name:"People",link:'/people'},
    {name:"Tables",link:'/tables'},
  ]
export default function SideBar() {
    return (
        <Fragment>
            <nav class="main-menu">
                <div>
                    <a class="logo" href="http://startific.com">
                    </a>
                </div>
                <div class="settings"></div>
                <div class="scrollbar" id="style-1">
                    <ul>
                        {Object.keys(items).map(item=>(
                            <li>
                                <Link to={items[item].link}>
                                    <i class="fa fa-home fa-lg"></i>
                                    <span class="nav-text">{items[item].name}</span>
                                </Link>
                        </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </Fragment>
    )
}
