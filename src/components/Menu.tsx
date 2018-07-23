import * as React from 'react';
import { Menu, Icon } from 'antd';
import { loadingState } from '../redux/actions';
import axios from '../util/axios';

import * as MenuStyle from '../style/menu.css';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';

const { SubMenu, ItemGroup } = Menu;

export interface MyMenuProps extends DispatchProps, RouteComponentProps<MyMenuProps> {}

export interface DispatchProps {
	loadingState: (state: boolean) => {};
}
export interface State {
	current: string;
	userName: string;
}

const mapDispatchToProps: DispatchProps = {
	loadingState
};


class MyMenu extends React.Component<MyMenuProps, State> {
	public state = {
		current: '',
		userName: ''
	};

	constructor(props: MyMenuProps) {
		super(props);
	}

	componentWillMount() {
		let userInfoStr: string = window.localStorage.getItem('userInfo');
		if (userInfoStr) {
			let userInfo = JSON.parse(userInfoStr);
			this.setState({
				userName: userInfo.msg.username
			});
		}
	}

	public handleClick = (e) => {
		console.log(e.key);
		this.setState({
			current: e.key
		});
	};

	/**
	 * logout
	 */
	public logout = async () => {
		try {
			await axios(loadingState)({
				method: 'post',
				url: '/user/logout.do'
			});
			console.log('登出成功');
			this.props.history.push('/login');
			
		} catch (error) {
			console.log(error);
			
		}
	};

	public render(): React.ReactNode {
		return (
			<Menu onClick={this.handleClick} selectedKeys={[ this.state.current ]} mode="horizontal">
				<Menu.Item key="log">
					<h3 className={MenuStyle.navTitle}>xxx订单管理系统</h3>
				</Menu.Item>

				<Menu.Item key="alipay" className={MenuStyle.navItem}>
					关于
				</Menu.Item>
				<SubMenu
					title={
						<span>
							<Icon type="setting" />欢迎您，{this.state.userName ? this.state.userName : 'xxx'}
						</span>
					}
					className={MenuStyle.navItem}
				>
					<ItemGroup title="用户管理">
						<Menu.Item key="setting:1" onClick={this.logout}>
							登出
						</Menu.Item>
					</ItemGroup>
				</SubMenu>
			</Menu>
		);
	}
}

export default connect(null, mapDispatchToProps)(withRouter(MyMenu));
