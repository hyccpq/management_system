import * as React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Sider } = Layout;
const { SubMenu } = Menu;

export interface MySideProps {}

export interface State {
    collapsed: boolean;
}

export default class MySide extends React.Component<MySideProps, State> {
    public state = {
        collapsed: false
    }

    private onCollapse = (collapsed: boolean) => {
        this.setState({
            collapsed
        })
    }

	public render() {
		return (
			<Sider
				collapsible
				collapsed={this.state.collapsed}
				onCollapse={this.onCollapse}
				style={{ padding: '48px 0' }}
			>
				<div className="logo" />
				<Menu theme="dark" defaultSelectedKeys={[ '1' ]} mode="inline">
					<Menu.Item key="1">
						<Icon type="pie-chart" />
						<span>首页</span>
					</Menu.Item>
					<Menu.Item key="2">
						<Icon type="desktop" />
						<span>Option 2</span>
					</Menu.Item>
					<SubMenu
						key="sub1"
						title={
							<span>
								<Icon type="user" />
								<span>User</span>
							</span>
						}
					>
						<Menu.Item key="3">Tom</Menu.Item>
						<Menu.Item key="4">Bill</Menu.Item>
						<Menu.Item key="5">Alex</Menu.Item>
					</SubMenu>
					<SubMenu
						key="sub2"
						title={
							<span>
								<Icon type="team" />
								<span>Team</span>
							</span>
						}
					>
						<Menu.Item key="6">Team 1</Menu.Item>
						<Menu.Item key="8">Team 2</Menu.Item>
					</SubMenu>
					<Menu.Item key="9">
						<Icon type="file" />
						<span>File</span>
					</Menu.Item>
				</Menu>
			</Sider>
		);
	}
}
