import { HTTP } from '../utils/http-p.js'

class KeyWordModel extends HTTP{
	// constructor(){
	// 	this.key = 'q'
	// 	this.max = 10

	// }
	key = 'q'
	max = 10
	getHistory(){
		const keywords = wx.getStorageSync(this.key) || []
		return keywords
	}
	addToHistory(keyword){
		let keywords = this.getHistory()
		const has = keywords.includes(keyword)
		if(!has){
			if(keywords.length >= this.max){
				lkeywords.pop
			}
			keywords.unshift(keyword)
			wx.setStorageSync(this.key, keywords)
		}		
	}
	getHot(){
		return this.request({
			url: 'book/hot_keyword'
		})
	}
}

export { KeyWordModel }