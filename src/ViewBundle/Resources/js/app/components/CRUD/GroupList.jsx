/* @flow */

var _ = require('lodash');

import React from 'react';
import GroupDetail from '../GroupDetail';
import Button from '../Button';
import Actions from '../Actions';
import CRUDGroup from '../../flux/CRUDGroup';
import CRUD from '../CRUD';

class GroupList extends CRUD {
    
    static defaultProps = Object.assign({}, CRUD.defaultProps, {
      CRUDObject: CRUDGroup
    });

    constructor(props) {
      super(props);
      this.state = {
        groups: null,
        activeGroup: null
      };

      CRUDGroup.addListener('group-created', () => {
        this.setState({
          groups: CRUDGroup.getGroups(),
          activeGroup: null
        })
      });

      CRUDGroup.addListener('group-updated', () => {
        this.setState({
          groups: CRUDGroup.getGroups(),
        })
      });

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
     * override the create form
     */
    _renderCreateFormDialog() {
        this.props.CRUDObject.setActiveGroup(null);
        var formFields = this.props.CRUDObject.getFormFields(true);
        return this.renderCreateFormDialog(formFields);
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
               <Actions onAction={this.actionClick.bind(this, group)} />
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
                    <Button
                      onClick={this._addNewDialog.bind(this)}>
                      + add group
                    </Button>
                     <hr />
                      {this._renderDialog()}   
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
