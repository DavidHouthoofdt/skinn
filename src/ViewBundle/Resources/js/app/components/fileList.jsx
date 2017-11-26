/* @flow */

var _ = require('lodash');

import React, {Component} from 'react';


class FileList extends Component {

    constructor(props) {
      super(props);
      this.state = {
        files: [],
        allFiles: [],
        search: '',
        activeFile: null
      };
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

    renderFileList() 
    {
        return _.map(this.state.files, function(file) {
            var selectFile = function() {
                this.fileSelect(file);
            };
           return (
            <li onClick={selectFile.bind(this)}>{file.name}</li>
           )
        });
    }

    fileSelect(file) {
      this.setState({
          activeFile : file
      });
    }

 
  render() {
    let files = this.renderFileList();
    if (this.state.files.length === 0) {
        return <div>No files in the group</div>;
    }
    return (
        <div className="file-overview">
            <ul className="file-list">
               {files}
            </ul>
            <hr />
            <div className="file-detail">
            {this.state.activeFile !== null &&
                <span>Active file : {this.state.activeFile.name}<hr /></span>
            }
             <hr />
            </div>
        </div>
    );
  }
}

export default FileList;
