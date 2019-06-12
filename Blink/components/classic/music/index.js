// components/classic/music/index.js
import { classicBeh } from '../classic-beh.js'

const mMgr = wx.getBackgroundAudioManager()


Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    src: String,
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    pauseSrc: 'images/player@playing.png',
    playSrc: 'images/player@waitting.png',
    palying: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay(e){
      if(!this.data.palying){
        this.setData({
          palying: true
        })
        mMgr.title = this.properties.title
        mMgr.src = this.properties.src
      }else{
        this.setData({
          palying: false
        })
        mMgr.pause()
      }
      
    }
  },
  detached(e){
    mMgr.stop()
  }
})
