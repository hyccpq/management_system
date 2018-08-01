import { ProductShowSuccess } from './';
import HttpRequest from './request.tool';
import * as contents from '../constans';

export const productShowSuccess = (data: {list: {}[], total: number}): ProductShowSuccess => {
	return {
		type: contents.PRODUCT_SHOW_SUCCESS,
		data
	}
}

class ProductShowRequest extends HttpRequest<ProductShowSuccess, null> {
	protected successCb = productShowSuccess;
}

export const productShowReq = (productId: string) => {
	let requestConfig = {
		method: 'get',
		url: '/manage/product/detail.do',
		params: {
			productId
		}
	}
	let productShowRequest: ProductShowRequest = new ProductShowRequest(requestConfig);
	return productShowRequest.reqInf;
}