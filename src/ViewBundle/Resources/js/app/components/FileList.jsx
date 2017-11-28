/* @flow */

var _ = require('lodash');

import React, {Component} from 'react';
import Dialog from './Dialog';
import Form from './Form';
import Actions from './Actions';
import CRUDFile from '../flux/CRUDFile';

class FileList extends Component {

    constructor(props) {
      super(props);
      CRUDFile.loadGroupFiles(props.group.id);
      CRUDFile.addListener('files-loaded', () => {
        this.setState({
          files: CRUDFile.getFiles(),
          activeFile: null
        })
      });
      CRUDFile.addListener('files-updated', () => {
        this.setState({
          files: CRUDFile.getFiles(),
        })
      });
      this.state = {
        files : [],
        activeFile: null
      }
    }

    componentWillReceiveProps (props) {
      CRUDFile.loadGroupFiles(props.group.id)
    }

    componentWillUnmount() {
      this.abort();
    }

    fileSelect(file) {
      this.setState({
        activeFile : file
      });
      CRUDFile.setActiveFile(file);
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
      CRUDFile.updateFile(this.state.dialog.record.id, this.refs.form.getData());
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

    /*
     * Render the delete dialog
     */
    _renderDeleteDialog() {
      return (
        <Dialog
          modal={true}
          header="Confirm deletion"
          confirmLabel="Delete"
          onAction={this._deleteConfirmationClick.bind(this)}
        >
          {'Are you sure you want to delete "{this.state.file.name}"?'}
        </Dialog>
      );
    }

    /**
     * Render the form dialog
     */
    _renderFormDialog(readonly: ?boolean) {
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
              fields={CRUDFile.getFormFields()}
              readonly={!!readonly} />
          </Dialog>
        );
    }

    /**
     * Render file overview
     */
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

    /**
     * Render the file overview
     */
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
