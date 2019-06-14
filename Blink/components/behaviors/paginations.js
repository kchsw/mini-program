const paginationBev = Behavior({
	data: {
		dataArray: [],
		total: 0,
		noresults: false
	},

	methods: {
		setMoreData(dataArray){
			const tempArray = this.data.dataArray.concat(dataArray)
			this.setData({
				dataArray: tempArray
			})
		},
		getCurrentStart(){
			return this.data.dataArray.length
		},
		setTotal(total){
			if(total == 0){
				this.setData({
					noresults: true
				})
			}
			this.setData({
				total
			})
		},
		hasMore(){
			if(this.data.dataArray.length >= this.data.total){
				return false
			}else{
				return true
			}
		},
		initialize(){
			this.setData({
				dataArray: [],
				total: 0,
				noresults: false
			})
		}
	}
})

export { paginationBev }