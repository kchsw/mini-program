// components/preview/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    classic: {
      type: Object,
      observer(newVal){
        if(newVal){
          var typeText = {
            100: "电影",
            200: "音乐",
            300: "句子" 
          }[newVal.type]
        }
        this.setData({
          typeText
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    typeText: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(e){
      wx.navigateTo({
        url: `/pages/classic-one/classic-one?id=${this.data.classic.id}&type=${this.data.classic.type}`
      })
    }
  }
})
