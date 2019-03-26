<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swp-page swiper-slide" v-for="img in imgs">
        <a :href="img.clickUrl" class="js-no-follow">
          <img :src="img.img" class="goods-main-photo fadeIn">
        </a>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'

export default {
  name: 'Swiper',
  props: {
    imgs: {
      type: Array,
      require: true
    }
  },
  mounted() {
    new Swiper('.swiper-container', {
      direction: 'horizontal',
      loop: true,

      pagination: {
        el: '.swiper-pagination'
      }
    })
  }
}
</script>

<style scoped>
.goods-main-photo {
  width: 100%;
}
</style>
