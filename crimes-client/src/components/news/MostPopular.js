import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Media} from 'react-bootstrap'

export class MostPopular extends Component {
    render() {
        return (
            <div className="most_popular">
            <h3 className="pull-left">{this.props.title?this.props.title:'Most Popular'}</h3>
            <hr/>
            <br/>
            <ul className="list-unstyled">
                <Media as="li">
                    <img
                        width={64}
                        height={64}
                        className="mr-3"
                        src="/assets/background.jpg"
                        alt="Generic placeholder"
                    />
                    <Media.Body>
                        <h5>List-based media object</h5>
                        <p>
                            Cras sit amet nibh libero,.
  </p>
                    </Media.Body>
                </Media>

                <Media as="li">
                    <img
                        width={64}
                        height={64}
                        className="mr-3"
                        src="/assets/background.jpg"
                        alt="Generic placeholder"
                    />
                    <Media.Body>
                        <h5>List-based media object</h5>
                        <p>
                            Cras sit amet nibh libero
  </p>
                    </Media.Body>
                </Media>

                <Media as="li">
                    <img
                        width={64}
                        height={64}
                        className="mr-3"
                        src="/assets/background.jpg"
                        alt="Generic placeholder"
                    />
                    <Media.Body>
                        <h5>List-based media object</h5>
                        <p>
                            Cras sit amet nibh libero
                        </p>
                    </Media.Body>
                </Media>
            </ul>

        </div>
   
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(MostPopular)
