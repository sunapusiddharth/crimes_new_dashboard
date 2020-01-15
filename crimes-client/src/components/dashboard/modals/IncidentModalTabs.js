import React,{useState} from 'react'
import IncidentOverview from './IncidentOverview/IncidentOverview';
import InvestigationAnalysis from './InvestigationAnalysis';
import IncidentMedia from './IncidentMedia'
import InvestigationSummary from './InvestigationSummary'
import { Tab,Tabs} from 'react-bootstrap'
import IncidentRelatedPeople from './IncidentRelatedPeople';

export default function IncidentModalTabs() {
    const [key, setKey] = useState('summary');
  
    return (
      <Tabs id="controlled-tab-example" activeKey={key} onSelect={k => setKey(k)} className="crime_modal_tabs">
        <Tab eventKey="summary" title="Summary">
            <IncidentOverview/>   
        </Tab>
        <Tab eventKey="media" title="Media">
          <IncidentMedia/>
        </Tab>
        <Tab eventKey="incident_people" title="Incident People" className="incident_people">
          <IncidentRelatedPeople/>
        </Tab>
        <Tab eventKey="investigation_summary" title="Investigation Summary">
          <InvestigationSummary/>
        </Tab>
        <Tab eventKey="analysis" title="Analysis">
          <InvestigationAnalysis/>
        </Tab>
      </Tabs>
    );
  }