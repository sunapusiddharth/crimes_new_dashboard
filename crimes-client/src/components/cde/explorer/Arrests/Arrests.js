import React from 'react'
import JuvenileSummaryChart from './JuvenileSummaryChart';
import AdultSummaryChart from './AdultSummaryChart';
import NationalSummaryChart from './NationalSummaryChart';
import NatinalSummaryPieChart from './NatinalSummaryPieChart';
import DrugSummaryPieChart from './DrugSummaryPieChart';


export default function Arrests() {
    return (
        <div>
            <h3>Arrests Summary</h3>
            <p>Shows the summary of arrest made in US by different categories (all the figures aare in thousands).Use dropdown to change year.</p>
            <NationalSummaryChart />
            <br />
            <br />
            <p>Shows the above data in Pie chart form to show which category accounted the most in a certain year.</p>
            <NatinalSummaryPieChart />
            <hr />
            <h3>Arrests Drug  Summary</h3>
            <p>Shows all the arrests made during a particular year and the different categories accounting  to the total number.Click on the legends to drill down to see more detailed data.</p>
            <DrugSummaryPieChart />
            <hr />
            <h3>Arrests Juvenile Summary</h3>
            <p>Summary of juvenile arrests made with data for males, females and total arrests made by different agencies.Click on the legends to drill down in order to see more detailed data</p>
            <hr />
            <JuvenileSummaryChart />
            <h3>Arrests Adult Summary</h3>
            <p>Summary of adult arrests made with data for males, females and total arrests made by different agencies.Click on the legends to drill down in order to see more detailed data</p>
            <hr />
            <AdultSummaryChart />
        </div>
    )
}
