import './goods_common.css'
import './goods_custom.css'
import './goods.css'
import './goods_theme.css'
import './goods_mars.css'
import './goods_sku.css'
import url from 'js/api'
import mixin from 'js/mixin'
import Swiper from 'components/Swiper'

import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'

new Vue({
  el: '#app',
  data: {
    detailData: null,
    dealList: null,
    banners: [],
    id: '',
    tabSections: ['商品详情', '本店成交'],
    currentTab: '商品详情',
    skuType: 1,
    skuNum: 1,
    showCart: false,
    showToast: false
  },
  components: {
    Swiper
  },
  created() {
    let { id } = qs.parse(location.search.substr(1))
    this.id = id
    this.getDetailData()
    this.getDealData()
  },
  methods: {
    getDetailData() {
      axios
        .get(url.goodsDetail, {
          params: {
            id: this.id
          }
        })
        .then(res => {
          this.detailData = res.data.data
          res.data.data.imgs.forEach(item => {
            this.banners.push({
              clickUrl: '',
              img: item
            })
          })
        })
    },
    getDealData() {
      axios
        .get(url.dealList, {
          params: {
            id: this.id
          }
        })
        .then(res => {
          this.dealList = res.data.data.lists
        })
    },
    onTabClick(name) {
      this.currentTab = name
    },
    selectSku(type) {
      ;(this.skuType = type), (this.showCart = true)
    },
    skuNumCom(num) {
      if (typeof num !== 'number') num = 0
      if (this.skuNum <= 1 && num <= 0) {
        return 1
      } else {
        this.skuNum += num
        return this.skuNum
      }
    },
    addCart() {
      axios
        .post(url.addToCart, {
          id: +this.id,
          number: this.skuNum
        })
        .then(res => {
          this.showToastMsg(1000)
          this.showCart = false
        })
    },
    showToastMsg(duration) {
      this.showToast = true
      let timer = setTimeout(()=>{
        this.showToast = false
        clearTimeout(timer)
      }, duration)
    }
  },
  watch: {
    showCart(newVal, oldVal) {
      if (newVal) {
        document.documentElement.style.overflow = 'hidden'
      } else {
        document.documentElement.style.overflow = 'auto'
      }
    }
  },
  mixins: [mixin]
})
