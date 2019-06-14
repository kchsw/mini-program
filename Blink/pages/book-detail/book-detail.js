// pages/book-detail/book-detail.js
import { BookModel } from '../../models/book.js'
import { LikeModel } from '../../models/like.js'
const book = new BookModel()
const like = new LikeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    book: {},
    like: false,
    count: 0,
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '努力加载中',
      mask: false,
    })
    const { id } = options
    // const id = 7
    // book.getDetail(id).then(res => {
    //   this.setData({
    //     book: res
    //   })
    // })
    // book.getComments(id).then(res => {
    //   this.setData({
    //     comments: res.comments
    //   })
    // })
    // book.getLikeStatus(id).then(res => {
    //   this.setData({
    //     like: res.like_status,
    //     count: res.fav_nums
    //   })
    // })
    const detail = book.getDetail(id)
    const comments = book.getComments(id)
    const like = book.getLikeStatus(id)
    const promiseList = [detail, comments, like]
    Promise.all(promiseList)
            .then(res => {
              this.setData({
                book: res[0],
                comments: res[1].comments,
                like: res[2].like_status,
                count: res[2].fav_nums
              })
              wx.hideLoading()
            })
  },

  onLike(e){
    let behavior = e.detail.behavior
    like.like(behavior, this.data.book.id, 400)
  },
  onFakePost(e){
    this.setData({
      posting: true
    })
  },
  onCancel(e){
    this.setData({
      posting: false
    })
  },
  onPost(e){
    const comment = e.detail.text || e.detail.value
    if(!comment) return 
    if(comment.length > 12){
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return
    }

    book.postComment(this.data.book.id, comment)
        .then(res => {
          wx.showToast({
            title: '+1',
            icon: 'none'
          })
        })

        this.data.comments.unshift({
          content: comment,
          nums: 1
        })
        this.setData({
          comments: this.data.comments,
          posting: false
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

  }
})