import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../redux/reducers';
import { productShowReq } from '../redux/actions';
import { withRouter, RouteComponentProps } from 'react-router';
import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;

export interface ProductShowProps
	extends ProductShowStateToProps,
		ProductDispatchToProps,
		RouteComponentProps<ProductShowProps> {
	title: string;
	productId: string;
}

export interface ProductShowStateToProps {
	productInfo: any;
}

export interface ProductDispatchToProps {
	productShowReq: (productId: string) => {};
}

class ProductShow extends React.Component<ProductShowProps, any> {
	async componentDidMount() {
		let { productId } = this.props.match.params;
		await this.props.productShowReq(productId);
	}

	public render() {
        let { productInfo } = this.props;
        console.log(productInfo);
        
		return (
			<Layout className="layout">
				<Header>
					<div className="logo" />
					<Menu theme="dark" mode="horizontal" defaultSelectedKeys={[ '2' ]} style={{ lineHeight: '64px' }}>
						<Menu.Item key="1">nav 1</Menu.Item>
						<Menu.Item key="2">nav 2</Menu.Item>
						<Menu.Item key="3">nav 3</Menu.Item>
					</Menu>
				</Header>
				<Content style={{ padding: '0 50px' }}>
					<Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>Home</Breadcrumb.Item>
						<Breadcrumb.Item>List</Breadcrumb.Item>
						<Breadcrumb.Item>App</Breadcrumb.Item>
					</Breadcrumb>
					<div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                        <h1>{productInfo.name}</h1>
                        <p>{productInfo.updateTime}</p>
                        <article dangerouslySetInnerHTML={{__html: productInfo.detail}}></article>
                    </div>
				</Content>
				<Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
			</Layout>
		);
	}
}

const mapStateToProps = (state: AppState): ProductShowStateToProps => {
	return {
		productInfo: state.productShow
	};
};

const mapDispatchToProps: ProductDispatchToProps = {
	productShowReq
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductShow));
