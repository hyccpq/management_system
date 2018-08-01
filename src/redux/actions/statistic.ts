import { StatisticSuccess } from './';
import HttpRequest from './request.tool';
import * as contents from '../constans';


export const statisticSuccess = (data: {}): StatisticSuccess => {
	return {
		type: contents.STATISTIC_SUCCESS,
		data
	};
};

class StatisticRequest extends HttpRequest<StatisticSuccess, null> {
	protected successCb = statisticSuccess;
}

/**
 * 统计获取
 */
export const statistics = () => {
	let requestConfig = {
		method: 'get',
		url: '/manage/statistic/base_count.do'
	}
	let statisticRequest: StatisticRequest = new StatisticRequest(requestConfig);
	return statisticRequest.reqInf;
};