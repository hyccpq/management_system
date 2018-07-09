import * as React from 'react';
import { Button as MyButton, InputNumber } from 'antd'
import { connect } from 'react-redux';
import { increment, decrement, EnthusiasmAction } from '../redux/actions';
import { AppState } from '../redux';
import { Dispatch } from 'redux';

export interface NewProps {
    compiler: string;
    framework: string;
}

export interface ReduxProps {
    count: number;
    user: string;
}

export interface ActionsProps {
    onIncrement: () => {};
    onDecrement: () => {};
}

type AllProps = NewProps & ReduxProps & ActionsProps

const mapStateToProps = (state: AppState) => {
    return {
        count: state.counter,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch:Dispatch<EnthusiasmAction>) => {
    return {
        onIncrement: () => dispatch(increment()),
        onDecrement: () => dispatch(decrement())
    }
}

class App extends React.Component<AllProps, {}> {

    render() {
        const { compiler, framework, count, user, onDecrement, onIncrement } = this.props
        return (
            <div>
                <h1>Hello from { compiler } and { framework }!</h1>
                <MyButton>我的</MyButton>
                <InputNumber></InputNumber>
                真是牛逼哈哈哈
                <div>草拟吗，牛逼？？？</div>
                <div className="ui">呵呵</div>
                <h1>{ count }</h1>
                <MyButton onClick={ onIncrement }>加一</MyButton>
                <MyButton onClick={ onDecrement }>减一</MyButton>
                <p>{ user }</p>

            </div>

        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App as React.ComponentType<NewProps>)