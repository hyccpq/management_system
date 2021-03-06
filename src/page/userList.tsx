import * as React from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import { userInfoReq } from '../redux/actions/userInfo';
import { AppState } from '../redux/reducers';

export interface UserListProps extends UserProps, UserDispatchProps {}

export interface UserProps {
	userData: any;
}

export interface UserDispatchProps {
	userInfoReq: (pageSize: number, pageNum: number) => {};
}

export interface UserListState {
	columns: {}[];
	data: {}[];
	total: number;
}

class UserList extends React.Component<UserListProps, UserListState> {
	readonly state: UserListState = {
		columns: [
			{
				title: '编号',
				dataIndex: 'id',
				key: 'id',
				width: 100
			},
			{
				title: '用户名',
				dataIndex: 'username',
				width: 150
			},
			{
				title: '邮箱',
				dataIndex: 'email',
				width: 200
			},
			{
				title: '电话',
				dataIndex: 'phone'
			}
		],
		data: [],
		total: 0
	};

	componentDidMount() {
		this.requestUserList();
	}

	private async requestUserList(currentPage: number = 1, pageSize: number = 10) {
		try {
			await this.props.userInfoReq(pageSize, currentPage);
			let preListData = this.props.userData.list;
            if(!Array.isArray(preListData)) {
                return;
            }
			this.setState({
				data: preListData,
				total: this.props.userData.total
			});
			console.log(this.state.data);
		} catch (error) {
            console.log(error);
        }
	}

	private pageChange = (page: number, pageSize: number) => {
		console.log(page, pageSize);
		this.requestUserList(page, pageSize);
	};

	private onShowSizeChange = (current: number, pageSize: number) => {
		console.log(current, pageSize);
		this.requestUserList(current, pageSize);
	};

	public render() {
		let { total, columns, data } = this.state;
		return (
			<div>
				<h1>用户列表</h1>
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

const mapStateProps = (state: AppState): UserProps => {
	return {
		userData: state.userInfoList
	};
};

const mapDispatchToProps: UserDispatchProps = {
	userInfoReq
};

export default connect(mapStateProps, mapDispatchToProps)(UserList);
