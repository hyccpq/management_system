import * as React from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox, notification } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { login } from '../redux/actions';
import { loginFormForgot, loginFormButton } from '../style/login.css';
import { AppState } from '../redux';

const FormItem = Form.Item;

export interface LoginState {
	userName: string;
	password: string;
}

export interface LoginProps extends FormComponentProps, ActionsProps, ReduxProps {
	history: {
		push: (url: string) => void;
	}
}
export interface ActionsProps {
	login: (userName: string, password: string) => {};
}

export interface ReduxProps {
	userInfo: any;
	loadState: boolean;
}

const mapStateToProps = (state: AppState): ReduxProps => {
	return {
		userInfo: state.user,
		loadState: state.loadState
	};
};

const mapDispatchToProps: ActionsProps = {
	login
};

class Login extends React.Component<LoginProps, LoginState> {
	readonly state: LoginState = {
		userName: '',
		password: ''
	};

	// setState(partialState: Partial<LoginState>){}

	public handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
			}
		});
	};

	public getUserFrom = (e: React.SyntheticEvent<HTMLInputElement>) => {
		let inputValue: string = e.currentTarget.value;
		let inputName = e.currentTarget.name as keyof LoginState;
		this.setState({
			[inputName]: inputValue
		} as Pick<LoginState, keyof LoginState>);
	};

	/**
	 * loginSystem
	 */
	public loginSystem = async () => {
		await this.props.login(this.state.userName, this.state.password);
		
		if (this.props.userInfo.success) {
			notification.success({
				message: '登陆成功',
				description: '欢迎回到系统！'
			});
			this.props.history.push('/');
		} else {
			notification.error({
				message: '登录失败，请重新登录',
				description: this.props.userInfo.msg
			});
		}
	};

	public render() {
		const { userInfo, loadState } = this.props;
		const { getFieldDecorator } = this.props.form;
		return (
			<Form onSubmit={this.handleSubmit} className="login-form">
				<FormItem>
					{getFieldDecorator('userName', {
						rules: [ { required: true, message: '请输入您的用户名！' } ]
					})(
						<Input
							name="userName"
							prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
							placeholder="用户名"
							onChange={this.getUserFrom}
						/>
					)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('password', {
						rules: [ { required: true, message: '请输入您的密码！' } ]
					})(
						<Input
							name="password"
							prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
							type="password"
							placeholder="密码"
							onChange={this.getUserFrom}
						/>
					)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('remember', {
						valuePropName: 'checked',
						initialValue: true
					})(<Checkbox>记住密码</Checkbox>)}
					<a className={loginFormForgot} href="">
						忘记密码？
					</a>
					<Button type="primary" htmlType="submit" className={loginFormButton} onClick={this.loginSystem}>
						登录
					</Button>
					或者 <a href="">点击此处注册</a>
				</FormItem>
			</Form>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Login));
