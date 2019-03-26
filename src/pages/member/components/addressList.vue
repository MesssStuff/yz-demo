<template>
  <div class="container" style="min-height: 597px;">
    <div class="block-list address-list section section-first js-no-webview-block">
      <a
        :class="{'address-item-default':item.isDefault}"
        :key="item.id"
        @click="toEdit(item)"
        class="block-item js-address-item address-item"
        v-for="item in addressList"
      >
        <div class="address-title">{{item.name}} {{item.tel}}</div>
        <p>{{item.cityName}}{{item.districtName}}{{item.address}}</p>
        <a class="address-edit">修改</a>
      </a>
    </div>
    <div class="block stick-bottom-row center">
      <router-link
        :to="{name: 'edit', query: {type: 'add'}}"
        class="btn btn-blue js-no-webview-block js-add-address-btn"
      >新增地址</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import url from 'js/api'

export default {
  name: 'addressList',
  data() {
    return {
      addressList: null
    }
  },
  created() {
    this.getAddressList()
  },
  methods: {
    getAddressList() {
      axios.get(url.addressList).then(res => {
        this.addressList = res.data.lists
      })
    },
    toEdit(item) {
      this.$router.push({
        name: 'edit',
        query: { type: 'edit', instance: item }
      })
    }
  }
}
</script>

<style scoped>
@import './address_base.css';
@import './address.css';
</style>
