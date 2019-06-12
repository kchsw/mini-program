import { config } from '../config.js'

const tips = {
	1005: 'appkey失效',
	3000: '期刊不存在'
}

class HTTP{
	request(params){
		wx.request({			
			url: config.api_base_url + params.url,
			method: params.method || 'GET',
			data: params.data || {},
			header: {
				'Content-Type': 'application/json',
				'appkey': config.appkey
			},
			success: (res) => {
				let code = res.statusCode
				if(code.toString().startsWith('2')){
					params.success && params.success(res.data)
				}else{
					let error_code = res.data.error_code
					this._show_error(error_code)
				}
			},
			fail: (err) => {
				this._show_error(1)
			},
			complete: (res) => {
				
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