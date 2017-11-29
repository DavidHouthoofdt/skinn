/* @flow */
var _ = require('lodash');

import {EventEmitter} from 'fbemitter';
import CRUDGroup from './CRUDGroup';

let files = [];
let activeFile = null;
const emitter = new EventEmitter();

const CRUDFile = {

  init() {
  },

  /**
   * Load the files that are in the group
   *
   * @param {numeric} groupId id of the group
   *
   * @returns {Array}
   */
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

  /**
   * Get the loaded files
   *
   * @returns {Array}
   */
  getFiles(): Array<Object> {
    return _.orderBy(files, ['sequence'], ['asc']);
  },

  /**
   * Get the number of files
   *
   * @return {numeric}
   */
  getCount(): number {
    return files.length;
  },

  /**
   * Get the File
   *
   * @returns {Object}|{null}
   */
  getFile(fileId: number): ?Object {
    return fileId in files ? files[fileId] : null;
  },

  /**
   * Get the active File
   *
   * @returns {Object}|{null}
   */
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

  createObject(file: Object) {
    $.ajax({
      url: '/api/files',
      data: file,
      type: 'POST',
      dataType: 'json',
    }).success(
      function (data) {
        files[data.id] = data;
        emitter.emit('file-created');
      }.bind(this)
    ).error(
      function (jqXHR) {
        if (jqXHR.statusText !== 'abort') {
          throw new Error('Failed to create the file data.');
        }
      }.bind(this)
    );
  },

  updateObject(id: number, file: Object) {
    $.ajax({
      url: '/api/files/' + id,
      data: file,
      type: 'PUT',
      dataType: 'json',
    }).success(
      function (data) {
        files[id] = data;
        emitter.emit('file-updated');
      }.bind(this)
    ).error(
      function (jqXHR) {
        if (jqXHR.statusText !== 'abort') {
          throw new Error('Failed to update the file data.');
        }
      }.bind(this)
    );
  },

   deleteObject(id: number) {
    $.ajax({
      url: '/api/files/' + id,
      type: 'DELETE',
      dataType: 'json',
    }).success(
      function () {
        _.remove(files, function(currentObject) {
            return currentObject.id === id;
        });
        emitter.emit('file-deleted');
      }.bind(this)
    ).error(
      function (jqXHR) {
        if (jqXHR.statusText !== 'abort') {
          throw new Error('Failed to update the file data.');
        }
      }.bind(this)
    );
  },

  /**
   * Get the form fields for the file edit
   */
  getFormFields(newForm) {
    return [
      {
        type: (newForm) ? 'hidden': '',
        value: activeFile === null ? '' : activeFile.id,
        label: (newForm) ? '' : 'Id',
        hasLanguageData: false,
        readonly: true,
        id: 'id',
        multiple: false,
      },
      {
        type: '',
        value: activeFile === null ? '' : activeFile.name,
        label: 'Name',
        hasLanguageData: false,
        readonly: false,
        id: 'name',
        multiple: false,
      },
      {
        type: 'text',
        value: activeFile === null ? '' : activeFile.descriptions,
        label: 'Description',
        hasLanguageData: true,
        id: 'descriptions',
        multiple: false,
      },
      {
        type: 'multi_csv',
        value: activeFile === null ? '' : activeFile.tags,
        label: 'Tags',
        hasLanguageData: true,
        id: 'tags',
        multiple: true,
      },
      {
        type: 'select',
        options: CRUDGroup.getGroups(),
        value: activeFile === null ? '' : activeFile.group_id,
        label: 'Group',
        hasLanguageData: false,
        id: 'group_id',
        multiple: false,
      },
      {
        type: '',
        value: activeFile === null && typeof activeFile.sequence !== 'undefined' ? '' : activeFile.sequence,
        label: 'Sequence',
        hasLanguageData: false,
        id: 'sequence',
        multiple: false,
      }
    ]
  },
};

export default CRUDFile