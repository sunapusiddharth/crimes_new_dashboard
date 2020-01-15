import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Form } from 'react-bootstrap'
import { addBlogComment } from '../../../actions/departmentActions';

const Comment = (props) => {

    const submitReply = (event) => {
        event.preventDefault()
        console.log("props=",props)
        props.dispatch(addBlogComment(event.target.elements.replyToComment.value,event.target.elements.replyToComment.getAttribute('full_slug')))
        // debugger
    }

    if (typeof props.comment == 'undefined') {
        return <div className="error">Error loading the comment</div>
    }
    let { posted,author, text,_id ,full_slug } = props.comment
    let date = new Date(posted)
    
    let errorClass = props.post_comment_status && props.post_comment_status == 'error'?'error':'success'
    console.log("erroClass=",props.post_comment_status)
    return (
        <li  key={_id}>
            {/* <div className="w3-col l2 m3"> */}
                {/* <img src={user_image} style={{ width: "90px" }} /> */}
                {/* image goes here */}
            {/* </div> */}
            <div className="">
                <h4>{author && author.name} <span className="w3-opacity w3-medium">{date.toLocaleDateString()}</span></h4>
                <p>{text}</p>
                <Form onSubmit={submitReply}>
                    <Form.Group controlId="replyToComment">
                        <Form.Label>Reply</Form.Label>
                        <div className={errorClass}>
                        <Form.Control type="text" isValid={props.post_comment_status == 'success'} placeholder="reply to this comment" full_slug={full_slug}/>
                        </div>
                    </Form.Group>
                </Form>
            </div>
            <hr />
            {props.comment.comment ? <ul className="comment_ul"><span className="tab_space">space here </span>{props.comment.comment.map(comment=><Comment dispatch={props.dispatch} post_comment_status={props.post_comment_status} post_comments={props.post_comments} comment={comment}/>)}</ul>:''}
        </li>
    )
}

const mapStateToProps = (state) => ({
    post_comment_status: state.departmentReducer.post_comment_status,
    post_comments: state.departmentReducer.post_comments,
})

export default connect(mapStateToProps, null)(Comment)