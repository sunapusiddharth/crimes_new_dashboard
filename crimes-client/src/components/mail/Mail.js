import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../../styles/mail.css'
import MailBody from './MailBody';
import NewMail from './NewMail';
import Inbox from './Inbox';
import Drafts from './Drafts';
import Trash from './Trash';
import Sent from './Sent';


class Mail extends Component {

    constructor() {
        super()
        this.state = {
            show_modal: false,
            show_layout: 'inbox',
            show_single_mail: false,
            mails: {
                inbox: [
                    {
                        id: 1,
                        from: 'sidharth@drg.com',
                        to: 'my@gmail.com',
                        subject: 'some random subject',
                        date: '21/07/2019',
                        label: 'red',
                        folder: 'my_folder',
                        body: "Hello, i just wanted to let you know that i'll be home at lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
                    },
                    {
                        id: 1,
                        from: 'sidharth@drg.com',
                        to: 'my@gmail.com',
                        subject: 'some random subject',
                        date: '21/07/2019',
                        label: 'red',
                        folder: 'my_folder',
                        body: "Hello, i just wanted to let you know that i'll be home at lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
                    },
                    {
                        id: 1,
                        from: 'sidharth@drg.com',
                        to: 'my@gmail.com',
                        subject: 'some random subject',
                        date: '21/07/2019',
                        label: 'red',
                        folder: 'my_folder',
                        body: "Hello, i just wanted to let you know that i'll be home at lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
                    },
                    {
                        id: 1,
                        from: 'sidharth@drg.com',
                        to: 'my@gmail.com',
                        subject: 'some random subject',
                        date: '21/07/2019',
                        label: 'red',
                        folder: 'my_folder',
                        body: "Hello, i just wanted to let you know that i'll be home at lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
                    }
                ],
                sent: [
                    {
                        id: 1,
                        from: 'sidharth@drg.com',
                        to: 'my@gmail.com',
                        subject: 'some random subject',
                        date: '21/07/2019',
                        label: 'red',
                        folder: 'my_folder',
                        body: "Hello, i just wanted to let you know that i'll be home at lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
                    },
                    {
                        id: 1,
                        from: 'sidharth@drg.com',
                        to: 'my@gmail.com',
                        subject: 'some random subject',
                        date: '21/07/2019',
                        label: 'red',
                        folder: 'my_folder',
                        body: "Hello, i just wanted to let you know that i'll be home at lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
                    }
                ],
                drafts: [
                    {
                        id: 1,
                        from: 'sidharth@drg.com',
                        to: 'my@gmail.com',
                        subject: 'some random subject',
                        date: '21/07/2019',
                        label: 'red',
                        folder: 'my_folder',
                        body: "Hello, i just wanted to let you know that i'll be home at lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
                    },
                    {
                        id: 1,
                        from: 'sidharth@drg.com',
                        to: 'my@gmail.com',
                        subject: 'some random subject',
                        date: '21/07/2019',
                        label: 'red',
                        folder: 'my_folder',
                        body: "Hello, i just wanted to let you know that i'll be home at lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
                    }
                ],
                trash: [
                    {
                        id: 1,
                        from: 'sidharth@drg.com',
                        to: 'my@gmail.com',
                        subject: 'some random subject',
                        date: '21/07/2019',
                        label: 'red',
                        folder: 'my_folder',
                        body: "Hello, i just wanted to let you know that i'll be home at lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
                    },
                    {
                        id: 1,
                        from: 'sidharth@drg.com',
                        to: 'my@gmail.com',
                        subject: 'some random subject',
                        date: '21/07/2019',
                        label: 'red',
                        folder: 'my_folder',
                        body: "Hello, i just wanted to let you know that i'll be home at lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
                    }
                ]
            },
            checked: []
        }
    }


    checkMail = (e) => {
        let id = e.target.value
        this.setState({ ...this.state, checked: this.state.checked.concat(id) })
        console.log("checked=", this.state.checked)
    }

    newMessage = (e) => {
        console.log("inside new modal message")
        this.setState({ show_modal: !this.state.show_modal })
    }

    showLayout = (layout) => {

        this.setState({ show_layout: layout })
        console.log("hi here from show layout")
        console.log(layout)
    }

    showSingleMail = (e) => {
        this.setState({ show_single_mail: !this.state.show_single_mail })
    }

    render() {
        return (
            <div className="row">
                {/* <!-- Side Navigation --> */}
                <div className="col-md-2">
                    <nav className=" w3-sidebar w3-bar-block w3-white w3-card .w3-quarter" style={{ width: "120px" }} id="mySidebar">
                        <span href="#" className={`mail_icons w3-bar-item w3-button w3-dark-grey  w3-hover-black w3-left-align`} onClick={this.newMessage}>New Message <i className="w3-padding fa fa-pencil"></i></span>
                        <span href="#" className={`mail_icons w3-bar-item w3-button w3-dark-grey  w3-hover-black w3-left-align ${this.state.show_layout == 'inbox'?'active':''}`} onClick={() => this.showLayout('inbox')}>Inbox<i className="w3-padding fa fa-inbox"></i></span>
                        <span href="#" className={`mail_icons w3-bar-item w3-button w3-dark-grey  w3-hover-black w3-left-align ${this.state.show_layout == 'sent'?'active':''}`} onClick={() => this.showLayout('sent')}>Sent <i className="w3-padding fa fa-paper-plane"></i></span>
                        <span href="#" className={`mail_icons w3-bar-item w3-button w3-dark-grey  w3-hover-black w3-left-align ${this.state.show_layout == 'drafts'?'active':''}`} onClick={() => this.showLayout('drafts')}>Drafts <i className="w3-padding fa fa-hourglass-end"></i></span>
                        <span href="#" className={`mail_icons w3-bar-item w3-button w3-dark-grey  w3-hover-black w3-left-align ${this.state.show_layout == 'trash'?'active':''}`} onClick={() => this.showLayout('trash')}>Trash <i className="w3-padding fa fa-trash"></i></span>
                    </nav>
                </div>



                {this.state.show_modal && <NewMail show={this.state.show_modal} onHide={this.newMessage} />}
                {/* <!-- Overlay effect when opening the side navigation on small screens --> */}
                {this.state.show_single_mail ? <div className="col-md-10"><MailBody /></div> : <MailSwitcher mails={this.state.mails} show_layout={this.state.show_layout} />}

            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const MailSwitcher = (props) => {
    switch (props.show_layout) {
        case 'inbox':
            return <Inbox mails={props.mails.inbox} />
        case 'sent':
            return <Sent mails={props.mails.sent} />
        case 'drafts':
            return <Drafts mails={props.mails.drafts} />
        case 'trash':
            return <Trash mails={props.mails.trash} />
        default:
            return <Inbox mails={props.mails.inbox} />
    }
}

export default connect(mapStateToProps, null)(Mail)
