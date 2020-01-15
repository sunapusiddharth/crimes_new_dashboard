import React from 'react'
import Header from '../components/cde/Header';
import Summaary from '../components/cde/Summary';
import Maps from './Maps';
import BarChart from '../components/real_time_dashboard/charts/ChoroplethMap';
import '../styles/cde.css'
import Footer from '../components/cde/Footer';
import DropMenu from '../components/cde/DropMenu';
// import Choropleth from '../components/real_time_dashboard/charts/Choropleth';
import '../styles/cde.css'


export default function CDE() {
    return (
        <div className="cde_container">
            <Summaary />
            <br/>
            <br/>
            <DropMenu />
            <hr/>
            <BarChart width={700} height={700} />
            {/* <Choropleth/> */}
            <Footer />
        </div>
    )
}



