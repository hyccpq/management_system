import * as React from 'react';
import MyMenu from '../components/Menu';
import MySide from '../components/Side';
import { Layout } from 'antd';
const { Header, Content, Footer } = Layout;


export interface LayoutProps {}

export default class MyLayout extends React.Component<LayoutProps, any> {
	public render() {
		return (
			<Layout className="my-layout">
				<Header className="my-header">
					<MyMenu />
				</Header>
				<Layout style={{ minHeight: '100vh' }}>
					<MySide />
					<Layout>
						<Content style={{ padding: '48px 16px' }}>
							<div style={{ padding: 24, background: '#fff', minHeight: 360 }}>{this.props.children}</div>
						</Content>
						<Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Kalec</Footer>
					</Layout>
				</Layout>
			</Layout>
		);
	}
}
