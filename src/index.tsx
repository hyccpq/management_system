import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/store/configureStore';
import { notification, Spin } from 'antd';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Home from './page/home';
import Layout from './layout';
import Login from './page/loginPage';
import { Store, AnyAction } from 'redux';
import * as index from './style/index.css'
import { AppState } from './redux';

import './style/layout.less';
import './style/clear.less';

const store = configureStore();

notification.config({
	placement: 'topRight',
	top: 100,
	duration: 3
});

export interface State {
	store: Store<AppState, AnyAction>;
	loadState: boolean;
}

class App extends React.Component<any ,State> {
	readonly state = {
		store,
		loadState: false
	}

	constructor(props){
		super(props);
		this.state.store.subscribe(this.getState)
	}

	/**
	 * getState
	 */
	public getState = () => {
		this.setState({
			loadState: this.state.store.getState().loadState
		})
	}

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

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
