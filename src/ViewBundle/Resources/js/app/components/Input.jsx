/* @flow */
var _ = require('lodash');

import React, {Component} from 'react';

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

class Input extends Component {

  props: FormInputField;

  static defaultProps = {
    type: 'input',
    value: '',
    ref: 'input'
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue
    };
  }

  getValue(): FormInputFieldValue {
    var value = '';
    value = this.refs.input.value;
    if (this.props.multiple) {
      value = value.split(';');
    }
    return value;
  }

  componentWillReceiveProps(nextProps) {
      this.setState({value: nextProps.defaultValue});
  }

  //re-render when input changes
  _handleChange(e) {
      this.setState({value: e.target.value});
  }

  //render the input field
  render() {
    const common: Object = {
      id: this.props.id,
      ref: 'input',
      defaultValue: this.props.defaultValue,
    };
    var inputType = this.props.type === 'hidden' ? 'hidden' : 'text';

    switch (this.props.type) {
      case 'select': {
        var options = [];
        _.map( this.props.options, function(option) {
            options.push({value: option.id, label: option.name});
        })
        return <Select options={options} value={this.state.value} onChange={this._handleChange.bind(this)} multi={false} />
      }
      case 'text':
        return <textarea {...common} onChange={this._handleChange.bind(this)} value={this.state.value} />;
      default:
        return <input {...common} value={this.state.value} type={inputType} onChange={this._handleChange.bind(this)} />;
    }
  }
}

export default Input