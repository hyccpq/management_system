import { OrderListSuccess } from './';
import HttpRequest from './request.tool';
import * as contents from '../constans';

export interface Order {
	pageSize?: number;
	pageNum?: number;
}

export const orderListSuccess = (data: {}): OrderListSuccess => {
	return {
		type: contents.ORDER_LIST_SUCCESS,
		data
	}
}

class OrderListRequest extends HttpRequest<OrderListSuccess, null> {
	protected successCb = orderListSuccess;
}

/**
 * 查询产品列表
 * @param pageSize 条目数	
 * @param pageNum 页数
 */
export const orderListReq = (pageSize: number = 10, pageNum: number = 1) => {
	let url: string = '/manage/order/list.do';
	let params = {
		pageNum, pageSize
	}
	let requestConfig = {
		method: 'get',
		url,
		params
	}
	let orderListRequest: OrderListRequest = new OrderListRequest(requestConfig);
	return orderListRequest.reqInf;
}