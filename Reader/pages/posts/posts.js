// pages/posts/posts.js
const postsData = require('../../data/posts-data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [{ id: 5, imgUrl: '/images/iqiyi.png'},
      { id: 4, imgUrl: '/images/vr.png' },
      { id: 5, imgUrl: '/images/wx.png' },
    ],
    indicatorDots: true,
    autoplay: true,
    indicatorActiveColor: '#fff'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(postsData)
    this.setData({
      postList: postsData.postList
    })
    // console.log(this.data.postList)
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
  onPostTap: function(event){
    var postId = event.currentTarget.dataset.postid
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    })
  },
  onSwiperTap: function(event){
    //类似事件代理
    // target指的是image currentTarget指的是swiper组件
    var postId = event.target.dataset.postid
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    })
  }
})