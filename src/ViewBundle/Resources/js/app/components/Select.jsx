/* @flow */
var _ = require('lodash');

import React, {Component} from 'react';

class Select extends Component {

  static defaultProps = {
    value: '',
    ref: 'input'
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue
    };
  }

  getValue() {
    var value = '';
    value = this.refs.input.value;
    return value;
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

    return <select  {...common}  onChange={this._handleChange.bind(this)} >
    {
      _.map( this.props.options, function(option) {
        return <option value={option.value} key={'option-' + option.value}>{option.label}</option>
     })
    }
    </select>
  }
}

export default Select
