import * as React from 'react';
import { Spin } from 'antd';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
// import Home from './page/home';
import Layout from './layout';
// import Login from './page/loginPage';
import * as index from './style/index.css';
import { hot } from 'react-hot-loader';
import Loadable from 'react-loadable';

import './style/layout.less';
import './style/clear.less';
// import UserList from './page/userList';
// import ProductList from './page/productList';
import { connect } from 'react-redux';
import { AppState } from './redux/reducers';
// import ProductShow from './page/productShow';
// import ProductEditor from './page/productEditor';

export interface AppProps {
	loadState: boolean;
}

export interface State {}

const Login = Loadable({loader: () => import('./page/loginPage'), loading: () => null});
const Home = Loadable({loader: () => import('./page/home'), loading: () => null});
const UserList = Loadable({loader: () => import('./page/userList'), loading: () => null});
const ProductList = Loadable({loader: () => import('./page/productList'), loading: () => null});
const ProductEditor = Loadable({loader: () => import('./page/productEditor'), loading: () => null});
const ProductShow = Loadable({loader: () => import('./page/productShow'), loading: () => null});
// const Login = Loadable({loader: () => import('./page/loginPage'), loading: null});

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
						<Route path="/product_show/:productId/:title" component={ProductShow} />
						<Route
							path="/"
							render={() => (
								<Layout>
									<Switch>
										<Route exact path="/" component={Home} />
										<Route exact path="/product_create" component={ProductEditor} />
										<Route exact path="/product_edit/:productId" component={ProductEditor} />
										<Route exact path="/client_info/index" component={UserList} />
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
