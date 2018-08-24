import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../redux/reducers';
import { productShowReq } from '../redux/actions/productShow';
import { withRouter, RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import * as productShowStyle from '../style/produtShow.css';
import '../style/animation.less';

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
		index: 0,
		productImageList: []
	};

	protected timer

	public async componentDidMount() {
		let { productId } = this.props.match.params;

		await this.props.productShowReq(productId);
		console.warn(productId);
		let productImageList: string[] = this.props.productInfo.subImages.split(',')
		this.setState({
			mainImageUri: this.props.productInfo.mainImage,
			productImageList
		}, this.tabImage);
	}

	/**
	 * tabImage
	 */
	public tabImage = (): void => {
		let productImgLen: number = this.state.productImageList.length
		let index: number
		if(productImgLen === 1 || !productImgLen) {
			return;
		}
		this.timer = setInterval(() => {
			if(this.state.index === productImgLen - 1) {
				index = 0
			} else {
				index = this.state.index + 1
			}
			this.setState({
				index
			})
		}, 3000)
	}

	/**
	 * closeTabImage
	 */
	public closeTabImage = () => {
		clearInterval(this.timer)
	}

	public activeImage(index: number, uri: string) {
		this.setState({
			mainImageUri: uri,
			index
		});
	}

	public render() {
		let { productInfo } = this.props;

		return (
			<Layout className="layout">
				<Content className={productShowStyle.all}>
					<Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>
							<Link to="/">首页</Link>
						</Breadcrumb.Item>
						<Breadcrumb.Item>
							<Link to="/product/itemList">商品列表</Link>
						</Breadcrumb.Item>
						<Breadcrumb.Item>{productInfo.name}</Breadcrumb.Item>
					</Breadcrumb>
					<div className={productShowStyle.content}>
						<section className={productShowStyle.show} 
							onMouseOut={this.tabImage}
							onMouseOver={this.closeTabImage}
							>
							<div className={productShowStyle.showOneImage}>
									{productInfo.subImages ? (
										productInfo.subImages.split(',').map((item, index) => {
											return (
													<CSSTransition 
													key={index}
													in={this.state.index === index}
													classNames="image" 
													timeout={500}
													unmountOnExit
													>
															<img
																// style={{display: this.state.index === index ? 'block': 'none'}}
																className={productShowStyle.oneImage}
																src={productInfo.imageHost + item}
																alt=""
															/>
													</CSSTransition>
											);
										})
									) : null}
							</div>
							<div className={productShowStyle.subImages}>
								{productInfo.subImages ? (
									productInfo.subImages.split(',').map((item, index) => {
										return (
											<div
												key={index}
												className={productShowStyle.showSubImages}
												style={this.state.index === index ? { border: '2px solid #c75' } : null}
												onClick={() => this.activeImage(index, item)}
											>
												<img
													src={productInfo.imageHost + item}
													className={productShowStyle.imageShow}
													alt=""
												/>
											</div>
										);
									})
								) : null}
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

					<article dangerouslySetInnerHTML={{ __html: productInfo.detail }} />
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
