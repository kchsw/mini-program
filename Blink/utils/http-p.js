import { config } from '../config.js'

const tips = {
	1005: 'appkey失效',
	3000: '期刊不存在'
}

class HTTP{
	request({ url, data={}, method="GET" }){
		return new Promise((resolve, reject) => {
			this._request(url, resolve, reject, data, method)
		})
	}
	_request(url, resolve, reject, data={}, method="GET"){
		wx.request({			
			url: config.api_base_url + url,
			method,
			data,
			header: {
				'Content-Type': 'application/json',
				'appkey': config.appkey
			},
			success: (res) => {
				const code = res.statusCode
				if(code.toString().startsWith('2')){
					resolve(res.data)
				}else{
					reject()
					let error_code = res.data.error_code
					this._show_error(error_code)
				}
			},
			fail: (err) => {
				reject()
				this._show_error(1)
			}
		})
	}
	_show_error(error_code){
		wx.showToast({
			title: tips[error_code] || '抱歉，出现一个未知错误',
			icon: 'none',
			duration: 2000
		})
	}
}


export { HTTP } 