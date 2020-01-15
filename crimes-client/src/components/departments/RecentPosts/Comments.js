import React from 'react'
import Comment from './Comment'
import { connect } from 'react-redux'

function Comments(props) {
    console.log("called in again")
    return (
        <div className="comments">
            <ul className="comment_ul">
            {props.post_comments && props.post_comments.map(comment => <Comment comment={comment}/>)}
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => ({
    post_comments: state.departmentReducer.post_comments,
})

export default connect(mapStateToProps, null)(Comments)