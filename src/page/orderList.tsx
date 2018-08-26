import * as React from 'react';
import { connect } from 'react-redux';
import { Table, Input, InputNumber, Popconfirm, Form } from 'antd';
import { orderListReq } from '../redux/actions/orderList';

export interface OrderListProps extends OrderListDispatchProps, OrderListStoreProps {}

export interface OrderListStoreProps {
	orderListData: any;
}

export interface OrderListDispatchProps {
	orderListReq: (pageSize?: number, pageNum?: number) => {};
}

export interface OrderListState {
	data: {}[];
	columns: {}[];
	orderCount: number;
	currentPage: number;
	currentSize: number;
}

class OrderList extends React.Component<OrderListProps, OrderListState> {
	readonly state: OrderListState = {
		data: [],
		orderCount: 0,
		currentPage: 0,
		currentSize: 10,
		columns: [
			{
				title: '订单编号',
				dataIndex: 'orderNo'
			},
			{
                title: '支付方式',
                dataIndex: 'paymentTypeDesc'
            },
			{
				title: '金额',
				dataIndex: 'payment'
			},
			{
				title: '支付状态',
				dataIndex: 'statusDesc'
            },
            {
                title: '操作',
				dataIndex: 'postage',
				render: (postage: number, { id, name }: { id: number; name: string }) => (
					<span>
						{postage.toString()}
					</span>
				)
            }
		]
	};

	async componentDidMount() {
		try {
			await this.serachList();
		} catch (error) {
			console.log(error);
		}
	}

	private pageChange = (page: number, pageSize: number) => {
		this.setState({
			currentPage: page,
			currentSize: pageSize
		});
		// this.requestList(pageSize, page);
		this.serachList(pageSize, page);
	};

	private onShowSizeChange = (current: number, pageSize: number) => {
		this.setState({
			currentPage: current,
			currentSize: pageSize
		});
		// this.requestList(pageSize, current);
		this.serachList(pageSize, current);
	};

	private async serachList(num?: number, page?: number) {
		try {
			await this.props.orderListReq(num, page);
			console.log(this.props.orderListData.list);

			this.setState({
				data: this.props.orderListData.list,
				orderCount: this.props.orderListData.total
			});
		} catch (error) {
			throw error;
		}
	}

	public render() {
		let { data, columns, orderCount } = this.state;
		return (
			<div>
				<h1>订单列表</h1>
				<Table
					columns={columns}
					dataSource={data}
					pagination={{
						total: orderCount,
						showSizeChanger: true,
						onShowSizeChange: this.onShowSizeChange,
						onChange: this.pageChange
					}}
					rowKey="orderNo"
				/>
			</div>
		);
	}
}

const mapState2Props = (state): OrderListStoreProps => {
	return {
		orderListData: state.orderList
	};
};

const mapDispatch2Props: OrderListDispatchProps = {
	orderListReq
};

export default connect(mapState2Props, mapDispatch2Props)(OrderList);
