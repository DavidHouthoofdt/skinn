/* @flow */
import CRUDLanguage from './CRUDLanguage';

import {EventEmitter} from 'fbemitter';

let groups = [];
let activeGroup = null;
const emitter = new EventEmitter();

const CRUDGroup = {

  init() {
    CRUDLanguage.addListener('languages-loaded', () => {
       this.loadGroups();
    });
  },

   
  createObject(group: Object) {
    $.ajax({
      url: '/api/groups',
      data: group,
      type: 'POST',
      dataType: 'json',
    }).success(
      function (data) {
        groups[data.id] = data;
        emitter.emit('group-created');
      }.bind(this)
    ).error(
      function (jqXHR) {
        if (jqXHR.statusText !== 'abort') {
          throw new Error('Failed to create the language.');
        }
      }.bind(this)
    );
  },

  updateObject(id: number, group: Object) {
    $.ajax({
      url: '/api/groups/' + id,
      data: group,
      type: 'PUT',
      dataType: 'json',
    }).success(
      function (data) {
        groups[id] = data;
        emitter.emit('group-updated');
      }.bind(this)
    ).error(
      function (jqXHR) {
        if (jqXHR.statusText !== 'abort') {
          throw new Error('Failed to update the file data.');
        }
      }.bind(this)
    );
  },

  loadGroups() {
    $.ajax({
      url: '/api/groups',
      dataType: 'json',
    }).success(
      function (data) {
        groups = data;
        emitter.emit('groups-loaded');
      }.bind(this)
    ).error(
      function (jqXHR) {
        if (jqXHR.statusText !== 'abort') {
          throw new Error('Failed to load group data.');
        }
      }.bind(this)
    );
  },

  getGroups(): Array<Object> {
    return groups;
  },

  getCount(): number {
    return groups.length;
  },

  getGroup(groupId: number): ?Object {
    return groupId in groups ? groups[groupId] : null;
  },

  getActiveGroup() : Object {
    return activeGroup;
  },

  setActiveGroup(group: Object) {
    activeGroup = group;
    emitter.emit('change');
    return true;
  },

  addListener(eventType: string, fn: Function) {
    emitter.addListener(eventType, fn);
  },

    /**
   * Get the form fields for the group edit
   */
  getFormFields(newForm) {
    return [
      {
        type: (newForm) ? 'hidden': '',
        value: activeGroup === null ? '' : activeGroup.id,
        label: (newForm) ? '' : 'Id',
        hasLanguageData: false,
        readonly: true,
        id: 'id',
        multiple: false,
      },
      {
        type: '',
        value: activeGroup === null ? '' : activeGroup.name,
        label: 'Name',
        hasLanguageData: false,
        readonly: false,
        id: 'name',
        multiple: false,
      }
    ]
  },
};

export default CRUDGroup
