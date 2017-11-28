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

};

export default CRUDGroup
