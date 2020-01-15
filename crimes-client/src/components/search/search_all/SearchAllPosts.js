import React, { Component, Fragment,createRef } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
import { connect } from 'react-redux'
import { searchPosts } from '../../../actions/searchActions'
import PageLoader from '../../../common/PageLoader';
import PostCard from "./PostCard";
import { Badge } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';

const theme = createMuiTheme();

export class SearchAllPosts extends Component {
    constructor(props) {
        super(props);
        this.state = { offset: 0 };
        this.ref = createRef()
    }
    componentDidMount() {
        this.props.dispatch(searchPosts(this.props.query_word, [], 0, 5))
    }

    componentDidUpdate(prevProps,prevState){
        if(this.props.query_word != prevProps.query_word){
            this.props.dispatch(searchPosts(this.props.query_word, [], 0, 5))
            return false
        }
        return true
    }

    handleClick(offset) {
        this.setState({ offset })
        this.props.dispatch(searchPosts(this.props.query_word, [], offset, 5))
        this.ref.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        // debugger
    }

    render() {
        if (this.props.posts_loading) {
            return <PageLoader loading={this.props.posts_loading} />
        } else {
            let posts = this.props.posts && this.props.posts.hits && this.props.posts.hits.hits
            
            posts = !isNaN(posts) || typeof posts != 'undefined'?posts:[]  // incase there is no post above line will return 0.
            console.log("from posts all search ",posts)
            if (!posts.length) {
                return <div >No data </div>
            } else {
                return (
                    <MuiThemeProvider theme={theme} >
                        <Fragment>
                            <div   ref={this.ref}>
                                <ul  >
                                    {posts.map(post =>
                                        <div className="" key={post._id}>
                                            <PostCard data={post} />
                                        </div>
                                    )}
                                </ul>
                            </div>
                        </Fragment>
                        <Pagination
                            limit={5}
                            offset={this.props.offset_posts}
                            total={this.props.total_posts}
                            onClick={(e, offset) => this.handleClick(offset)}
                        />
                    </MuiThemeProvider>
                );
            }
        }
    }
}

const mapStateToProps = (state) => ({
    posts: state.searchReducer.posts,
    posts_loading: state.searchReducer.posts_loading,
    total_posts: state.searchReducer.total_posts,
    offset_posts: state.searchReducer.offset_posts,
    query_word:state.searchReducer.query_word
})

export default connect(mapStateToProps, null)(SearchAllPosts)
