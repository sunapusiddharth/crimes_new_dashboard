import React from 'react';
import {Card } from 'react-bootstrap'

import { userService, authenticationService } from '../services';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            userFromApi: null
        };
    }

    componentDidMount() {
        const { currentUser } = this.state;
        userService.getById(currentUser.id).then(userFromApi => this.setState({ userFromApi }));
    }

    render() {
        const { currentUser, userFromApi } = this.state;
        return (
            <div>
                <h1>Crime Explorer</h1>
                <p>A simplistic yet modern project built for people in different law organizations.This application also gives a very minimalistic overview of different 
                    work done  by me in the past few years.
                      
                    Project is divided into few different pieces which can be navigated using the Css megamenu present at the header.
                    Crimes: Purpose of this component is to view recent crimes commited.User can edit/view their crime add more info to an on going investigation, search for other related crimes and develop a pattern by linking different crimes together.
                    Person can regularly update their ongoing investigation in timeline series data.Upload files related to crime scene .Tag people criminal, relatives suspects etc to a crime.
                    Department : Different departments can be viewed in here .User can view their department, different bulletins speeches, blogs etc written by other users .Contains a full blog page with comments system included.User can also use this page to download different forms from other department which may be required for some paper filling purpose.
                    CDE: Crime Data Explorer shows different crimes commited in US.with different categorizations to help user study the data better .Different charts are provided to represent the data in more meaningful form.
                    tables : Showcases different tables with advance features like nested tables that show when row is expanded.Modals on row click, Filtering sorting,pagination,custom page selector.
                    Search: has differnt pages for searching in different parts of the application built using elasticsearch
                    Report/Add: consists of multi part forms to add/report different crimes.
                    News : Page built for displaying news related to crimes committed around the world.
                    Dashboard : Live dashboard built using Socket io and mongoDB chnage Streams . Purpose is to show different mails messsages or notifications related to crime .
                    Maps: different maps (yet to come)
                    People: Page for searching different people related to crime so that user can get more detailed info about a person with ability to search them.  User can search for criminals, victims, accussed ,relatives , judges and the police/law officials related to a case. 
                </p>
                <hr />
                <Card style={{ width: '90%' }}>
                    <Card.Body>
                        <Card.Title>Techincal overview</Card.Title>
                        <Card.Text>
                        Project is built using technologies:
                    frontend : React, Redux, Bootstrap , Material UI, D3, Highcharts
                    Backned : Node JS
                    Database: MongoDB
                    Cache: Redis
                    Search : Elasticsearch
                            </Card.Text>
                    </Card.Body>
                </Card>
                <Card style={{ width: '90%' }}>
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
    </Card.Text>
                        <Card.Link href="#">Card Link</Card.Link>
                        <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export { HomePage };