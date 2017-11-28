/* @flow */

import FormInput from './FormInput';
import React, {Component} from 'react';

import type {FormInputField, FormInputFieldValue} from './FormInput';

type Props = {
  readonly?: boolean,
  fields: Array<Object>,
  record: Object
};

class Form extends Component {

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <form className="Form">{this.props.fields.map((field: FormInputField) => {
        const prefilled: FormInputFieldValue = field.value;
        if (!this.props.readonly) {
          return (
            <div className="FormRow" key={field.id}>
              <label className="FormLabel" htmlFor={field.id}>{field.label}:</label>
              <FormInput {...field} ref={field.id} defaultValue={prefilled} />
            </div>
          );
        }
        if (!prefilled) {
          return null;
        }
        return (
          <div className="FormRow" key={field.id}>
            <span className="FormLabel">{field.label}:</span>
            <div>{prefilled}</div>

          </div>
        );
      }, this)}</form>
    );
  }
}

export default Form
