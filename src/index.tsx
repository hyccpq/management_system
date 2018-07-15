import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/store/configureStore';
import { notification } from 'antd';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Home from './page/home';
import Layout from './layout';
import Login from './page/loginPage';

import './style/layout.less';

const store = configureStore();

notification.config({
	placement: 'topRight',
	top: 100,
	duration: 3
});

class App extends React.Component {
	public render() {
		return (
			<Provider store={store}>
				<Router>
					<Switch>
						<Route path="/login" component={Login} />
						<Route
							path="/"
							render={(props) => (
								<Layout>
									<Switch>
										<Route exact path="/" component={Home} />
										<Redirect from="*" to="/" />
									</Switch>
								</Layout>
							)}
						/>
					</Switch>
				</Router>
			</Provider>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
