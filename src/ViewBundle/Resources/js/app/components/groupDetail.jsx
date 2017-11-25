/* @flow */
var _ = require('lodash');

import React, {Component} from 'react';

type Props = {
  group: Object,
};

class GroupDetail extends Component {

    props: Props;

    static defaultProps = {
        group: null
    };

    constructor(props) {
        super(props);
        this.state = {
            files: []
        }
    }

    componentWillReceiveProps (props) {
        this.loadGroupFiles(props.group);
    }

    componentWillUnmount() {
        this.abort();
    }


    loadGroupFiles(group) {
        if (group === null) {
            return;
        }
        $.ajax({
            url: '/api/groups/' + group.id + '/files.json',
            dataType: 'json'
        }).success(
            function (data) {
                this.setState({files: data});
            }.bind(this)
        ).error(
            function (jqXHR) {
                if (jqXHR.statusText !== 'abort') {
                throw new Error('Failed to load group data.');
                }
            }.bind(this)
        );
    }

    /**
     * Renders all assets
     *
     * @returns {XML}
     */
    renderGroupDetails() 
    {
        if (this.state.files.length === 0) {
            return <div>No files in the group</div>;
        }
        let fileList = this.renderFileList();
        return <ul>{fileList}</ul>;
    }

    renderFileList() 
    {
        return _.map(this.state.files, function(file) {
           return (
            <li>{file.label}</li>
           )
        });
    }

  render() {
    if (typeof this.props.group == 'undefined' || this.props.group === null) {
        return <div>Select a group</div>;
    } else {
        let groupDetails = this.renderGroupDetails();
        return (
            <div>{groupDetails}</div>
        );
    }
  }
}
export default GroupDetail;