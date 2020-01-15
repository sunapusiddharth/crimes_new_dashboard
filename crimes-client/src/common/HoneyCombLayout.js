import React, { Component } from 'react'
import '../styles/honeycomb_layout.css'

export default class HoneyCombLayout extends Component {

    render() {

        return (
            <div className="people_honeycomb_wrapper">
                <ul id="hexGrid">
                    {this.props.data.map(item => (
                        <li class="hex">
                            <div class="hexIn">
                                <a class="hexLink" href="#">
                                    <img src={item.image} alt="" />
                                    <h1>{item.title}</h1>
                                    <p>{item.email} {item.phone} {item.address}</p>
                                </a>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}
