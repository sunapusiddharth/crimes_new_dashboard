import React from 'react'
import { connect } from "react-redux";
import { Modal} from 'react-bootstrap'
import IncidentModalTabs from './IncidentModalTabs';
import '../../../styles/incident_modal.css'


function IncidentModal(props) {
    return (
        <>
            <Modal
                show={props.show}
                onHide={() => props.setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="incident-modal"
                className="incident_modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Incident Summary
            </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <IncidentModalTabs/>
                </Modal.Body>
            </Modal>
        </>
    );
}

const mapStateToProps = state => ({

})
export default connect(mapStateToProps, null)(IncidentModal)