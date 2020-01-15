import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getIndividualPosts,addBlogComment } from '../../../actions/departmentActions';
import { CardColumns, Card } from 'react-bootstrap'
import PageLoader from '../../../common/PageLoader';
import faker from 'faker'
import { strip } from '../../../helpers/text_helper';
import '../../../styles/detailed_post.css'
import { Form } from 'react-bootstrap'
import Comments from './Comments'

class DetailedPost extends Component {


    componentDidMount() {
        let post_id = this.props.match.params.post_id
        this.props.dispatch(getIndividualPosts(post_id))
    }


    likeFunction = (e) => {
        //fire up a reducer which will increment the likes count
    }

    addComment = (event)=>{
        event.preventDefault()
        this.props.dispatch(addBlogComment(event.target.elements.comment.value))
        // department_post_id,comment,parent_slug,author_id
        // debugger;
    }

    render() {
        if (this.props.post_loading) {
            return <PageLoader loading={this.props.all_posts_loading} />
        } else {
            if (!Object.keys(this.props.post).length) {
                return <div classNameName="no_results" >No Results</div>
            }
            let posts = this.props.post
            let { attachments, body, changed, component, image, teaser, title, topic, url, uuid } = posts
            let blog_image = image.length ? image : faker.random.image()
            var d = new Date(changed * 1000);
            let dateString = `${d.getMonth()} ${d.getDay()},${d.getFullYear()}`
            let cleanedBody = strip(body)

            return (
                <div className="w3-light-grey w3-content" style={{ maxWidth: "1600px" }}>

                    {/* <!-- !PAGE CONTENT! --> */}
                    <div className="w3-main">
                        <div className="w3-container w3-white w3-margin w3-padding-large">
                            <div className="w3-center">
                                <h5>{title} <span className="w3-opacity">{dateString}</span></h5>
                            </div>

                            <div className="w3-justify">
                                {/* <img src={blog_image} alt="Girl Hat" style={{ width: "100%", maxHeight: "400px" }} className="w3-padding-16" /> */}
                                <p>{cleanedBody}</p>
                                {/* <p className="w3-left"><button className="w3-button w3-white w3-border" onClick={this.likeFunction}> {this.state.liked ? '✓ Liked' : (<b><i className="fa fa-thumbs-up"></i>Like</b>)}</button></p> */}
                                <p className="w3-right"><button className="w3-button w3-black" id="myBtn"><b>Replies  </b> <span className="w3-tag w3-white">1</span></button></p>
                                <p className="w3-clear"></p>
                                <div className="w3-row w3-margin-bottom" id="demo1">
                                    <hr />
                                    <Form onSubmit={this.addComment}>
                                        <Form.Group controlId="comment">
                                            <Form.Label>Add Comment</Form.Label>
                                            <Form.Control type="text" placeholder="Add a comment" />
                                        </Form.Group>
                                    </Form>
                                    <Comments/>
                                </div>
                            </div>
                        </div>
                        <hr />
                        {/* <!-- Footer --> */}
                        <footer className="w3-container w3-padding-32 w3-dark-grey">
                            <div className="w3-row-padding">
                                <h3>FOOTER</h3>
                                <p>Praesent tincidunt sed tellus ut rutrum. Sed vitae justo condimentum, porta lectus vitae, ultricies congue gravida diam non fringilla.</p>
                                <p>Powered by <a href="https://www.w3schools.com/w3css/default.asp" target="_blank">w3.css</a></p>
                            </div>
                        </footer>
                        {/* <!-- End page content --> */}
                    </div>
                </div>

            )
        }
    }
}

const mapStateToProps = (state) => ({
    post: state.departmentReducer.post,
    post_loading: state.departmentReducer.post_loading,
    post_comments: state.departmentReducer.post_comments,
})

export default connect(mapStateToProps, null)(DetailedPost)