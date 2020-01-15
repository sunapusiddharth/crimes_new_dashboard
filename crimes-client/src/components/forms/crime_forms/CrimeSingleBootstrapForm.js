import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import React, { Component, useState, Fragment } from 'react';
import { Button, Col, InputGroup, Row,Alert } from 'react-bootstrap'
import {connect} from 'react-redux'
import {saveCrimeSummaryValues} from '../../../actions/formActions'
import PageLoader from '../../../common/PageLoader'
// import '../../../styles/crime_forms.css'

// incident_number:"",address:"",offense_code:"",offense_code_group:"",offense_description:"",
//       district:"",reporting_area:"",schooting:"",occurence_on_date:"",ucr_part:"",street:"",title:"",description:"",
//       imageUrl:"",category:"",external_link:"",files:"",audios:"",videos:"",photos:"",judge:"",law:"",suspects:"",accussed:"",victims:""

class CrimeSingleBootstrapForm extends Component {
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
        // e.preventDefault();
        this.props.nextStep();
    };

    render() {
        
        // const { file } = this.props;
        const { loading, thumb } = this.state;
        const { incident_number, address, offense_code, offense_code_group, offense_description,
        district, reporting_area, schooting, occurence_on_date, ucr_part, street, title, description,
        imageUrl, category,file} = this.props
        return (
            <Fragment>

                {/* <Alert key="crime_summary_success" variant="success">Your values have been saved successfully</Alert>
                <Alert key="crime_summary_error" variant="danger">There was some error in saving your form please try again later</Alert> */}
                <Formik
                initialValues={{
                    incident_number, address, offense_code, offense_code_group, offense_description,
                    district, reporting_area, schooting, occurence_on_date, ucr_part, street, title, description,
                    imageUrl, category, file
                }}
                validationSchema={Yup.object({
                    address: Yup.string().required("Address must be added"),
                    occurence_on_date:  Yup.date().max(new Date(), "Only past or today's dates can be selected"),
                    title: Yup.string().required("Title must be added"),
                    description: Yup.string().required("Description must be added"),
                    file: Yup.mixed().required("Please upload image"),
                    // imageUrl: Yup.string().required("Image must be added"),
                    // category: Yup.string().required()    
                })}
                onSubmit={fields => {
                    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4))
                    this.props.dispatch(saveCrimeSummaryValues(fields))
                    this.continue()
                    // debugger
                    //save data to redux  !!!!
                    // let fileName = values.file.name
                    // let type = values.file.type
                    // let size = `${values.file.size} bytes`

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
                                <label htmlFor="firstName">Title</label>
                                <Field name="title" type="text" className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')} />
                                <ErrorMessage name="title" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <Field name="description" rows={10} component="textarea" className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')} />
                                <ErrorMessage name="description" component="div" className="invalid-feedback" />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="address">Address</label>
                                <Field name="address" type="text" className={'form-control' + (errors.address && touched.address ? ' is-invalid' : '')} />
                                <ErrorMessage name="address" component="div" className="invalid-feedback" />
                            </div>
                            <div className="row">
                                <div className="col-lg-4 col-md-4 col-sm-12">
                                <div className="form-group">
                                <label htmlFor="offense_code">offense_code</label>
                                <Field name="offense_code" type="text" className={'form-control'} />
                                {/* <ErrorMessage name="offense_code" component="div" className="invalid-feedback" /> */}
                            </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-12">
                                <div className="form-group">
                                <label htmlFor="offense_code_group">offense_code_group</label>
                                <Field name="offense_code_group" type="text" className={'form-control'} />
                                {/* <ErrorMessage name="offense_code_group" component="div" className="invalid-feedback" /> */}
                            </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-12">
                                <div className="form-group">
                                <label htmlFor="offense_description">offense_description</label>
                                <Field name="offense_description" type="text" className={'form-control'} />
                                {/* <ErrorMessage name="offense_description" component="div" className="invalid-feedback" /> */}
                            </div>
                                </div>
                            </div>
                          
                           
                            
                          <div className="row">
                          <div className="col-lg-4 col-md-4 col-sm-12">
                          <div className="form-group">
                                <label htmlFor="district">district</label>
                                <Field name="district" type="text" className={'form-control'} />
                                {/* <ErrorMessage name="district" component="div" className="invalid-feedback" /> */}
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-12">
                               
                            <div className="form-group">
                                <label htmlFor="reporting_area">reporting_area</label>
                                <Field name="reporting_area" type="text" className={'form-control'} />
                                {/* <ErrorMessage name="reporting_area" component="div" className="invalid-feedback" /> */}
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-12">
                          <div className="form-group">
                            <label htmlFor="occurence_on_date">Occurence Date</label>
                                <Field
                                    name="occurence_on_date"
                                    type="date"
                                    className={'form-control' + (errors.occurence_on_date && touched.occurence_on_date ? ' is-invalid' : '')}
                                />
                                <ErrorMessage name="occurence_on_date" component="div" className="invalid-feedback" />
                            </div>
                          </div>
                          </div>

                          <div className="row">
                          <div className="col-lg-4 col-md-4 col-sm-12">
                          <div className="form-group">
                                <label htmlFor="category" style={{ display: 'block' }}>
                                    Category
                            </label>
                                <select
                                    name="category"
                                    value={values.category}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    style={{ display: 'block' }}
                                >
                                    <option value="" label="Select a color" />
                                    <option value="red" label="red" />
                                    <option value="blue" label="blue" />
                                    <option value="green" label="green" />
                                </select>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-12">
                          <div className="form-group">
                                <label htmlFor="ucr_part">ucr_part</label>
                                <Field name="ucr_part" type="text" className={'form-control'} />
                                {/* <ErrorMessage name="ucr_part" component="div" className="invalid-feedback" /> */}
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-12">
                          <div className="form-group">
                                <label htmlFor="file">File upload</label>
                                <input id="file" name="file" type="file" onChange={(event) => {
                                    setFieldValue("file", event.currentTarget.files[0]);
                                }} className={'form-control' + (errors.file && touched.file ? ' is-invalid' : '')} />
                                <Thumb file={values.file} />
                                <ErrorMessage name="ucr_part" component="div" className="invalid-feedback" />
                            </div>
                          </div>
                          </div>
                           
                          
                           

                           

                          

                            <div className="form-group">
                                <button type="submit" className="btn btn-primary mr-2">Add incident related media</button>
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
    address:state.formReducer.address,
    category:state.formReducer.category,
    description:state.formReducer.description,
    district:state.formReducer.district,
    file:state.formReducer.file,
    incident_number:state.formReducer.incident_number,
    occurence_on_date:state.formReducer.occurence_on_date,
    offense_code:state.formReducer.offense_code,
    offense_code_group:state.formReducer.offense_code_group,
    offense_description:state.formReducer.offense_description,
    reporting_area:state.formReducer.reporting_area,
    schooting:state.formReducer.schooting,
    street:state.formReducer.street,
    title:state.formReducer.title,
    ucr_part:state.formReducer.ucr_part
})

export default connect(mapStateToProps,null)(CrimeSingleBootstrapForm)


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