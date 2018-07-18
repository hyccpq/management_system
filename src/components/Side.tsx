import * as React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router';
const { Sider } = Layout;
const { SubMenu } = Menu;
export interface MySideProps extends RouteComponentProps<MySideProps> {}

export interface State {
    collapsed: boolean;
}

class MySide extends React.Component<MySideProps, State> {
    public state = {
        collapsed: false
    }

    private onCollapse = (collapsed: boolean) => {
        this.setState({
            collapsed
        })
	}
	
	/**
	 * pageTab
	 */
	public pageTab = (e) => {
		console.log(e.key, e.keyPath);
		let tabUrl: string = ''
		// console.log(window.location.pathname);
		for (let i = 0; i < e.keyPath.length; i++) {
			tabUrl += e.keyPath[i];
		}
		this.props.history.push(tabUrl);
		
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
				<Menu theme="dark" defaultSelectedKeys={[ '/' ]} mode="inline" onClick={ this.pageTab }>
					<Menu.Item key="/">
						<Icon type="home" />
						<span>首页</span>
					</Menu.Item>
					<Menu.Item key="/uuuu">
						<Icon type="desktop" />
						<span>Option 2</span>
					</Menu.Item>
					<SubMenu
						key="/user"
						title={
							<span>
								<Icon type="user" />
								<span>用户</span>
							</span>
						}
					>
						<Menu.Item key="/index">用户管理</Menu.Item>
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

export default withRouter(MySide);