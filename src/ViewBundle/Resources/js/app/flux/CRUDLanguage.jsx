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
        emitter.emit('languages-loaded');
      }.bind(this)
    ).error(
      function (jqXHR) {
        if (jqXHR.statusText !== 'abort') {
          throw new Error('Failed to load language data.');
        }
      }.bind(this)
    );
  },

  createObject(file: Object) {
    $.ajax({
      url: '/api/languages',
      data: file,
      type: 'POST',
      dataType: 'json',
    }).success(
      function (data) {
        languages[data.id] = data;
        emitter.emit('language-created');
      }.bind(this)
    ).error(
      function (jqXHR) {
        if (jqXHR.statusText !== 'abort') {
          throw new Error('Failed to create the language.');
        }
      }.bind(this)
    );
  },

  updateObject(id: number, file: Object) {
    $.ajax({
      url: '/api/languages/' + id,
      data: file,
      type: 'PUT',
      dataType: 'json',
    }).success(
      function (data) {
        languages[id] = data;
        emitter.emit('language-updated');
      }.bind(this)
    ).error(
      function (jqXHR) {
        if (jqXHR.statusText !== 'abort') {
          throw new Error('Failed to update the file data.');
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


  /**
   * Get the form fields for the file edit
   */
  getFormFields(newForm) {
    return [
      {
        type: (newForm) ? 'hidden': '',
        value: activeLanguage === null ? '' : activeLanguage.id,
        label: (newForm) ? '' : 'Id',
        hasLanguageData: false,
        readonly: true,
        id: 'id',
        multiple: false,
      },
      {
        type: '',
        value: activeLanguage === null ? '' : activeLanguage.name,
        label: 'Name',
        hasLanguageData: false,
        readonly: false,
        id: 'name',
        multiple: false,
      }
    ]
  },

};

export default CRUDLanguage
