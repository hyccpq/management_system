import { ProductListSuccess } from './';
import HttpRequest from './request.tool';
import * as contents from '../constans';

export interface Product {
	productName?: string;
	productId?: number;
}

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
export const productListReq = (pageSize: number, pageNum: number, product?: Product) => {
	let url = product ? '/manage/product/search.do' : '/manage/product/list.do';
	let params = product ? {
		pageSize, pageNum , ...product
	} : {
		pageNum, pageSize
	}
	let requestConfig = {
		method: 'get',
		url,
		params
	}
	let productListRequest: ProductListRequest = new ProductListRequest(requestConfig);
	return productListRequest.reqInf;
}

