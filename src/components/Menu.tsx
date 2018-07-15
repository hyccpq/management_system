import * as React from 'react';
import { Menu, Icon } from 'antd';
import * as MenuStyle from '../style/menu.css';

const { SubMenu, ItemGroup } = Menu;

export interface MyMenuProps {}

export interface State {
	current: string;
	userName: string;
}

export default class MyMenu extends React.Component<MyMenuProps, State> {
	public state = {
		current: '',
		userName: ''
	};

	constructor(props: MyMenuProps) {
		super(props);
	}

	componentWillMount () {
		let userInfoStr:string = window.localStorage.getItem('userInfo');
		if(userInfoStr) {
			let userInfo = JSON.parse(userInfoStr);
			console.dir(userInfo)
			this.setState({
				userName: userInfo.data.data.username
			})
		}
	}

	public handleClick = (e) => {
		console.log(e.key);
		this.setState({
			current: e.key
		});
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
							<Icon type="setting" />欢迎您，{this.state.userName? this.state.userName : 'xxx'}
						</span>
					}
					className={MenuStyle.navItem}
				>
					<ItemGroup title="用户管理">
						<Menu.Item key="setting:1">登出</Menu.Item>
					</ItemGroup>
				</SubMenu>
			</Menu>
		);
	}
}
