// components/search/index.js
import { KeyWordModel } from '../../models/keyword.js'
import { BookModel } from '../../models/book.js'
import { paginationBev } from '../behaviors/paginations.js'
const keywordmodel = new KeyWordModel()
const bookmodel = new BookModel()
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyKeys: [],
    hotKeys: [],
    searchData: [],
    // searching: false,
    q: '',
    loading: false,
    loadingCenter: false
  },

  attached(){
    const historyKeys = keywordmodel.getHistory()
    this.setData({
      historyKeys
    })
    keywordmodel.getHot()
                .then(res => {
                  this.setData({
                    hotKeys: res.hot
                  })
                })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel(e){
      this.triggerEvent('onCancel', {}, {})
      this.initialize()
      this.setData({
        q: ''
      })
    },
    onConfirm(e){
      this.initialize()
      this.setData({
        searching: true,
        loadingCenter: true
      })
      const keyword = e.detail.value || e.detail.text
      bookmodel.search(0, keyword).then(res => {
          this.setMoreData(res.books)
          this.setTotal(res.total)
          this.setData({
            q: keyword,
            loadingCenter: false
          })
          keywordmodel.addToHistory(keyword)
        })
    },
    onDelete(){
      this.initialize()
      this.setData({
        searching: false,
        q: ''
      })
    },
    loadMore(){
      if(!this.data.q || this.data.loading) return 
      const length = this.getCurrentStart()
      if(this.hasMore()){
        this.setData({
          loading: true
        })
        bookmodel.search(length, this.data.q).then(res => {
          this.setMoreData(res.books)
          this.setData({
            loading: false
          })
        }, () => {
          this.setData({
            loading: false
          }) 
        })
      }
    }
  }
})
