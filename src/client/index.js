/**
 * Client Entry File
 */

import React from 'react'
import ReactDOM from 'react-dom'
import ChatApp from './chatApp'

const e = React.createElement;

ReactDOM.render(
    e(ChatApp, null, null),
    document.getElementById('app')
);
