import * as React from 'react';
import { Table, Button, notification, Icon, Input } from 'antd';
import { connect } from 'react-redux';
import { productListReq, Product } from '../redux/actions/productList';
import { AppState } from '../redux/reducers';
import axios from '../util/axios';
import { withRouter, RouteComponentProps } from 'react-router';
import * as proList from '../style/productList.css';

const Search = Input.Search

export interface ProductListState {
	data: {}[];
	columns: {}[];
	total: number;
	currentPage: number;
	currentSize: number;
	serach: string;
	prewSerach: string;
}

export interface ProductListProps extends StateProps, DispatchProps, RouteComponentProps<ProductListProps> {}

export interface StateProps {
	productList: any;
}

export interface DispatchProps {
	productListReq: (pageSize?: number, pageNum?: number, product?: Product) => {};
}

const mapStateToProps = (state: AppState): StateProps => {
	return {
		productList: state.productList
	};
};

const mapDispatchToProps: DispatchProps = {
	productListReq
};

class ProductList extends React.Component<ProductListProps, ProductListState> {
	readonly state: ProductListState = {
		data: [],
		total: 0,
		currentPage: 1,
		currentSize: 10,
		serach: '',
		prewSerach: '',
		columns: [
			{
				title: '编号',
				dataIndex: 'id',
				key: 'id',
				width: 60
			},
			{
				title: '商品名',
				dataIndex: 'name',
				width: 200
			},
			{
				title: '价格',
				dataIndex: 'price',
				width: 100
			},
			{
				title: '描述',
				dataIndex: 'subtitle',
				width: 300
			},
			{
				title: '状态',
				dataIndex: 'status',
				width: 80,
				render: (status: number, { id }: { id: number }) => (
					<span>
						{status === 1 ? (
							<span>
								在售 <br />
								<Button
									type="primary"
									size="small"
									onClick={() => {
										this.setProductStatus(id, 2);
									}}
								>
									下线
								</Button>
							</span>
						) : (
							<span>
								已下架 <br />
								<Button
									size="small"
									onClick={() => {
										this.setProductStatus(id, 1);
									}}
								>
									上线
								</Button>
							</span>
						)}
					</span>
				)
			},
			{
				title: '操作',
				dataIndex: 'categoryId',
				width: 180,
				render: (categoryId: number, { id, name }: { id: number; name: string }) => (
					<span>
						<Button size="small" onClick={() => this.gotoProductShow(id, name)}>
							查看
						</Button>
						<Button size="small" onClick={() => this.gotoProductEdit(id, name)}>
							编辑
						</Button>
						<Button type="danger" size="small">
							删除
						</Button>
					</span>
				)
			}
		]
	};

	constructor(props: ProductListProps) {
		super(props);
	}

	componentDidMount() {
		this.requestList();
	}

	/**
	 * setProductStatus
	 */
	public setProductStatus = async (id: number, status: number) => {
		try {
			let res = await axios({
				method: 'post',
				url: '/manage/product/set_sale_status.do',
				params: {
					productId: id,
					status
				}
			});
			console.log(res);
			if (res.data.status === 0) {
				// await this.requestList(this.state.currentSize, this.state.currentPage);
				await this.serachList(this.state.currentSize, this.state.currentPage, this.state.serach);
				notification.success({
					message: '成功',
					description: res.data.data
				});
			} else {
				notification.error({
					message: '错误',
					description: res.data.data
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	private pageChange = (page: number, pageSize: number) => {
		this.setState({
			currentPage: page,
			currentSize: pageSize
		});
		// this.requestList(pageSize, page);
		this.serachList(pageSize, page, this.state.serach);
	};

	private onShowSizeChange = (current: number, pageSize: number) => {
		this.setState({
			currentPage: current,
			currentSize: pageSize
		});
		// this.requestList(pageSize, current);
		this.serachList(pageSize, current, this.state.serach);
	};

	/**
     * requestList
     */
	public async requestList(pageSize?: number, pageNum?: number, product?: Product) {
		await this.props.productListReq(pageSize, pageNum, product);
		this.setState({
			data: this.props.productList.list,
			total: this.props.productList.total
		});
	}

	/**
	 * gotoProductShow
	 */
	public gotoProductShow(productId: number, title: string) {
		this.props.history.push(`/product_show/${productId}/${title}`);
	}

	/**
	 * gotoProductEdit
	 */
	public gotoProductEdit(productId: number, title?: string) {
		this.props.history.push(`/product_edit/${productId}`);
	}

	/**
	 * toCreateProd
	 */
	public toCreateProd = () => {
		this.props.history.push('/product_create');
	}

	public async serachList (pageSize: number, pageNum: number, value: string) {
		this.setState({
			serach: value,
			prewSerach: value
		})
		if(!value) {
			await this.requestList(pageSize, pageNum)
		} else if(Number.isNaN(Number(value))) {
			await this.requestList(pageSize, pageNum, { productName: value })
		} else {
			await this.requestList(pageSize, pageNum, { productId: Number(value) })
		}
	}

	public serachInput = (e) => {
		if(this.state.prewSerach && !e.target.value){
			this.requestList(this.state.currentSize, this.state.currentPage)
		}
	}

	public render() {
		let { data, columns, total } = this.state;
		return (
			<div>
				<div className={proList.allTitleContent}>
					<h1 className={proList.title}>商品列表页</h1>
					<Button className={proList.addButton} type="primary" size="large" onClick={this.toCreateProd}>
						<Icon type="file-add" />添加新商品
					</Button>
				</div>
				<Search
					placeholder="输入想要搜索的商品名或者ID"
					enterButton="Search"
					size="large"
					onSearch={value => this.serachList(this.state.currentSize, this.state.currentPage, value)}
					onChange={this.serachInput}
			    />

				<Table
					columns={columns}
					dataSource={data}
					pagination={{
						total,
						showSizeChanger: true,
						onShowSizeChange: this.onShowSizeChange,
						onChange: this.pageChange
					}}
					rowKey="id"
					scroll={{ y: '100%' }}
				/>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductList));
