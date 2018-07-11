import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducers } from './redux';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Home from './page/home';
import Layout from './layout'
import Login from './page/loginPage'

import './style/layout.less'

const store = createStore(reducers);

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
