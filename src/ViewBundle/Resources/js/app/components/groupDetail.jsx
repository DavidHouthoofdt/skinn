/* @flow */
import React, {Component} from 'react';
import FileList from './fileList';

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

    /**
     * Renders all assets
     *
     * @returns {XML}
     */
    renderGroupDetails() 
    {
        return 'group details';
    }



  render() {
    if (typeof this.props.group == 'undefined' || this.props.group === null) {
        return <div>Select a group</div>;
    } else {
        let groupDetails = this.renderGroupDetails();
        return (
            <div>
                <div className="group-details">{groupDetails}</div>
                <div className="group-files"><FileList group={this.props.group} /></div>
            </div>
        );
    }
  }
}
export default GroupDetail;