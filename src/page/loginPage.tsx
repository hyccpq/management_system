import * as React from 'react';
import Login from '../components/login';
import { Card } from 'antd';
import { loginCard, loginTitle } from '../style/login.css';        

export interface LoginPageProps {}

export default class LoginPage extends React.Component<LoginPageProps, any> {
	public render() {
		return (
			<div>
				<Card className={ loginCard }>
                    <h1 className={ loginTitle }>订单管理系统登录</h1>
					<Login />
				</Card>
			</div>
		);
	}
}
