const chars = ["0", "1", "2", "3", "4", "a", "A", "b", "B", "c", "C"]
const random = function gennrrateMixed(n){
	let res = ''
	for(var i = 0; i < n; i++){
		const id = Math.ceil(Math.random() * 11)
		res += chars[id]
	}
	return res
}

export { random }