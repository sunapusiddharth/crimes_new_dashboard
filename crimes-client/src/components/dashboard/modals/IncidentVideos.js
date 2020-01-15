import React, { Component ,Fragment} from 'react'
import {Modal} from 'react-bootstrap'

export default class IncidentVideos extends Component {
    constructor(){
        super()
        this.state={
            show_first_modal:true,
            show_second_modal:false
        }
    }
    
    showSecondModal =()=>{
        this.setState({show_first_modal:false,show_second_modal:true})
    }
    render() {
        return (
            <Fragment>
                <Modal
               show={this.state.show_first_modal}
               onHide={() => this.setState({show_first_modal:false,show_second_modal:false})}
                dialogClassName="modal-90w"
                aria-labelledby="incident-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Show first modal
            </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <button onClick={this.showSecondModal}>Show second modal</button>
                </Modal.Body>
            </Modal>

            {/* second modal for playing videos */}

            <Modal
                show={this.state.show_second_modal}
                onHide={() => this.setState({show_second_modal:false,show_first_modal:true})}
                dialogClassName="modal-90w"
                aria-labelledby="incident-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Second video modal
            </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                </Modal.Body>
            </Modal>
            </Fragment>
        )
    }
}
