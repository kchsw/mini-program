// pages/home/home.js
const { formatPrice } = require('../../utils/format.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    category: [],
    advertPic: '',
    recommend: [],
    floors: {},
    hotGoods: {},
    slides: [],
    indicatorDots: true,
    autoplay: true,
    indicatorActiveColor: '#fff'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHomeData()
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
  getHomeData: function(){
    wx.request({
      // 必需
      url: 'https://www.easy-mock.com/mock/5cb9c65e544b7455dad94601/mall/',
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: (res) => {
        const data = res.data.data
        console.log(data)
        this.setData({
          category: data.category,
          advertPic: data.advertesPicture.PICTURE_ADDRESS,
          recommend: this.formatRecommend(data.recommend),
          floors: data.floors,
          hotGoods: this.formatRecommend(data.hotGoods),
          slides: data.slides
        })
      },
      fail: (res) => {
        
      },
      complete: (res) => {
        
      }
    })
  },

  formatRecommend(arr) {
    arr.map(item => {
      item.mallPrice = formatPrice(item.mallPrice)
      item.price = formatPrice(item.price)
    })
    return arr
  },

  goToGoods: function(){
    wx.navigateTo({
      url: '../goods/goods?id=0032862950ca44d397e58a6fb10a3e38',
    })
  },
  goToCategory: function(){
    wx.switchTab({
      url: '../category/category',
    })
  }

})