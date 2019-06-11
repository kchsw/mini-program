// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    count: {
      type: Number,
      value: 0
    },
    like: {
      type: Boolean     
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc: 'images/like.png',
    noSrc: 'images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike(event){ 
      let count = this.data.count
      this.data.like ? count-- : count++
      this.setData({
        like: !this.data.like,
        count: count
      })
    }
  }
})
