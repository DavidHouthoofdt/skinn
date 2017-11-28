/* @flow */

var _ = require('lodash');

import CRUDLanguage from '../flux/CRUDLanguage';
import React, {Component} from 'react';

class LanguageList extends Component {

    constructor(props) {
      super(props);
      this.state = {
        languages: CRUDLanguage.getLanguages(),
        activeLanguage: CRUDLanguage.getActiveLanguage()
      };

      CRUDLanguage.addListener('languages-loaded', () => {
        this.setState({
          languages: CRUDLanguage.getLanguages(),
          activeLanguage: CRUDLanguage.getActiveLanguage()
        });
      });
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
          </div>
        );
      }.bind(this));
    }


    render() {
      let languages = this.renderLanguages();
      return (
          <div className="language-list">
             {languages}
             <hr />
             {this.state.activeLanguage !== null &&
                  <span>Active Language : {this.state.activeLanguage.name}<hr /></span>

              }
          </div>
      );
    }
}

export default LanguageList;

