import './cart_base.css'
import './cart_trade.css'
import './cart_dialog.css'
import './cart.css'
import mixin from 'js/mixin.js'
import url from 'js/api.js'

import Vue from 'vue'
import axios from 'axios'

new Vue({
  el: '#app',
  data: {
    cartList: null,
    total: 0,
    editStoreIndex: -1,
    singleRemoveGoodId: -1,
    isShowModal: false
  },
  created() {
    this.getCartList()
  },
  computed: {
    allSelected: {
      get() {
        if (this.editStoreIndex === -1) {
          return this.cartList.every(store => store.normalChecked)
        } else {
          for (let index = 0; index < this.cartList.length; index++) {
            if (index === this.editStoreIndex) {
              return this.cartList[index].removeChecked
            }
          }
        }
      },
      set(val) {
        if (this.editStoreIndex === -1) {
          this.cartList.forEach(store => {
            store.normalChecked = val
            store.goodsList.forEach(good => {
              good.normalChecked = val
            })
          })
        } else {
          this.cartList.forEach((store, index) => {
            if (index === this.editStoreIndex) {
              store.removeChecked = val
              store.goodsList.forEach(good => {
                good.removeChecked = val
              })
            }
          })
        }
      }
    },
    normalSelectedList() {
      if (this.cartList && this.cartList.length > 0) {
        let goodArr = []
        let total = 0
        this.cartList.forEach(store => {
          store.goodsList.forEach(good => {
            if (good.normalChecked) {
              goodArr.push(good)
              total += good.price * good.number
            }
          })
        })
        this.total = total
        return goodArr
      } else {
        return 0
      }
    },
    removeSelectedList() {
      if (this.editStoreIndex !== -1) {
        let goodArr = []
        this.cartList[this.editStoreIndex].goodsList.forEach(good => {
          if (good.removeChecked) {
            goodArr.push(good)
          }
        })
        return goodArr
      } else {
        return []
      }
    }
  },
  methods: {
    getCartList() {
      axios.get(url.cartList).then(res => {
        let list = res.data.cartList
        list.forEach(store => {
          store.normalChecked = true
          store.removeChecked = false
          store.editing = false
          store.goodsList.forEach(good => {
            good.normalChecked = true
            good.removeChecked = false
          })
        })
        this.cartList = list
      })
    },
    checkGood(store, good) {
      let checkType = store.editing ? 'removeChecked' : 'normalChecked'
      good[checkType] = !good[checkType]
      store[checkType] = store.goodsList.every(good => {
        return good[checkType]
      })
    },
    checkStore(store) {
      let checkType = store.editing ? 'removeChecked' : 'normalChecked'
      store[checkType] = !store[checkType]
      store.goodsList.forEach(good => {
        good[checkType] = store[checkType]
      })
    },
    editStore(store, storeIndex) {
      store.editing = !store.editing
      this.editStoreIndex = store.editing ? storeIndex : -1
      this.cartList.forEach((store, index) => {
        if (index !== storeIndex) store.editing = false
      })
    },
    reduceGoods(good, number) {
      if (good.number <= 1) return
      axios
        .post(url.cartReduce, {
          id: good.id,
          number
        })
        .then(res => {
          good.number--
        })
    },
    addGoods(good, number) {
      axios
        .post(url.cartAdd, {
          id: good.id,
          number
        })
        .then(res => {
          good.number++
        })
    },
    removeSingleGood(id) {
      this.isShowModal = true
      this.singleRemoveGoodId = id
    },
    removeGoods() {
      let goodIdArr = []
      if (this.singleRemoveGoodId !== -1) {
        goodIdArr.push(this.singleRemoveGoodId)
        this.singleRemoveGoodId = -1
      } else {
        this.removeSelectedList.forEach(good => {
          goodIdArr.push(good.id)
        })
      }

      if (goodIdArr.length) {
        axios
          .post(url.cartMultiRemove, {
            ids: goodIdArr
          })
          .then(res => {
            let store = this.cartList[this.editStoreIndex]
            if (store.goodsList.length === goodIdArr.length) {
              this.cartList.splice(this.editStoreIndex, 1)
            }
            store.goodsList.forEach((good, index) => {
              if (goodIdArr.indexOf(good.id) !== -1) {
                store.goodsList.splice(index, 1)
              }
            })

            this.editStoreIndex = -1
            store.editing = false
            this.isShowModal = false
          })
      } else {
        this.isShowModal = false
      }
    }
  },
  mixins: [mixin]
})
