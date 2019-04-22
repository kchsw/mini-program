const formatPrice = price => {
	return price.toFixed(2) || 0.00
}


module.exports = {
	formatPrice: formatPrice
}