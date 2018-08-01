import { UserInfoSuccess } from './';
import HttpRequest from './request.tool';
import * as contents from '../constans';

export const userInfoSuccess = (data: {list: {}[], total: number}): UserInfoSuccess => {
	return {
		type: contents.USERINFO_SUCCESS,
		data
	}
}

class UserInfoRequest extends HttpRequest<UserInfoSuccess, null> {
	protected successCb = userInfoSuccess;
}

/**
 * 查询用户列表信息
 * @param pageSize 查询条目
 * @param pageNum 查询页数
 */
export const userInfoReq = (pageSize: number, pageNum: number) => {
	let requestConfig = {
		method: 'get',
		url: '/manage/user/list.do',
		params: {
			pageSize,
			pageNum
		}
	}
	let userInfoRequest: UserInfoRequest = new UserInfoRequest(requestConfig);
	return userInfoRequest.reqInf;
}

