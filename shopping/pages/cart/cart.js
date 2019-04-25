// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isEmpty: false,
    cartList: [],
    sum: 0,
    checkAll: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let cartList = (wx.getStorageSync('CART_LIST') || []) 
    // cartList.map(item => item.checked = false)
    // this.setData({
    //   cartList,
    //   isEmpty: cartList.length ? false : true, 
    //   // sum: cartList.reduce((sum, item) => { return sum + item.count * item.present_price }, 0) * 100
    // })
    // this.sumMoney()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let cartList = (wx.getStorageSync('CART_LIST') || []) 
    cartList.map(item => item.checked = true)
    this.setData({
      cartList,
      isEmpty: cartList.length ? false : true, 
      checkAll: true
      // sum: cartList.reduce((sum, item) => { return sum + item.count * item.present_price }, 0) * 100
    })
    this.sumMoney()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  onbtnTap: function(){
    wx.switchTab({
      url: '../category/category',
    })
  },
  sumMoney: function(){
    this.setData({
      // sum: this.data.cartList.reduce((sum, item) => { return sum + item.count * item.present_price }, 0) * 100
      sum: this.data.cartList.filter(item => item.checked == true).reduce((sum, item) => { return sum + item.count * item.present_price }, 0) * 100
    })
  },
  onCheckAll: function(){
    this.data.checkAll = !this.data.checkAll
    this.data.cartList.map(item => item.checked = this.data.checkAll)
    this.setData({
      checkAll: this.data.checkAll,
      cartList: this.data.cartList
    })
    this.sumMoney()
  },
  oncheck: function(e){
    let currentItem = this.data.cartList.find(item => item.ID == e.currentTarget.dataset.id)
    currentItem.checked = !currentItem.checked
    let checkedList = this.data.cartList.filter(item => item.checked == true)
    // checkedList.length == this.data.cartList.length? this.data.checkAll = true : this.data.checkAll = false
    this.data.checkAll = (checkedList.length == this.data.cartList.length)
    this.setData({
      cartList: this.data.cartList,
      checkAll: this.data.checkAll
    })
    this.sumMoney()
  },
  addChange: function(e){
    let currentItem = this.data.cartList.find(item => item.ID == e.currentTarget.dataset.id)
    currentItem.count++
    this.setData({
      cartList: this.data.cartList
    })
    this.sumMoney()
    wx.setStorageSync('CART_LIST', this.data.cartList)
  },
  decChange: function(e){
    let currentItem = this.data.cartList.find(item => item.ID == e.currentTarget.dataset.id)
    currentItem.count--
    // if(currentItem.count){
    //   let index = this.data.cartList.findIndex(item => item.ID === currentItem.ID)
    //   this.data.cartList.splice(index,1)
    // }
    this.setData({
      cartList: this.data.cartList
    })
    this.sumMoney()
    wx.setStorageSync('CART_LIST', this.data.cartList)
  },
  deleteItem: function(e){
    let currentItem = this.data.cartList.find(item => item.ID == e.currentTarget.dataset.id)
    wx.showModal({
      title: '测试不删除',
      content: '确定从购物车中移除该商品?',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (res) => {
        // res.confirm 为 true 时，表示用户点击了确定按钮
        if(res.confirm) {
          let index = this.data.cartList.findIndex(item => item.ID === currentItem.ID)
          // this.data.cartList.splice(index,1)
          // this.setData({
          //   cartList: this.data.cartList
          // })
          // wx.setStorageSync('CART_LIST', this.data.cartList)
        }
      },
    })
    this.sumMoney()
  }
})