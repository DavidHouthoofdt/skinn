/* @flow */

import React from 'react';

type Props = {
  onAction: Function,
};

const Actions = (props: Props) =>
  <div className="Actions">
    <span
      tabIndex="0"
      className="ActionsInfo"
      title="More info"
      onClick={props.onAction.bind(null, 'info')}>&#8505;</span>
    <span
      tabIndex="0"
      className="ActionsEdit"
      title="Edit"
      onClick={props.onAction.bind(null, 'edit')}>&#10000;</span>

  </div>

Actions.defaultProps = {
  onAction: () => {},
};

export default Actions

