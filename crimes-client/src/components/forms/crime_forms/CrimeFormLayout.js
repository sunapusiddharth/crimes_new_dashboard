import React, { Component } from 'react';
// import { UserForm } from './UserForm';
import CrimeForm from './CrimeForm';
import '../../../styles/crime_form_layout.css'

class CrimeFormLayout extends Component {
  render() {
    return (
      <div className="crime_multi_form_layout">
        <h3 className="text-center">Report Crime</h3>
        <p className="text-center">Report a crime using this multi step form.Includes forms for adding crime summary , crime related media (pictures,audio,video,external files) and  crime related people (victims,suspects,accussed,law,judges).
          This data is saved to backend (Mongo) and files are stored in S3.Once it is saved after that indexing is done automatically in elasticsearch so that as soon as it is ready it is available for search.Content created
          will be available in search crime map in crimes front page, all crimes table.And entries will be made for people that are created new in this wizard form.
          All the data is saved to redux .User can jump to any section if he wishes (note: for first two forms user has to click on next step in bottom to save redux), for other forms,data is saved locally as soon as he enters to preserve it using navigations (without page reload)
          Form validations are made using Yup and form is created using Formik.
          In Personnel form person can be either linked using autocomplete search or can be created on the fly using Person Form.This Page is still WIP it saves forms using multi part forms to redux and also sends data to server (including all the files).To Do: save files in S3 and other data in mongodb in respective tables, Dont allow user to submit unless he/she has filled the important details in all parts of forms.
        </p>
        <CrimeForm />
      </div>
    );
  }
}

export default CrimeFormLayout