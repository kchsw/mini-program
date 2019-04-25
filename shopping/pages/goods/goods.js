// pages/goods/goods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    testgoods: [{
        ID: "0032862950ca44d397e58a6fb10a3e38",
        name: "徐福记1250酥心糖桶600g/桶",
        present_price: 49.4,
        ori_price: 57.9,
        image: "http://images.baixingliangfan.cn/shopGoodsImg/20180213/20180213110054_6547.jpg",
        detail: [
          "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180213/20180213110101_3479.jpg",
          "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180213/20180213110101_7883.jpg",
          "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180213/20180213110102_4338.jpg",
          "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180213/20180213110102_9332.jpg",
          "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180213/20180213110102_4779.jpg",
          "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180213/20180213110102_2636.jpg",
          "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180213/20180213110102_6703.jpg",
          "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180213/20180213110102_2476.jpg",
          "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180213/20180213110103_647.jpg",
          "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180213/20180213110103_9999.jpg",
          "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180213/20180213110103_2042.jpg",
          "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180213/20180213110103_5857.jpg",
          "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180213/20180213110103_4012.jpg",
          "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180213/20180213110103_7879.jpg"
        ]
      },{
        ID: "01e2f8a88fe44bb8aa6e843ae02105a8",
        name: "心水天然水550ml/瓶",
        present_price: 2,
        ori_price: 2,
        image: "http://images.baixingliangfan.cn/shopGoodsImg/20180408/20180408170450_4878.jpg",
        detail: [
          "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180408/20180408170459_7218.jpg",
          "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180408/20180408170508_4846.jpg",
          "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180408/20180408170508_3012.jpg",
          "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180408/20180408170509_7443.jpg",
          "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180408/20180408170510_1160.jpg",
          "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180408/20180408170510_8740.jpg",
          "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180408/20180408170511_5821.jpg",
          "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180408/20180408170513_2115.jpg",
          "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180408/20180408170513_125.jpg",
          "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180408/20180408170514_5450.jpg",
          "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180408/20180408170515_2714.jpg",
          "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180408/20180408170515_2673.jpg",
          "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180408/20180408170515_2056.jpg",
          "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180408/20180408170516_1634.jpg",
          "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180408/20180408170516_335.jpg",
          "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180408/20180408170517_8340.jpg"
        ]
      }
    ],
    goods: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let goodsId = options.id
    let goods = this.data.testgoods.find(item => item.ID == goodsId)
    this.setData({
      goods
    })
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
  goToCart(){
    wx.switchTab({
      url: '../cart/cart',
    })
  },
  addToCart(e){
    let currentGoods = e.currentTarget.dataset.item
    let cartList = wx.getStorageSync('CART_LIST') || []
    let goods = cartList.find(item => item.ID == currentGoods.ID)
    if(goods){
      goods.count += 1
      wx.showToast({
        title: '添加成功',
        icon: 'success', // "success", "loading", "none"
        duration: 1500,
        mask: false,
      })
    }else{
      let goods = currentGoods
      goods.count = 1
      cartList.push(goods)
      wx.showToast({
        title: '添加成功',
        icon: 'success', // "success", "loading", "none"
        duration: 1500,
        mask: false,
      })
    }
    wx.setStorageSync('CART_LIST', cartList)
    
  },
  test(item){
    console.log(item)
  }
})