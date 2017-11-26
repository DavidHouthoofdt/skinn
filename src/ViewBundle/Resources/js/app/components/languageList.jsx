/* @flow */

var _ = require('lodash');

import React, {Component} from 'react';

class LanguageList extends Component {

    constructor(props) {
      super(props);
      this.state = {
        languages: [],
        activeLanguage: null
      };
    }

    componentDidMount() {
      this.loadLanguages();
    }

    componentWillUnmount() {
      this.abort();
    }

    loadLanguages() {
        $.ajax({
          url: '/api/languages',
          dataType: 'json'
        }).success(
          function (data) {
            var firstLang = null;
            for (var i in data) {
                firstLang = data[i];
                break;
            }
            console.log(firstLang);
            this.setState({languages: data, activeLanguage: firstLang});
          }.bind(this)
        ).error(
          function (jqXHR) {
            if (jqXHR.statusText !== 'abort') {
              throw new Error('Failed to load language data.');
            }
          }.bind(this)
        );
    }

  selectLanguage(language) {
    this.setState({
        activeLanguage : language
    });
  }

  /**
   * Renders all assets
   *
   * @returns {XML}
   */
  renderLanguages() {
    return _.map(this.state.languages, function(language) {
        var selectLanguage = function() {
          this.selectLanguage(language);
        };
        return (
          <div className="languageItem" onClick={selectLanguage.bind(this)}>
            {language.label}
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
                <span>Active Language : {this.state.activeLanguage.label}<hr /></span>
                
            }
        </div>
    );
  }
}

export default LanguageList;

