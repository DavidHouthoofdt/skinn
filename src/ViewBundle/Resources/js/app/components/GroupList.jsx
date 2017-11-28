/* @flow */

var _ = require('lodash');

import React, {Component} from 'react';
import GroupDetail from './GroupDetail';

import CRUDGroup from '../flux/CRUDGroup';

class GroupList extends Component {

    constructor(props) {
      super(props);
      this.state = {
        groups: null,
        activeGroup: null
      };

      CRUDGroup.addListener('groups-loaded', () => {
        this.setState({
          groups: CRUDGroup.getGroups()
        });
      });
    }

    componentWillUnmount() {
      this.abort();
    }


    groupSelected(group) {
      this.setState({activeGroup : group});
      CRUDGroup.setActiveGroup(group);
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
            <div className="groupItem" key={'group-' + group.id} onClick={selectGroup.bind(this)}>
              {group.name}
            </div>
          );
      }.bind(this));
    }

    render() {
        let groups = this.renderGroups();
        if (this.state.groups === null) {
          return <div>Loading groups ...</div>;
        } else {
          return (
              <div className="group-overview">
                  <div className="group-list">
                     {groups}
                     <hr />
                  </div>
                  <div className="group-detail">
                  {this.state.activeGroup !== null &&
                      <div>
                        <span>Active group : {this.state.activeGroup.name}<hr /></span>
                        <GroupDetail group={this.state.activeGroup} />
                      </div>
                  }

                  </div>
              </div>
          );
        }
    }
}

export default GroupList;
