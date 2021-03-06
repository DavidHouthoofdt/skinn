/* @flow */
import React, {Component} from 'react';
import FileList from './CRUD/FileList';

type Props = {
  group: Object,
};

class GroupDetail extends Component {

    props: Props;

    static defaultProps = {
      group: null
    };

    render() {
      if (typeof this.props.group !== 'undefined' && this.props.group !== null) {
        return (
          <div>
            <div className="group-files"><FileList group={this.props.group} /></div>
          </div>
        );
      } else {
        return null;
      }
    }
}
export default GroupDetail;