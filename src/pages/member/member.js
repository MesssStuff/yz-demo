import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      component: require('./components/member.vue')
    },
    {
      path: '/address',
      component: require('./components/address.vue'),
      children:[
        {
          path: '',
          redirect: 'list'
        },
        {
          path: 'list',
          component: require('./components/addressList.vue')
        },
        {
          path: 'edit',
          name: 'edit',
          component: require('./components/addressEdit.vue')
        }
      ]
    }
  ]
}) 

new Vue({
  el: '#app',
  router
})