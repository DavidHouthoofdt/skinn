/* @flow */

import {EventEmitter} from 'fbemitter';

let languages = [];
let activeLanguage = null;
const emitter = new EventEmitter();

const CRUDLanguage = {

  init() {
    this.loadLanguages();
  },

  loadLanguages() {
    $.ajax({
      url: '/api/languages',
      dataType: 'json',
    }).success(
      function (data) {
        var firstLang = null;
        for (var i in data) {
            firstLang = data[i];
            break;
        }
        activeLanguage = firstLang;
        languages = data;
        emitter.emit('change');
      }.bind(this)
    ).error(
      function (jqXHR) {
        if (jqXHR.statusText !== 'abort') {
          throw new Error('Failed to load language data.');
        }
      }.bind(this)
    );
  },

  getLanguages(): Array<Object> {
    return languages;
  },

  getCount(): number {
    return languages.length;
  },

  getLanguage(languageId: number): ?Object {
    return languageId in languages ? languages[languageId] : null;
  },

  getActiveLanguage() : Object {
    return activeLanguage;
  },

  setActiveLanguage(language: Object) {
    activeLanguage = language;
    emitter.emit('change');
    return true;
  },
  
  addListener(eventType: string, fn: Function) {
    emitter.addListener(eventType, fn);
  },

};

export default CRUDLanguage
