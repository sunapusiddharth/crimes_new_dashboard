import React from 'react'
import { Media} from 'react-bootstrap'

export default function Trash(props) {
    let mails = props.mails
    if (mails.length) {
        return <div className="col-md-10">
        {mails.map(mail => {
            let { id, from, to, subject, date, label, folder, body } = mail
            return (
                // <Link to={`/mail/${id}`}>
                <div className="row mail_list_item" onClick={props.showSingleMail}>
                    <div>
                        {/* <input type="checkbox"  
                        defaultChecked={props.checked.includes(id)}
                        onChange={props.checkMail}
                         value={id} style={{display:"inline-block"}}/> */}
                        <i style={{display:"inline-block"}} className="fa fa-star"></i>
                        <p style={{display:"inline-block"}}><strong>{from}</strong></p>
                    </div>
                    <div>
                        <strong>{subject}</strong>- {body.substr(0,70)}
                    </div>
                </div>
                // </Link>
            )
        })}
        </div>
    } else {
        return (<Media>
            <Media.Body>
                <p>You have no mails today.</p>
            </Media.Body>
        </Media>)
    }
}
