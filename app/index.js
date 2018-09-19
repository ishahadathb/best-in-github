import React from 'react';
import {render} from 'react-dom';
import {App} from './components/App';
require('./index.css');


render(
    <App/>,
    document.getElementById('app')
);