import axios, { AxiosInstance } from 'axios';

let http: AxiosInstance = axios.create({
	baseURL: `${location.protocol}//${location.hostname}:${location.port}`,
	timeout: 60000,
	data: {}
});

function _request(param: {} = {}, fn: Function = () => {}) {
	return http({
		...param
	})
		.then((res) => {
			const { msg, status } = res.data;
			console.log(res.data);
			
			if (status === 10) {
				window.location.href = '/login';

				return;
			} else if (status === 0) {
				fn(false);

				return res;
			} else {
				throw msg;
			}
		})
		.catch((error) => {
			fn(false);
			throw error;
		});
}

function request(param: {});
function request(param: Function) {
	const type = typeof param;
	if (type === 'function') {
		param(true);
		
		return (obj: {}) => _request(obj, param);
	} else if (type === 'object' && type !== null) {
		return _request(param);
	}
}

export default request;
