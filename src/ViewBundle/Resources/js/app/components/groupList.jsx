/* @flow */

var _ = require('lodash');

import React, {Component} from 'react';

class GroupList extends Component {


  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      allGroups: [],
      search: '',
      activeGroup: null
    };
  }

  componentDidMount() {
    this.loadGroupList();
  }

  componentWillUnmount() {
    this.abort();
  }


  loadGroupList() {
    $.ajax({
      url: '/api/groups',
      dataType: 'json'
    }).success(
      function (data) {
        this.setState({groups: data, allGroups:data});
      }.bind(this)
    ).error(
      function (jqXHR) {
        if (jqXHR.statusText !== 'abort') {
          throw new Error('Failed to load group data.');
        }
      }.bind(this)
    );
  }

  groupSelected(group) {
    this.setState({
        activeGroup : group
    });
  }

  /**
   * Renders all assets
   *
   * @returns {XML}
   */
  renderGroups() {
    return _.map(this.state.groups, function(group) {
      var selectGroup = function() {
        this.groupSelected(group);
      };

        return (
          <div className="groupItem" onClick={selectGroup.bind(this)}>
            {group.label}
          </div>
        );
    }.bind(this));
  }


  render() {
    let groups = this.renderGroups();
    return (
        <div className="group-overview">
            <div className="group-list">
               {groups}
            </div>
            <div className="group-detail">

            </div>
        </div>
    );
  }
}

export default GroupList;
