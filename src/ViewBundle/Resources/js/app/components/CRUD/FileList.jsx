/* @flow */
var _ = require('lodash');

import React from 'react';
import Button from '../Button';
import CRUD from '../CRUD';
import Actions from '../Actions';
import CRUDFile from '../../flux/CRUDFile';

class FileList extends CRUD {

  static defaultProps = Object.assign({}, CRUD.defaultProps, {
    CRUDObject: CRUDFile
  });

  constructor(props) {
    super(props);
    CRUDFile.loadGroupFiles(props.group.id);
    CRUDFile.addListener('files-loaded', () => {
      this.setState({
        files: CRUDFile.getFiles(),
        activeFile: null
      })
    });
    CRUDFile.addListener('file-updated', () => {
      this.setState({
        files: CRUDFile.getFiles(),
        activeFile: null
      })
    });
    CRUDFile.addListener('file-created', () => {
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
   * override the create form
   */
  _renderCreateFormDialog() {
    this.props.CRUDObject.setActiveFile({group_id: this.props.group.id});
    var formFields = this.props.CRUDObject.getFormFields(true);
    //set group id to the current group
    this.props.CRUDObject.setActiveFile(null);
    return this.renderCreateFormDialog(formFields);
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