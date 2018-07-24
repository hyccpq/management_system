import * as React from 'react';
import { Spin } from 'antd';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Home from './page/home';
import Layout from './layout';
import Login from './page/loginPage';
import * as index from './style/index.css';
import { hot } from 'react-hot-loader';

import './style/layout.less';
import './style/clear.less';
import UserList from './page/userList';
import ProductList from './page/productList';
import { connect } from 'react-redux';
import { AppState } from './redux/reducers';

export interface AppProps {
	loadState: boolean;
}

export interface State {}

class App extends React.Component<AppProps, State> {
	constructor(props) {
		super(props);
	}

	public render() {
		let { loadState } = this.props;
		return (
			<Spin spinning={loadState} size="large" className={index.loading}>
				<Router>
					<Switch>
						<Route path="/login" component={Login} />
						<Route
							path="/"
							render={(props) => (
								<Layout>
									<Switch>
										<Route exact path="/" component={Home} />
										<Route exact path="/userinfo/index" component={UserList} />
										<Route exact path="/product/itemList" component={ProductList} />
										<Redirect from="*" to="/" />
									</Switch>
								</Layout>
							)}
						/>
					</Switch>
				</Router>
			</Spin>
		);
	}
}

const mapStates = (state: AppState): AppProps => {
	return {
		loadState: state.loadState
	}
}

export default hot(module)(connect(mapStates)(App));
