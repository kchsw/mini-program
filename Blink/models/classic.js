import { HTTP } from '../utils/http.js'

class ClassicModel extends HTTP{
	getLatest(callback){
		this.request({
		    url: 'classic/latest',
		    success: (res) => {
		        callback(res)
		        this._setLatestIndex(res.index)
		        wx.setStorageSync(this._getKey(res.index), res)
		    }
	    })
	}
	// getPrevious(index, callback){
	// 	this.request({
	// 	    url: 'classic/' + index + '/previous',
	// 	    success: (res) => {
	// 	        callback(res)
	// 	    }
	//     })
	// }
	// getNext(index, callback){
	// 	this.request({
	// 	    url: 'classic/' + index + '/next',
	// 	    success: (res) => {
	// 	        callback(res)
	// 	    }
	//     })
	// }

	getClassic(index, method, callback){
		let key = method == 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
		let classic = wx.getStorageSync(key)
		if(classic){
			callback(classic)
		}else{
			this.request({
			    url: 'classic/' + index + '/' + method,
			    success: (res) => {
			    	wx.setStorageSync(this._getKey(res.index), res)
			        callback(res)
			    }
		    })
		}
	}

	isFirst(index){
		return index == 1 ? true : false
	}

	isLatest(index){
		let latestIndex = this._getLatestIndex()
		return index == latestIndex ? true : false
	}

	getMyFavor(success){
		const params = {
			url: 'classic/favor',
			success: success
		}
		this.request(params)
	}

	_setLatestIndex(index){
		try {
		    wx.setStorageSync('latest', index)
		} catch (e) {
		    
		}
	}

	_getLatestIndex(){
		let index = wx.getStorageSync('latest')
		return index
	}

	_getKey(index){
		let key = "classic-" + index
		return key
	}
}

export { ClassicModel }