import 'css/common.css'
import './category.css'
import url from 'js/api.js'
import mixin from 'js/mixin.js'

import TabBar from 'components/TabBar'

import Vue from 'vue'
import axios from 'axios'

new Vue({
  el: '#app',
  components: {
    TabBar
  },
  data: {
    topList: null,
    subData: null,
    rankData: null,
    currentId: 800
  },
  created() {
    this.getTopList()
    this.getSubData(800)
  },
  methods: {
    getTopList() {
      axios.get(url.topList).then(res => {
        this.topList = res.data.lists
      })
    },
    getSubData(id) {
      this.currentId = id
      if (id === 800) {
        this.getRankData()
      } else {
        axios.get(url.subList, { params: { id } }).then(res => {
          this.subData = res.data.data
        })
      }
    },
    getRankData() {
      axios.get(url.rank).then(res => {
        this.rankData = res.data.data
      })
    },
    toSearch(keyword, id) {
      location.href = `search.html?keyword=${keyword}&id=${id}`
    }
  },
  mixins: [mixin]
})
