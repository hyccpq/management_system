import { ProductListSuccess } from './';
import HttpRequest from './request.tool';
import * as contents from '../constans';

export const productListSuccess = (data: {list: {}[], total: number}): ProductListSuccess => {
	return {
		type: contents.PRODUCT_LIST_SUCCESS,
		data
	}
}

class ProductListRequest extends HttpRequest<ProductListSuccess, null> {
	protected successCb = productListSuccess;
}

/**
 * 查询产品列表
 * @param pageSize 条目数	
 * @param pageNum 页数
 */
export const productListReq = (pageSize: number, pageNum: number) => {
	let requestConfig = {
		method: 'get',
		url: '/manage/product/list.do',
		params: {
			pageSize,
			pageNum
		}
	}
	let productListRequest: ProductListRequest = new ProductListRequest(requestConfig);
	return productListRequest.reqInf;
}
