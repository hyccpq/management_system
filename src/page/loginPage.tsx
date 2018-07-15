import * as React from 'react';
import Login from '../components/login';
import { Card } from 'antd';
import { loginCard, loginTitle } from '../style/login.css';        
import { RouterProps } from 'react-router';

export interface LoginPageProps extends RouterProps {}

export default class LoginPage extends React.Component<LoginPageProps, any> {
	
	public render() {
		return (
			<div>
				<Card className={ loginCard }>
                    <h1 className={ loginTitle }>订单管理系统登录</h1>
					<Login history={ this.props.history } />
				</Card>
			</div>
		);
	}
}
