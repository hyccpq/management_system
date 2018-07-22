import * as React from 'react';
import { Provider } from 'react-redux';
import configureStore from './redux/store/configureStore';
import { Spin } from 'antd';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Home from './page/home';
import Layout from './layout';
import Login from './page/loginPage';
import { Store, AnyAction } from 'redux';
import * as index from './style/index.css';
import { AppState } from './redux/reducers';
import { hot, AppContainer } from 'react-hot-loader';

import './style/layout.less';
import './style/clear.less';
import UserList from './page/userList';

const store = configureStore();

export interface State {
	store: Store<AppState, AnyAction>;
	loadState: boolean;
}

class App extends React.Component<any, State> {
	readonly state = {
		store,
		loadState: false
	};

	constructor(props) {
		super(props);
		this.state.store.subscribe(this.getState);
	}

	/**
	 * getState
	 */
	public getState = () => {
		this.setState({
			loadState: this.state.store.getState().loadState
		});
	};

	public render() {
		return (
			<Provider store={store}>
				<Spin spinning={this.state.loadState} size="large" className={index.loading}>
					<Router>
						<Switch>
							<Route path="/login" component={Login} />
							<Route
								path="/"
								render={(props) => (
									<Layout>
										<Switch>
											<Route exact path="/" component={Home} />
											<Route exact path="/index/user" component={UserList} />
											<Redirect from="*" to="/" />
										</Switch>
									</Layout>
								)}
							/>
						</Switch>
					</Router>
				</Spin>
			</Provider>
		);
	}
}

export default hot(module)(App);
