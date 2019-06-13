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
    playing: false
  },
  // detached(e){
  //   mMgr.stop()
  // }
  attached(e){
    this._recoverPlaying()
    this._monitorSwitchSwitch()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay(e){
      if(!this.data.playing){
        this.setData({
          playing: true
        })
        if(mMgr.src == this.properties.src){
          mMgr.play()
        }else{
          mMgr.src = this.properties.src
        }
        mMgr.title = this.properties.title
      }else{
        this.setData({
          playing: false
        })
        mMgr.pause()
      }
      
    },
    _recoverPlaying(){
      if(mMgr.paused){
        this.setData({
          playing: false
        })
        return 
      }
      if(mMgr.src == this.properties.src){
        if(!mMgr.paused){
          this.setData({
            playing: true
          })
        }
      }
    },

    // 有问题
    _monitorSwitchSwitch(){     
      mMgr.onPlay(() => {
        this._recoverPlaying()
      })
      mMgr.onPause(() => {
        this._recoverPlaying()
      })
      mMgr.onStop(() => {
        this._recoverPlaying()
      })
      mMgr.onEnded(()=>{
        this._recoverPlaying()
      })
    }
  }
  
  
})
