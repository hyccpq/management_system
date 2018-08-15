import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../redux/reducers';
import { productShowReq } from '../redux/actions/productShow';
import { withRouter, RouteComponentProps } from 'react-router';
import { Layout, Menu, Breadcrumb } from 'antd';
import * as productShowStyle from '../style/produtShow.css';

const { Content, Footer } = Layout;

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
	readonly state = {
		mainImageUri: '',
		index: 0
	}

	public async componentDidMount() {
		let { productId } = this.props.match.params;
		
		await this.props.productShowReq(productId);
		console.warn(productId)
		this.setState({
			mainImageUri: this.props.productInfo.mainImage
		})
	}

	public activeImage(index: number, uri: string) {
		this.setState({
			mainImageUri: uri,
			index
		})
	}

	public render() {
        let { productInfo } = this.props;
        console.log(productInfo);
        
		return (
			<Layout className="layout">
				<Content className={productShowStyle.all}>
					<Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>Home</Breadcrumb.Item>
						<Breadcrumb.Item>List</Breadcrumb.Item>
						<Breadcrumb.Item>App</Breadcrumb.Item>
					</Breadcrumb>
					<div className={productShowStyle.content}>
						<section className={productShowStyle.show}>
							<div className={productShowStyle.showOneImage}>
								<img className={productShowStyle.oneImage} src={this.state.mainImageUri ? (productInfo.imageHost + this.state.mainImageUri) : ''} alt="" />
							</div>
							<div className={productShowStyle.subImages}>
								{
									productInfo.subImages ? productInfo.subImages.split(',').map((item, index) => {
											return (
												<div 
													key={index} 
													className={productShowStyle.showSubImages} 
													style={this.state.index === index ? {border: '2px solid #c75'} : null}
													onClick={() => this.activeImage(index, item)}
												>
													<img 
														src={productInfo.imageHost + item} 
														className={productShowStyle.imageShow} 
														alt="" 
													/>
												</div>
											)
										}
									) : null
								}
							</div>
						</section>
						<div className={productShowStyle.titleAndInfo}>
							<h1>{productInfo.name}</h1>
							<p>{productInfo.updateTime}</p>
                    		<h2>{productInfo.subtitle}</h2>
                    		<p>价格： {productInfo.price}</p>
                    		<p>库存： {productInfo.stock}</p>
                    		<p>状态： {productInfo.status === 1 ? '在售' : '已下架'} </p>
						</div>
					</div>
                        
                        
                        <article dangerouslySetInnerHTML={{__html: productInfo.detail}}></article>
                    
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
