/* @flow */

import ReactDOM from 'react-dom';
import React from 'react';
import GroupList from './components/GroupList';
import LanguageList from './components/LanguageList';

ReactDOM.render(
    <div>
        <LanguageList />
        <GroupList />
    </div>, document.getElementById('app'));