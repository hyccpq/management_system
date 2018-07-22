import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { notification } from 'antd';
import App from './app';

const MOUNT_NODE: HTMLElement = document.getElementById('root');

notification.config({
	placement: 'topRight',
	top: 100,
	duration: 3
});


ReactDOM.render(<App />, MOUNT_NODE)


