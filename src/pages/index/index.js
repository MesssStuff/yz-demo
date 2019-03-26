import 'css/common.css'
import './index.css'
import url from 'js/api.js'

import TabBar from 'components/TabBar'
import Swiper from 'components/Swiper'

import Vue from 'vue'
import axios from 'axios'
import { InfiniteScroll } from 'mint-ui'

Vue.use(InfiniteScroll)

new Vue({
  el: '#app',
  data: {
    list: null,
    loading: false,
    allLoaded: false,
    pageNum: 1,
    pageSize: 6,
    banners: null
  },
  components: {
    TabBar,
    Swiper
  },
  created() {
    this.getBanners()
    this.getList()
  },
  methods: {
    getList() {
      if (this.allLoaded) return
      this.loading = true

      axios
        .get(url.hotList, {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize
          }
        })
        .then(res => {
          if (this.list) {
            this.list = this.list.concat(res.data.lists)
          } else {
            this.list = res.data.lists
          }
          if (res.data.lists.length < this.pageSize) {
            this.allLoaded = true
          }
          this.loading = false
          this.pageNum++
        })
    },

    getBanners() {
      axios.get(url.banners).then(res => {
        this.banners = res.data.lists
      })
    }
  }
})
