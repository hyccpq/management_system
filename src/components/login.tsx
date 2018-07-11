import * as React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { loginFormForgot, loginFormButton } from '../style/login.css';

const FormItem = Form.Item;

export interface LoginProps extends FormComponentProps {}


 class Login extends React.Component<LoginProps, any> {
	public handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
			}
		});
    };
    
	public render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Form onSubmit={this.handleSubmit} className="login-form">
				<FormItem>
					{getFieldDecorator('userName', {
						rules: [ { required: true, message: '请输入您的用户名！' } ]
					})(
						<Input
							prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
							placeholder="用户名"
						/>
					)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('password', {
						rules: [ { required: true, message: '请输入您的密码！' } ]
					})(
						<Input
							prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
							type="password"
							placeholder="密码"
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
					<Button type="primary" htmlType="submit" className={loginFormButton}>
						登录
					</Button>
					或者 <a href="">点击此处注册</a>
				</FormItem>
			</Form>
		);
	}
}


export default Form.create()(Login);