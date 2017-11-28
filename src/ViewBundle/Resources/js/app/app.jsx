/* @flow */

import ReactDOM from 'react-dom';
import React from 'react';
import GroupList from './components/CRUD/GroupList';
import CRUDLanguage from './flux/CRUDLanguage';
import CRUDGroup from './flux/CRUDGroup';
import CRUDFile from './flux/CRUDFile';

import LanguageList from './components/CRUD/LanguageList';

CRUDLanguage.init();
CRUDGroup.init();
CRUDFile.init();

ReactDOM.render(
    <div>
        <LanguageList />
        <GroupList />
    </div>, document.getElementById('app'));