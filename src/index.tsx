import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducers } from './redux';

import App from './components/test';
   
const store = createStore(reducers);


ReactDOM.render(
    (<Provider store={ store }>
        <App compiler={"kalec"} framework={"typescript2.9.3"} />
    </Provider>),
    document.getElementById('root')
);