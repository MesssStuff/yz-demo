<template>
  <div class="container" style="min-height: 597px;">
    <div class="section section-first">
      <div class="block form js-form">
        <input class="js-id" name="id" type="hidden" value="69150287">
        <div class="block-item" style="border-top:0;">
          <label>收货人</label>
          <input maxlength="20" name="user_name" placeholder="请输入姓名" type="text" v-model="name">
        </div>
        <div class="block-item">
          <label>联系电话</label>
          <input maxlength="11" name="tel" placeholder="联系电话" type="tel" v-model="tel">
        </div>
        <div class="block-item">
          <label>选择地区</label>
          <div class="select-group">
            <select class="js-province-selector" v-model="provinceValue">
              <option value="-1">选择省份</option>
              <option
                :key="province.value"
                :value="province.value"
                v-for="province in addressData.list"
              >{{province.label}}</option>
            </select>
            <select class="js-city-selector" v-model="cityValue">
              <option value="-1">选择城市</option>
              <option :key="city.value" :value="city.value" v-for="city in cityData">{{city.label}}</option>
            </select>
            <select
              class="js-county-selector"
              data-code="440402"
              name="area_code"
              v-model="districtValue"
            >
              <option value="-1">选择地区</option>
              <option
                :key="district.value"
                :value="district.value"
                v-for="district in districtData"
              >{{district.label}}</option>
            </select>
          </div>
        </div>
        <div class="block-item">
          <label>详细地址</label>
          <input
            maxlength="100"
            name="address_detail"
            placeholder="街道门牌信息"
            type="text"
            v-model="address"
          >
        </div>
      </div>
    </div>
    <div @click="save" class="block section js-save block-control-btn">
      <div class="block-item c-blue center">保存</div>
    </div>
    <div @click="remove" class="block section js-delete block-control-btn" v-if="type === 'edit'">
      <div class="block-item c-red center">删除</div>
    </div>
    <div
      @click="setAsDefault"
      class="block stick-bottom-row center js-save-default"
      v-if="type === 'edit'"
    >
      <button class="btn btn-standard js-save-default-btn">设为默认收货地址</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import url from 'js/api.js'

export default {
  data() {
    return {
      addressData: require('../../../modules/address.json'),
      cityData: null,
      districtData: null,
      instance: null,
      type: '',
      id: '',
      name: '',
      tel: '',
      address: '',
      provinceValue: '-1',
      cityValue: '-1',
      districtValue: '-1'
    }
  },
  created() {
    let query = this.$route.query
    this.type = query.type
    this.instance = query.instance

    if (this.type === 'edit') {
      this.setData()
    }
  },
  methods: {
    setData() {
      let data = this.instance
      this.id = data.id
      this.name = data.name
      this.tel = data.tel
      this.address = data.address
      this.provinceValue = data.provinceValue
      this.cityValue = data.cityValue
      this.districtValue = data.districtValue
    },
    save() {
      let path = ''
      let data = {}
      if (this.type === 'edit') {
        path = url.addAddress
        let {
          address,
          cityValue,
          districtValue,
          provinceValue,
          id,
          name,
          tel
        } = this
        let data = {
          address,
          cityValue,
          districtValue,
          provinceValue,
          id,
          name,
          tel
        }
      } else {
        path = url.updateAddress
        let {
          address,
          cityValue,
          districtValue,
          provinceValue,
          name,
          tel
        } = this
        let data = {
          address,
          cityValue,
          districtValue,
          provinceValue,
          name,
          tel
        }
      }
      axios.post(path, data).then(res => {
        this.$router.go(-1)
      })
    },
    remove() {
      axios.post(url.removeAddress, { id: this.id }).then(res => {
        this.$router.go(-1)
      })
    },
    setAsDefault() {
      axios.post(url.setDefaultAddress, { id: this.id }).then(res => {
        this.$router.go(-1)
      })
    }
  },
  watch: {
    provinceValue: {
      immediate: false,
      handler: function(val) {
        if (val !== -1) {
          let provinceIndex = this.addressData.list.findIndex(item => {
            return item.value === val
          })
          this.cityData = this.addressData.list[provinceIndex].children
          this.cityValue = '-1'
          this.districtValue = '-1'
          if (this.type === 'edit') {
            this.cityValue = this.instance.cityValue
          }
        } else {
          this.cityValue = '-1'
          this.districtValue = '-1'
        }
      }
    },
    cityValue: {
      immediate: false,
      handler: function(val) {
        if (val !== -1) {
          let cityIndex = this.cityData.findIndex(item => {
            return item.value === val
          })
          this.districtData = this.cityData[cityIndex].children
          this.districtValue = '-1'
        } else {
          this.districtValue = '-1'
        }
      }
    }
  }
}
</script>

<style scoped>
@import './address_base.css';
@import './address.css';
</style>
