/* @flow */

var _ = require('lodash');

import React, {Component} from 'react';
import Dialog from './Dialog';
import Form from './Form';
import Actions from './Actions';

class FileList extends Component {

    constructor(props) {
      super(props);
      this.state = {
        files: [],
        allFiles: [],
        search: '',
        activeFile: null
      };
      this.loadGroupFiles(props.group);
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
        var self = this;
        return _.map(this.state.files, function(file) {
            var selectFile = function() {
                self.fileSelect(file);
            };
            return (
                <li onClick={selectFile} key={'file-' + file.id}>
                    {file.name}
                    <Actions onAction={self.actionClick.bind(self, file)} />
                </li>
            )
        });
    }

    fileSelect(file) {
      this.setState({
          activeFile : file
      });
    }

    actionClick(file: Object, action: string) {
        this.setState({dialog: {type: action, record: file}});
    }

    _deleteConfirmationClick(action: string) {
      this.setState({dialog: null});
      if (action === 'dismiss') {
        return;
      }

    }

    _saveDataDialog(action: string) {
      this.setState({dialog: null});
      if (action === 'dismiss') {
        return;
      }
    }

    _renderDialog() {
        if (!this.state.dialog) {
          return null;
        }
        const type = this.state.dialog.type;
        switch (type) {
          case 'delete':
            return this._renderDeleteDialog();
          case 'info':
            return this._renderFormDialog(true);
          case 'edit':
            return this._renderFormDialog();
          default:
            throw Error(`Unexpected dialog type ${type}`);
        }
    }


    _renderDeleteDialog() {
      return (
        <Dialog 
          modal={true}
          header="Confirm deletion"
          confirmLabel="Delete"
          onAction={this._deleteConfirmationClick.bind(this)}
        >
          {`Are you sure you want to delete "{this.state.file.name}"?`}
        </Dialog>
      );
    }

    _renderFormDialog(readonly: ?boolean) {
        console.log('renderFormDialog');
        return (
          <Dialog 
            modal={true}
            header={readonly ? 'Item info' : 'Edit item'}
            confirmLabel={readonly ? 'ok' : 'Save'}
            hasCancel={!readonly}
            onAction={this._saveDataDialog.bind(this)}
          >
            <Form
              ref="form"
              record={this.state.dialog.record}
              readonly={!!readonly} />
          </Dialog>
        ); 
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
                {this._renderDialog()}
            </div>
        );
    }
}

export default FileList;
