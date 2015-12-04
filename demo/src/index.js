import React, { Component } from 'react';
import { render } from 'react-dom';
import { mobservableForm } from '../../src/index.js';

class ExampleForm extends Component {
  render() {
    const {
      handleSubmit,
      resetForm,
      fields: {
        text,
        email
      }
    } = this.props;

    return <form noValidate onSubmit={handleSubmit}>
      <div>
        <input type="text" placeholder="Text (min 10)..." {...text}/>
        {text.touched && text.error}
      </div>

      <div>
        <input type="email" placeholder="Email..." {...email}/>
        {email.touched && email.error}
      </div>

      <div>
        <button>Submit</button>
        <button type="button" onClick={resetForm}>
          Reset
        </button>
      </div>
    </form>;
  }
}

ExampleForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  resetForm: React.PropTypes.func.isRequired,
  fields: React.PropTypes.object.isRequired
};

ExampleForm = mobservableForm({
  form: 'example',
  fields: ['text', 'email'],
  validate: ({ text, email }) => {
    const errors = {};

    if (text.length < 10) {
      errors.text = 'Must be at least 10 characters';
    }

    if (!email) {
      errors.email = 'Must supply an email';
    }

    return errors;
  }
})(ExampleForm);

render(<ExampleForm onSubmit={model => {
  alert('Form submitted: ' + JSON.stringify(model));
}}/>
  ,
  document.querySelector('#demo'))
