import { CategorySuccess } from './';
import HttpRequest from './request.tool';
import * as contents from '../constans';

export const categorySuccess = (data: {}): CategorySuccess => {
	return {
		type: contents.PRODUCT_CLASS_SUCCESS,
		data
	}
}

class CategoryListRequest extends HttpRequest<CategorySuccess, null> {
	protected successCb = categorySuccess;
}

export const categoryReq = (categoryId: number = 0) => {
	let requestConfig = {
		method: 'get',
		url: '/manage/category/get_category.do',
		params: {
			categoryId,
		}
	}
	let categoryRequest: CategoryListRequest = new CategoryListRequest(requestConfig);
	return categoryRequest.reqInf;
}
