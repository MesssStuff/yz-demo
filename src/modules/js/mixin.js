let mixin = {
  filters: {
    currency(price) {
      return '￥' + price.toFixed(2)
    }
  }
}

export default mixin