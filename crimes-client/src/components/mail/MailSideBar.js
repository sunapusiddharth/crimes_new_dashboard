import React from 'react'
import '../../styles/maillayout_sidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEnvelope,faInbox,faPaperPlane,faStar,faEnvelopeOpen,faTrash } from '@fortawesome/free-solid-svg-icons'
import { faDraft2digital } from '@fortawesome/free-brands-svg-icons';

export default function MailSideBar() {
    return (
        <nav class="main-menu">
            <div className="sample"></div>
            <a class="compose-button">Compose</a>
            <ul>
                <li>
                    <a href="http://justinfarrow.com">
                    <FontAwesomeIcon icon={faInbox} size="2x" />
                        <span class="nav-text">
                        Inbox
                        </span>
                    </a>

                </li>
                <li class="has-subnav">
                    <a href="#">
                    <FontAwesomeIcon icon={faPaperPlane} size="2x" />
                        <span class="nav-text">
                            Sent
                        </span>
                    </a>
                </li>
                <li class="has-subnav">
                    <a href="#">
                    <FontAwesomeIcon icon={faStar} size="2x" />
                        <span class="nav-text">Star
                        </span>
                    </a>
                </li>
                <li class="has-subnav">
                    <a href="#">
                    <FontAwesomeIcon icon={faEnvelopeOpen} size="2x" />
                        <span class="nav-text">Drafts
                        </span>
                    </a>
                </li>
                <li class="has-subnav">
                    <a href="#">
                    <FontAwesomeIcon icon={faTrash}  size="2x"/>
                        <span class="nav-text">Trash
                        </span>
                    </a>
                </li>
            </ul>
        </nav>
    )
}
