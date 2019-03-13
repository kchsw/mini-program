// pages/posts/post-detail/post-detail.js
const postsData = require('../../../data/posts-data.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collected: false,
    isPlayingMusic: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id
    var postData = postsData.postList[postId]
    this.data.currentPostId = postId
    this.setData({
      postData: postData
    })

    // 设置缓存

    var postsCollected = wx.getStorageSync("posts_collected")
    if (postsCollected){
      var postCollected = postsCollected[postId]
      if (postCollected){
        this.setData({
          collected: postCollected
        })
      }
    }else{
      var postsCollected = {}
      postsCollected[postId] = false
      wx.setStorageSync("posts_collected", postsCollected)
    }

    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId){
      this.setData({
        isPlayingMusic: true
      })
    }

    this.setMusicMonitor()
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
// 切换收藏
  onCollectionTap: function(event){
    // var postsCollected = wx.getStorageSync("posts_collected")
    // var postCollected = postsCollected[this.data.currentPostId]
    // postCollected = !postCollected
    // postsCollected[this.data.currentPostId] = postCollected
    // this.showToast(postsCollected, postCollected)
    this.getPostsCollectedSyc()
  },
  //同步获取缓存
  getPostsCollectedSyc: function () {
    var postsCollected = wx.getStorageSync("posts_collected")
    var postCollected = postsCollected[this.data.currentPostId]
    postCollected = !postCollected
    postsCollected[this.data.currentPostId] = postCollected
    this.showToast(postsCollected, postCollected)
  },

  //异步获取缓存
  getPostsCollectedAsyc: function () {
    var that = this
    wx.getStorage({
      key: "posts_collected",
      success: function(res){
        var postsCollected = res.data
        var postCollected = postsCollected[that.data.currentPostId]
        postCollected = !postCollected
        postsCollected[this.data.currentPostId] = postCollected
        this.showToast(postsCollected, postCollected)
      }
    })
  },

  showToast: function (postsCollected, postCollected){
    wx.setStorageSync("posts_collected", postsCollected)
    this.setData({
      collected: postCollected
    })

    wx.showToast({
      title: postCollected ? '收藏成功' : '取消成功',
      duration: 1000,
      icon: 'success',
    })
  },

  onShareTap: function(event){
    var itemList = [
      "分享给微信好友",
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博"
    ]
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "40f580",
      success: function(res){
        // res.cancel 用户是不是点击了取消按钮
        // res.tapIndex 数组元素的序号，从0开始
        wx.showModal({
          title: '暂不支持分享功能',
          content: '',
        })
      }
    })
  },
  // 音乐播放
  onMusicTap: function(){
    var postData = this.data.postData
    var currentPostId = this.data.currentPostId
    var isPlayingMusic = this.data.isPlayingMusic
    if (isPlayingMusic){
      wx.pauseBackgroundAudio()
      this.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false
    }else{
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImg
      }),
      this.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic = true
      app.globalData.g_currentMusicPostId = currentPostId
    }
  },

  // 监听音乐播放
  setMusicMonitor: function(){
    var that = this
    wx.onBackgroundAudioPlay(function(event){
      var pages = getCurrentPages()
      var currentPage = pages[pages.length - 1]
      if (currentPage.data.currentPostId === that.data.currentPostId){
        if (app.globalData.g_currentMusicPostId === that.data.currentPostId){
          that.setData({
            isPlayingMusic: true
          })
        }
      }
      app.globalData.g_isPlayingMusic = true
    })

    wx.onBackgroundAudioPause(function(event){
      var pages = getCurrentPages()
      var currentPage = pages[pages.length - 1]
      if (currentPage.data.currentPostId === that.data.currentPostId) {
        if (app.globalData.g_currentMusicPostId === that.data.currentPostId) {
          that.setData({
            isPlayingMusic: false
          })
        }
      }
      app.globalData.g_isPlayingMusic = false
    })

    wx.onBackgroundAudioStop(function(event){
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false
    })
  }
})