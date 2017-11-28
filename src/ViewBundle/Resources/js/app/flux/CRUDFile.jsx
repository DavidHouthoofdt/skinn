/* @flow */

import {EventEmitter} from 'fbemitter';

let files = [];
let activeFile = null;
const emitter = new EventEmitter();

const CRUDFile = {

  init() {
  },

  loadGroupFiles(groupId: number) {
    $.ajax({
      url: '/api/groups/' + groupId + '/files.json',
      dataType: 'json',
    }).success(
      function (data) {
        files = data;
        emitter.emit('files-loaded');
      }.bind(this)
    ).error(
      function (jqXHR) {
        if (jqXHR.statusText !== 'abort') {
          throw new Error('Failed to load file data.');
        }
      }.bind(this)
    );
  },

  getFiles(): Array<Object> {
    return files;
  },

  getCount(): number {
    return files.length;
  },

  getFile(fileId: number): ?Object {
    return fileId in files ? files[fileId] : null;
  },

  getActiveFile() : Object {
    return activeFile;
  },

  setActiveFile(file: Object) {
    activeFile = file;
    emitter.emit('change');
    return true;
  },

  addListener(eventType: string, fn: Function) {
    emitter.addListener(eventType, fn);
  },

  /**
   * Get the form fields for the file edit
   */
  getFormFields() {
    return [
      {
        type: '',
        value: activeFile === null ? '' : activeFile.id,
        label: 'Id',
        hasLanguageData: false,
        readonly: true,
        id: 'id'
      },
      {
        type: 'text',
        value: activeFile === null ? '' : activeFile.descriptions,
        label: 'Description',
        hasLanguageData: true,
        id: 'descriptions'
      },
      {
        type: 'multi_csv',
        value: activeFile === null ? '' : activeFile.tags,
        label: 'Tags',
        hasLanguageData: true,
        id: 'tags'
      },
      {
        type: 'Group',
        value: activeFile === null ? '' : activeFile.group_id,
        label: 'Group',
        hasLanguageData: false,
        id: 'group_id'
      }
    ]
  },
};

export default CRUDFile
