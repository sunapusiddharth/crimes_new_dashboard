import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import React, { Component, useState, Fragment } from 'react';
import { Button, Col, InputGroup, Row } from 'react-bootstrap'
import Dropzone from "react-dropzone";
import { useDropzone } from 'react-dropzone'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import {connect} from 'react-redux'
import {saveCrimeMediaValues} from '../../../actions/formActions'
// import '../../../styles/crime_forms.css'

// incident_number:"",address:"",offense_code:"",offense_code_group:"",offense_description:"",
//       district:"",reporting_area:"",schooting:"",occurence_on_date:"",ucr_part:"",street:"",title:"",description:"",
//       imageUrl:"",category:"",external_link:"",files:"",audios:"",videos:"",photos:"",judge:"",law:"",suspects:"",accussed:"",victims:""

class IncidentForm extends Component {
    constructor() {
        super()
        this.state = {
            loading: false,
            thumb: undefined,

        };
    }

    continue = e => {
        // e.preventDefault();
        this.props.nextStep();
    };

    back = e => {
        // e.preventDefault();
        this.props.prevStep();
    };

    render() {
        const dropzoneStyle = {
            width: "20%",
            height: "150px",
            border: "1px solid black"
        };
        const dropzoneStyleActive = {
            width: "20%",
            height: "150px",
            border: "5px solid green"
        };
        const previewStyle = {
            display: 'inline',
            width: 100,
            height: 100,
        };
        console.log("hi_here",this.props.crime_files)
        return (
            <Formik
                initialValues={{
                    crime_files:this.props.crime_files?this.props.crime_files:[],
                    audios:this.props.audios?this.props.audios:[], videos: this.props.videos?this.props.videos:[], photos:this.props.photos?this.props.photos:[]
                }}
                validationSchema={Yup.object({
                    recaptcha: Yup.array(),
                    // imageUrl: Yup.string().required("Image must be added"),
                    // category: Yup.string().required()    
                })}
                onSubmit={fields => {
                    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4))
                    console.log("incident_form_data", fields)
                    this.props.dispatch(saveCrimeMediaValues(fields))
                    this.continue()
                    //on submit add fields to redux , for removing any file gieve a cross button . which will unset the file from the 
                    //redux or values object .
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
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Insert Files</label>
                                <FilesDropZone setFieldValue={setFieldValue} values={values} previewStyle={previewStyle} />
                            </div>
                            <div className="form-group">
                                <label>Insert Audio Clips</label>
                                <AudioDropZone setFieldValue={setFieldValue} values={values} previewStyle={previewStyle} />
                            </div>
                            <div className="form-group">
                                <label>Insert Video Clips</label>
                                <VideoDropZone setFieldValue={setFieldValue} values={values} previewStyle={previewStyle} />
                            </div>
                            <div className="form-group">
                                <label>Insert photos</label>
                                <PhotosDropZone setFieldValue={setFieldValue} values={values} previewStyle={previewStyle} />
                            </div>

                            <button type="submit" className="btn btn-primary">submit</button>
                        </form>
                    )}
            />
        )
    }
}



const FilesDropZone = (props) => {
    return <Dropzone accept="image/*" style={{
        width: "20%",
        height: "150px",
        border: "5px solid green"
    }}
        name="files_dropzone"
        activeStyle={{
            width: "20%",
            height: "150px",
            border: "1px solid black"
        }} multiple className="dropzone" onDrop={(acceptedFiles) => {
            // do nothing if no files
            if (acceptedFiles.length === 0) {
                debugger
                return;
            }
            acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            }))
            // on drop we add to the existing files
            props.setFieldValue("crime_files", props.values.crime_files.concat(acceptedFiles));
        }}>
        {({ getRootProps, getInputProps, isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
            console.log("input_props", getRootProps())
            return <Fragment>
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {!isDragActive && 'Click here or drop a file to upload!'}
                    {isDragActive && !isDragReject && "Drop it like it's hot!"}
                    {isDragReject && "File type not accepted, sorry!"}
                </div>
                <div className="row">
                    {props.values.crime_files.length > 0 && props.values.crime_files.map((file) => {
                        console.log("file_drop", file)
                        return <Fragment>
                            <div class="img-wrap">
                                <span class="close"><FontAwesomeIcon icon={faTrash} /></span>
                                <img
                                    alt="Preview"
                                    key={file.preview}
                                    src={file.preview}
                                    style={props.previewStyle}
                                />
                            </div>
                        </Fragment>
                    })}
                </div>
            </Fragment>
        }}
    </Dropzone>

}

const AudioDropZone = (props) => {
    return <Dropzone accept="audio/*" style={{
        width: "20%",
        height: "150px",
        border: "5px solid green"
    }}
        name="audio_dropzone"
        activeStyle={{
            width: "20%",
            height: "150px",
            border: "1px solid black"
        }} multiple className="dropzone" onDrop={(acceptedFiles) => {
            // do nothing if no files
            if (acceptedFiles.length === 0) {
                debugger
                return;
            }
            acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            }))
            // on drop we add to the existing files
            props.setFieldValue("audios", props.values.audios.concat(acceptedFiles));
        }}>
        {({ getRootProps, getInputProps, isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
            console.log("input_props", getRootProps())
            return <Fragment>
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {!isDragActive && 'Click here or drop a audio clip to upload!'}
                    {isDragActive && !isDragReject && "Drop it like it's hot!"}
                    {isDragReject && "File type not accepted, sorry!"}
                </div>
                <div className="row">
                    {props.values.audios.length > 0 && props.audios.files.map((file) => {
                        return <Fragment>
                            <div class="img-wrap">
                                <span class="close"><FontAwesomeIcon icon={faTrash} /></span>
                                <img
                                    alt="Preview"
                                    key={file.preview}
                                    src={file.preview}
                                    style={props.previewStyle}
                                />
                            </div>
                        </Fragment>
                    })}
                </div>
                }
            </Fragment>
        }}
    </Dropzone>

}

const VideoDropZone = (props) => {
    return <Dropzone accept="video/*" style={{
        width: "20%",
        height: "150px",
        border: "5px solid green"
    }}
        name="video_dropzone"
        activeStyle={{
            width: "20%",
            height: "150px",
            border: "1px solid black"
        }} multiple className="dropzone" onDrop={(acceptedFiles) => {
            // do nothing if no files
            if (acceptedFiles.length === 0) {
                debugger
                return;
            }
            acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            }))
            // on drop we add to the existing files
            props.setFieldValue("videos", props.values.videos.concat(acceptedFiles));
        }}>
        {({ getRootProps, getInputProps, isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
            console.log("input_props", getRootProps())
            return <Fragment>
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {!isDragActive && 'Click here or drop a video clip to upload!'}
                    {isDragActive && !isDragReject && "Drop it like it's hot!"}
                    {isDragReject && "File type not accepted, sorry!"}
                </div>
                <div className="row">
                    {props.values.videos.length > 0 && props.videos.files.map((file) => {
                        return <Fragment>
                            <div class="img-wrap">
                                <span class="close"><FontAwesomeIcon icon={faTrash} /></span>
                                <img
                                    alt="Preview"
                                    key={file.preview}
                                    src={file.preview}
                                    style={props.previewStyle}
                                />
                            </div>
                        </Fragment>
                    })}
                </div>
                }
            </Fragment>
        }}
    </Dropzone>

}


const PhotosDropZone = (props) => {
    return <Dropzone accept="image/*" style={{
        width: "20%",
        height: "150px",
        border: "5px solid green"
    }}
        name="photos_dropzone"
        activeStyle={{
            width: "20%",
            height: "150px",
            border: "1px solid black"
        }} multiple className="dropzone" onDrop={(acceptedFiles) => {
            // do nothing if no files
            if (acceptedFiles.length === 0) {
                return;
            }
            acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            }))
            console.log("inside videos 1", props.values)
            // on drop we add to the existing files
            props.setFieldValue("photos", props.values.photos.concat(acceptedFiles));
        }}>
        {({ getRootProps, getInputProps, isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
            console.log("input_props", getRootProps())
            return <Fragment>
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {!isDragActive && 'Click here or drop a video clip to upload!'}
                    {isDragActive && !isDragReject && "Drop it like it's hot!"}
                    {isDragReject && "File type not accepted, sorry!"}
                </div>
                <div className="row">
                    {props.values.photos.length > 0 && props.values.photos.map((file) => {
                        return <Fragment>
                            <div class="img-wrap">
                                <span class="close"><FontAwesomeIcon icon={faTrash} /></span>
                                <img
                                    alt="Preview"
                                    key={file.preview}
                                    src={file.preview}
                                    style={props.previewStyle}
                                />
                            </div>
                        </Fragment>
                    })}
                </div>
                }
            </Fragment>
        }}
    </Dropzone>

}

const mapStateToProps = state=>({
    crime_files:state.formReducer.crime_files,
    audios:state.formReducer.audios,
    videos:state.formReducer.videos,
    photos:state.formReducer.photos
})

export default connect(mapStateToProps,null)(IncidentForm)