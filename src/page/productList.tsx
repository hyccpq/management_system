import * as React from 'react';
import { Table, Button } from 'antd';
import { connect } from 'react-redux';
import { productListReq } from '../redux/actions';
import { AppState } from '../redux/reducers';

export interface ProductListState {
	data: {}[];
	columns: {}[];
	total: number;
}

export interface ProductListProps extends StateProps, DispatchProps {}

export interface StateProps {
	productList: any;
}

export interface DispatchProps {
	productListReq: (pageSize?: number, pageNum?: number) => {};
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
				width: 100
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
				render: (status: number) => (
					<span>
						{status === 1 ? (
							<span>
								在售 <br/>
								<Button type="primary" size="small">
									下线
								</Button>
							</span>
						) : (
							<span>
								已下架 <br/>
								<Button size="small">上线</Button>
							</span>
						)}
					</span>
				)
			},
			{
				title: '操作',
				dataIndex: 'categoryId',
				render: (categoryId: number) => (
					<span>
						<Button size="small">查看</Button>
						<Button size="small">编辑</Button>
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

	private pageChange = (page: number, pageSize: number) => {
		console.log(page, pageSize);
		this.requestList(pageSize, page);
	};

	private onShowSizeChange = (current: number, pageSize: number) => {
		console.log(current, pageSize);
		this.requestList(pageSize, current);
	};

	/**
     * requestList
     */
	public async requestList(pageSize?: number, pageNum?: number) {
		await this.props.productListReq(pageSize, pageNum);

		this.setState({
			data: this.props.productList.list,
			total: this.props.productList.total
		});
	}

	public render() {
		let { data, columns, total } = this.state;
		return (
			<div>
				<h1>商品列表页</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
