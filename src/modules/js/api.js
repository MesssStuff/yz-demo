let url = {
  hotList: '/index/hotLists',
  banners: '/index/banner',
  topList: '/category/topList',
  subList: '/category/subList',
  rank: '/category/rank',
  searchList: '/search/list',
  goodsDetail: '/goods/details',
  dealList: '/goods/deal',
  cartList: '/cart/list',
  cartAdd: '/cart/add',
  cartReduce: '/cart/reduce',
  cartMultiRemove: '/cart/mrremove',
  addressList: '/address/list',
  addAddress: '/address/add',
  removeAddress: '/address/remove',
  updateAddress: '/address/update',
  setDefaultAddress: '/address/setDefault'
}

let host = 'http://rap2api.taobao.org/app/mock/7058'

for (let key in url) {
  if(url.hasOwnProperty(key)) {
    url[key] = host + url[key]
  }
}

export default url
