import React, { Fragment, Component } from 'react'
import CrimesNavigatorPerson from './CrimesNavigatorPerson';
import CriminalCrimeSummary from './CriminalCrimeSummary';
import { Card } from 'react-bootstrap'


//show a list of crimes cards (title date and address teaser) , on clicking it's respective details will be loaded with summary , photos expansion , investigation report download button show more link.
class CriminalCrimes extends Component {
    constructor() {
        super()
        this.state = {
            data: [
                'title 1',
                'title 2',
                'title 3',
                'title 4',
                'title 5',
                'title 6',
                'title 7',
                'title 8',

                
            ],
            summary_content_index: 0
        }
    }

    onSummaryContentChange = (index) => {
        console.log("index=",index)
        this.setState({ summary_content_index: index })
    }

    render() {
        return (
            <Fragment>
                <h4>Crimes Committed</h4>
                <CrimesNavigatorPerson data={this.state.data} onSummaryContentChange={this.onSummaryContentChange} />
                <Card className="crime_summary_card">
                    <CriminalCrimeSummary data={this.state.data[this.state.summary_content_index]} />
                </Card>
            </Fragment>
        )
    }

}

export default CriminalCrimes