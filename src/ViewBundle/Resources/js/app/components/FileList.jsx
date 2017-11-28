/* @flow */

var _ = require('lodash');

import React, {Component} from 'react';
import Dialog from './Dialog';
import Button from './Button';
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
      CRUDFile.addListener('files-created', () => {
        this.setState({
          files: CRUDFile.getFiles(),
        })
      });
      this.state = {
        files : null,
        activeFile: null
      }
    }

    componentWillReceiveProps (props) {
       this.setState(
        {
          files: null,
          activeFile: null,
        }
      );
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

    _addNewDialog() {
      this.setState(
        {
          dialog: {type: 'create', record: null},
          activeFile: null,
        }
      );
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

    _createDataDialog(action: string) {
      this.setState({dialog: null});
      if (action === 'dismiss') {
        return;
      }
      CRUDFile.createFile(this.refs.form.getData());
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
          case 'create':
            return this._renderCreateFormDialog();
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
    _renderCreateFormDialog() {
        CRUDFile.setActiveFile({group_id: this.props.group.id});
        var formFields = CRUDFile.getFormFields(true);
        //set group id to the current group
        CRUDFile.setActiveFile(null);
        return (
          <Dialog
            modal={true}
            header={'Add item'}
            confirmLabel={'Add'}
            hasCancel={true}
            onAction={this._createDataDialog.bind(this)}
          >
            <Form
              ref="form"
              fields={formFields}
              readonly={false} />
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
        var createButton = <Button
                  onClick={this._addNewDialog.bind(this)}>
                  + add file
                </Button>;
        if (this.state.files === null) {
            return <div>Loading files ...</div>;
        } else if (this.state.files.length === 0) {
            return <div>No files in the group - {createButton} {this._renderDialog()}</div>;
        } else {
          return (
              <div className="file-overview">

                  <ul className="file-list">
                     {files}
                  </ul>
                  <hr />
                  {this._renderDialog()}
                  {createButton}
              </div>
          );
        }
    }
}

export default FileList;
