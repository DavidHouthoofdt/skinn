/* @flow */
import React, {Component} from 'react';

import Dialog from './Dialog';
import Form from './Form';

class CRUD extends Component {

    constructor(props) {
      super(props);
    }

    actionClick(record: Object, action: string) {
        this.setState({dialog: {type: action, record: record}});
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
      this.props.CRUDObject.updateObject(this.state.dialog.record.id, this.refs.form.getData());
    }

    _createDataDialog(action: string) {
      this.setState({dialog: null});
      if (action === 'dismiss') {
        return;
      }
      this.props.CRUDObject.createObject(this.refs.form.getData());
    }
    
    renderCreateFormDialog(formFields) 
    {
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
        var formFields = this.props.CRUDObject.getFormFields(true);
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
              fields={this.props.CRUDObject.getFormFields()}
              readonly={!!readonly} />
          </Dialog>
        );
    }
}

export default CRUD;
