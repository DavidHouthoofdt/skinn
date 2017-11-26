/* @flow */

import ReactDOM from 'react-dom';
import React from 'react';
import GroupList from './components/groupList';
import LanguageList from './components/languageList';

ReactDOM.render(
    <div>
        <LanguageList />
        <GroupList />
    </div>, document.getElementById('app'));