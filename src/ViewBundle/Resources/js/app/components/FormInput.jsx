/* @flow */

import React, {Component} from 'react';
import CRUDLanguage from '../flux/CRUDLanguage';
import Input from './Input';

var _ = require('lodash');

type FormInputFieldType = 'text' | 'input';

export type FormInputFieldValue = string | number;

export type FormInputField = {
  type: FormInputFieldType,
  defaultValue?: FormInputFieldValue,
  id?: string,
  options?: Array<string>,
  label?: string,
  hasLanguageData ?: boolean,
  value: string
};

class FormInput extends Component {

  props: FormInputField;

  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue
    };
  }

  getValue(): FormInputFieldValue {
    var value = '';
    var self = this;
    if (this.props.hasLanguageData === true) {
      value = {};
      let languages = CRUDLanguage.getLanguages();
      _.map(languages, function(language) {
        value[language.id] = self.refs['input-' + language.id].getValue();
      });
    } else {
      value = this.refs.input.getValue();
    }
    return value;
  }

  render() {
    if (this.props.type === 'hidden') {
      return this.renderField(this.props);
    } else if (this.props.hasLanguageData === true) {
      let languages = CRUDLanguage.getLanguages();
      var self = this;
      return <div>
        <table>
          <thead>
            <tr>{_.map(languages, function(language) { return <th key={'th-language-' + language.id}>{language.name}</th>})}</tr>
          </thead>
          <tbody>
            <tr>
              {
                _.map(languages, function(language) {
                  let value =  (typeof self.props.defaultValue !== 'undefined' && self.props.defaultValue[language.id] !== 'undefined') ?
                      self.props.defaultValue[language.id] :
                      '';

                  if (value instanceof Object) {
                    value = _.map(value, function(tag) { return tag}).join(';');
                  }
                  let props = {
                    id: self.props.id,
                    ref: 'input-' + language.id,
                    value: value,
                    defaultValue: value,
                    type: self.props.type,
                    options: self.props.options,
                    hasLanguageData: false,
                    multiple: self.props.multiple,
                    label: self.props.label
                  }
                  return <td key={'td-language-' + language.id + '-' + self.props.id}>
                      <Input {...props} ref={'input-' + language.id}/>
                    </td>
                })
              }
            </tr>
          </tbody>
        </table>
      </div>
    } else {
      return  <Input {...this.props} ref={'input'} />;
    }
  }
}

export default FormInput