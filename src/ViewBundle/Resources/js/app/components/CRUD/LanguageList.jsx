/* @flow */

var _ = require('lodash');

import Button from '../Button';
import CRUDLanguage from '../../flux/CRUDLanguage';
import React from 'react';
import CRUD from '../CRUD';
import Actions from '../Actions';

class LanguageList extends CRUD {

  static defaultProps = Object.assign({}, CRUD.defaultProps, {
    CRUDObject: CRUDLanguage
  });

  constructor(props) {
    super(props);
    this.state = {
      languages: null,
      activeLanguage: CRUDLanguage.getActiveLanguage()
    };

    CRUDLanguage.addListener('language-created', () => {
      this.setState({
        languages: CRUDLanguage.getLanguages(),
        activeLanguage: CRUDLanguage.getActiveLanguage()
      })
    });

    CRUDLanguage.addListener('language-updated', () => {
      this.setState({
        languages: CRUDLanguage.getLanguages(),
        activeLanguage: CRUDLanguage.getActiveLanguage()
      });
    });

    CRUDLanguage.addListener('languages-loaded', () => {
      this.setState({
        languages: CRUDLanguage.getLanguages(),
        activeLanguage: CRUDLanguage.getActiveLanguage()
      });
    });
  }

  /**
   * override the create form
   */
  _renderCreateFormDialog() {
    this.props.CRUDObject.setActiveLanguage(null);
    var formFields = this.props.CRUDObject.getFormFields(true);
    return this.renderCreateFormDialog(formFields);
  }

  componentWillUnmount() {
    this.abort();
  }

  selectLanguage(language) {
    this.setState({
      activeLanguage : language
    });
    CRUDLanguage.setActiveLanguage(language);
  }

  /**
   * Renders all languages
   *
   */
  renderLanguages() {
    return _.map(this.state.languages, function(language) {
      var selectLanguage = function() {
        this.selectLanguage(language);
      };
      return (
        <div className="languageItem" key={'language-' + language.id} onClick={selectLanguage.bind(this)}>
          {language.name}
          <Actions onAction={this.actionClick.bind(this, language)} />
        </div>
      );
    }.bind(this));
  }


  render() {
    let languages = this.renderLanguages();
    if (this.state.languages === null) {
      return <div>Loading languages...</div>;
    } else {
      return (
        <div className="language-list">
          {languages}
          <Button
            onClick={this._addNewDialog.bind(this)}>
            + add language
          </Button>
          <hr />
          {this.state.activeLanguage !== null &&
            <span>Active Language : {this.state.activeLanguage.name}<hr /></span>
          }
          {this._renderDialog()}
        </div>
      );
    }
  }
}

export default LanguageList;