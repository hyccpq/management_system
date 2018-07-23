import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import configureStore from './redux/store/configureStore';

import './style/layout.less';
import './style/clear.less';

const store = configureStore();

import { notification } from 'antd';
import App from './app';

const MOUNT_NODE: HTMLElement = document.getElementById('root');

notification.config({
	placement: 'topRight',
	top: 100,
	duration: 3
});

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	MOUNT_NODE
);
