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

  getData(): Object {
    let data: Object = {};
    var self = this;
    this.props.fields.map((field: FormInputField) => {
      data[field.id] = self.refs[field.id].getValue();
    });
    return data;
  }

  render() {
    return (
      <div className="form-holder">
        <form className="Form">{this.props.fields.map((field: FormInputField) => {
          const prefilled: FormInputFieldValue = field.value;

          if (!this.props.readonly) {
            return (
              <div className="FormRow" key={field.id}>
              {field.type !== 'hidden' &&
                  <label className="FormLabel" htmlFor={field.id}>{field.label}:</label>
              }
                <FormInput ref={field.id} {...field}  defaultValue={prefilled} />
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
        }, this)}
          </form>
        <hr />
      </div>
    );
  }
}

export default Form
