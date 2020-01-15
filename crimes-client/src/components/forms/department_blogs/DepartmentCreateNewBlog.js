import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import React, { Component, useState, Fragment } from 'react';
import { Button, Col, InputGroup, Row,Alert } from 'react-bootstrap'
import {connect} from 'react-redux'
import {saveDepartmentBlogToServer} from '../../../actions/formActions'
import PageLoader from '../../../common/PageLoader'

class DepartmentCreateNewBlog extends Component {
    constructor() {
        super()
        this.state = {
            loading: false,
            thumb: undefined,
        };
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (!nextProps.file) { return; }

        this.setState({ loading: true }, () => {
            let reader = new FileReader();

            reader.onloadend = () => {
                this.setState({ loading: false, thumb: reader.result });
            };

            reader.readAsDataURL(nextProps.file);
        });
    }

    continue = e => {
        //actually submission 
        // e.preventDefault();
        // this.props.nextStep();
    };

    render() {
        const { loading, thumb } = this.state;
        const {title,body,file} = this.props
        return (
            <Fragment>
                {/* <Alert key="crime_summary_success" variant="success">Your values have been saved successfully</Alert>
                <Alert key="crime_summary_error" variant="danger">There was some error in saving your form please try again later</Alert> */}
                <Formik
                initialValues={{
                    title,body,file
                }}
                validationSchema={Yup.object({
                    title: Yup.string().required("Title must be added"),
                    body: Yup.string().required("body must be added"),
                    file: Yup.mixed().required("Please upload image"),
                })}
                onSubmit={fields => {
                    alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4))
                    this.props.dispatch(saveDepartmentBlogToServer(fields))
                }}
                render={({ values,
                    touched,
                    errors,
                    dirty,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                    handleReset }) => (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <Field name="title" type="text" className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')} />
                                <ErrorMessage name="title" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="body">Body</label>
                                <Field name="body" rows={10} component="textarea" className={'form-control' + (errors.body && touched.body ? ' is-invalid' : '')} />
                                <ErrorMessage name="body" component="div" className="invalid-feedback" />
                            </div>
                          <div className="form-group">
                                <label htmlFor="file">Images upload</label>
                                <input id="file" name="file" type="file" onChange={(event) => {
                                    setFieldValue("file", event.currentTarget.files[0]);
                                }} className={'form-control' + (errors.file && touched.file ? ' is-invalid' : '')} />
                                <Thumb file={values.file} />
                                <ErrorMessage name="file" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary mr-2">Push data to server</button>
                                {/* <button type="reset" className="btn btn-secondary">Reset</button> */}
                            </div>
                        </Form>
                    )}
            />
            </Fragment>
            
        )
    }
}

const mapStateToProps = state=>({
   
})

export default connect(mapStateToProps,null)(DepartmentCreateNewBlog)


class Thumb extends React.Component {
    state = {
        loading: false,
        thumb: undefined,
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (!nextProps.file) { return; }

        this.setState({ loading: true }, () => {
            let reader = new FileReader();

            reader.onloadend = () => {
                this.setState({ loading: false, thumb: reader.result });
            };

            reader.readAsDataURL(nextProps.file);
        });
    }

    render() {
        const { file } = this.props;
        const { loading, thumb } = this.state;

        if (!file) { return null; }

        if (loading) { return <p>loading...</p>; }

        return (<img src={thumb}
            alt={file.name}
            className="img-thumbnail mt-2"
            height={200}
            width={200} />);
    }
}