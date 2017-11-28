/* @flow */

import React, {Component} from 'react';
import CRUDLanguage from '../flux/CRUDLanguage';
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

  static defaultProps = {
    type: 'input',
    value: '',
    ref: 'input'
  };

  getValue(): FormInputFieldValue {
    var value = '';
    var self = this;
    if (this.props.hasLanguageData === true) {
      value = {};
      let languages = CRUDLanguage.getLanguages();
      _.map(languages, function(language) {
        let curValue = self.refs['input-' + language.id].value;
        if (self.props.multiple) {
          curValue = curValue.split(';');
        }
        value[language.id] = curValue;
      });
    } else {
      value = this.refs.input.value;
      if (this.props.multiple) {
        value = value.split(';');
      }
    }
    return value;
  }

  renderField(props: Object)
  {
    const common: Object = {
      id: props.id,
      ref: (typeof props.ref === 'undefined' || props.ref  === '') ? 'input' : props.ref,
      defaultValue: props.defaultValue,
      hidden: props.hidden
    };
    switch (this.props.type) {
      case 'text':
        return <textarea {...common} />;
      default:
        return <input {...common} type="text" />;
    }
  }

  render() {
    if (this.props.hasLanguageData === true) {
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
                  let value =  (typeof self.props.defaultValue[language.id] !== 'undefined') ?
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
                  return <td key={'td-language-' + language.id + '-' + self.props.id}>{self.renderField(props)}</td>
                })
              }
            </tr>
          </tbody>
        </table>
      </div>
    } else {
      return this.renderField(this.props);
    }
  }
}

export default FormInput
