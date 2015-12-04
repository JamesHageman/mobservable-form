import expect from 'expect'
import React, { Component } from 'react'
import {render, unmountComponentAtNode} from 'react-dom'

import { mobservableForm } from 'src/'

class TestForm extends Component {
  render() {
    const {
      handleSubmit,
      fields: {
        name,
        text
      }
    } = this.props;

    return <form onSubmit={handleSubmit}>
      Mobservable Form
      <input type="text" {...name}/>
      {name.touched && name.error}
      <input type="text" {...text}/>
      {text.touched && text.error}

      <button type="Submit">Submit</button>
    </form>
  }
}

TestForm = mobservableForm({
  form: 'testForm',
  fields: ['name', 'text'],
  validate: ({ name, text }) => {
    const errors = {};

    if (!name) {
      errors.name = 'Must supply a name';
    }

    if (!text || text.length < 3) {
      errors.text = 'Must be at least 3 characters';
    }
  }
})(TestForm);

describe('Component', () => {
  const handlers = {
    onSubmit: () => {}
  };

  let node
  let submitSpy

  beforeEach(() => {
    node = document.createElement('div')
    submitSpy = expect.spyOn(handlers, 'onSubmit')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
    expect.restoreSpies()
  })

  it('renders the form', () => {
    render(<TestForm onSubmit={submitSpy}/>, node, () => {
      expect(node.innerHTML).toContain('Mobservable Form')
    })
  })
})
