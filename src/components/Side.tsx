import * as React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router';
const { Sider } = Layout;
const { SubMenu } = Menu;
export interface MySideProps extends RouteComponentProps<MySideProps> {}

export interface State {
	collapsed: boolean;
	select: string[];
	openKey: string[];
}

class MySide extends React.Component<MySideProps, State> {
    readonly state: State = {
		collapsed: false,
		select: [],
		openKey: []
	}
	
	constructor (props) {
		super(props);
	}

	componentDidMount() {
		let url: string = window.location.pathname;
		let urlArr = url.split('/');
		let selectKey: string[] = [];
		if(urlArr.length > 1) {
			for (let i = 1; i < urlArr.length; i++) {
				selectKey.push('/' + urlArr[i]);
			}
		} else {
			selectKey = ['/']
		}
		this.setState({
			select: selectKey,
			openKey: [selectKey[0]],
		})
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
		for (let i = e.keyPath.length - 1; i >= 0 ; i--) {
			tabUrl += e.keyPath[i];
		}
		console.log(tabUrl);
		
		this.props.history.push(tabUrl);
		
	}

	public render() {
		let { select, openKey } = this.state;
		return (
			<Sider
				collapsible
				collapsed={this.state.collapsed}
				onCollapse={this.onCollapse}
				style={{ padding: '48px 0' }}
			>
				<div className="logo" />
				<Menu theme="dark" defaultSelectedKeys={select} defaultOpenKeys={openKey} mode="inline" onClick={ this.pageTab }>
					<Menu.Item key="/">
						<Icon type="home" />
						<span>首页</span>
					</Menu.Item>
					<Menu.Item key="/product_create">
						<Icon type="desktop" />
						<span>新建 & 编辑产品信息</span>
					</Menu.Item>
					<SubMenu
						key="/userinfo"
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
						key="/product"
						title={
							<span>
								<Icon type="team" />
								<span>商品</span>
							</span>
						}
					>
						<Menu.Item key="/itemList">商品列表</Menu.Item>
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