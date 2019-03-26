import 'css/common.css'
import './search.css'
import url from 'js/api'
import mixin from 'js/mixin'

import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'

new Vue({
  el: '#app',
  data: {
    searchData: null,
    keyword: '',
    id: '',
    hasLeftTop: false
  },
  created() {
    let { keyword, id } = qs.parse(location.search.substr(1))
    this.keyword = keyword
    this.id = id
    this.getSearchList()

    window.onscroll = this.onMove
  },
  methods: {
    getSearchList() {
      axios
        .get(url.searchList, {
          params: {
            keyword: this.keyword,
            id: this.id
          }
        })
        .then(res => {
          this.searchData = res.data.lists
        })
    },
    onMove() {
      if (document.documentElement.scrollTop > 100) {
        if (!this.hasLeftTop) {
          this.hasLeftTop = true
          
        }
      } else {
        if (this.hasLeftTop) {
          this.hasLeftTop = false
        }
      }
    },
    toTop() {
      window.scrollTo({ behavior: 'smooth', top: 0 })
    }
  },
  mixins: [mixin]
})
