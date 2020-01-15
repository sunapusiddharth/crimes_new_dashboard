import React from "react";
import { Field, reduxForm } from "redux-form";
import {v4} from 'uuid';

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  }

  if (!values.age) {
    errors.age = "Required";
  }

  return errors;
};

const renderField = ({
  input,
  label,
  type,
  value,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && (error && <span className="error">{error}</span>)}
    </div>
  </div>
);

const Form1 = props => {
  const { handleSubmit,medtech_form_fields,biopharma_form_fields } = props;

  let field_array = [];
  Object.entries(props.medtech_form_fields).map(([key,value])=>{
    field_array.push(<Field name={value.name} component={renderField} type={value.type} label={value.label} />)
  })

  Object.entries(props.biopharma_form_fields).map(([key,value])=>{
    field_array.push(<Field name={value.name} component={renderField} type={value.type} label={value.label} />)
  })
  return (
    <div>
      <form onSubmit={handleSubmit}>
      {field_array}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const form_random_id = "drg_form_"+v4();
export default reduxForm({
  form: form_random_id, // a unique identifier for this form
  validate
})(Form1);