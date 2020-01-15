import React, { Component, createRef } from 'react'
import { connect } from 'react-redux'
import {changeSearchAllQueryKeyword}  from '../../../actions/searchActions'

export class SearchAllSearchBox extends Component {
    constructor() {
        super()
        this.input_ref = createRef()
    }

    submitForm = (event) => {
        let query_word = this.input_ref.current.value
        this.props.dispatch(changeSearchAllQueryKeyword(query_word))
        event.preventDefault()
    }

    render() {
        return (
            <section className="search_all search-sec">
                <form novalidate="novalidate" onSubmit={this.submitForm}>
                    <div className="row">
                        <div className="col-lg-9 col-md-9 col-sm-9 p-0">
                            <input type="text" id="input_query" ref={this.input_ref} className="form-control " placeholder="Search for crimes, departmentent, people, blogs, news, vacancies, speeches, forms..." />
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-3 p-0">
                            <button type="submit" className="btn btn-danger wrn-btn">Search</button>
                        </div>
                    </div>
                </form>
            </section>
        )
    }
}

const mapStateToProps = (state) => ({
 query_word:state.searchReducer.query_word
})

export default connect(mapStateToProps, null)(SearchAllSearchBox)
