webpackJsonp([1],{11:function(t,a,i){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=i(28),s=i(13);i.n(s);a.default={name:"Swiper",props:{imgs:{type:Array,require:!0}},mounted:function(){new n.a(".swiper-container",{direction:"horizontal",loop:!0,pagination:{el:".swiper-pagination"}})}}},13:function(t,a){},14:function(t,a){},16:function(t,a){t.exports={render:function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"swiper-container"},[i("div",{staticClass:"swiper-wrapper"},[t._l(t.imgs,function(t){return i("div",{staticClass:"swp-page swiper-slide"},[i("a",{staticClass:"js-no-follow",attrs:{href:t.clickUrl}},[i("img",{staticClass:"goods-main-photo fadeIn",attrs:{src:t.img}})])])}),t._v(" "),i("div",{staticClass:"swiper-pagination"})],2)])},staticRenderFns:[]}},2:function(t,a,i){"use strict";var n={hotList:"/index/hotLists",banners:"/index/banner",topList:"/category/topList",subList:"/category/subList",rank:"/category/rank",searchList:"/search/list",goodsDetail:"/goods/details",dealList:"/goods/deal",addToCart:"/cart/add"};for(var s in n)n.hasOwnProperty(s)&&(n[s]="http://rap2api.taobao.org/app/mock/7058"+n[s]);a.a=n},3:function(t,a,i){"use strict";var n={filters:{currency:function(t){return"￥"+t.toFixed(2)}}};a.a=n},34:function(t,a){},35:function(t,a){},36:function(t,a){},37:function(t,a){},38:function(t,a){},39:function(t,a){},64:function(t,a,i){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=i(35),s=(i.n(n),i(36)),e=(i.n(s),i(34)),o=(i.n(e),i(39)),r=(i.n(o),i(37)),c=(i.n(r),i(38)),u=(i.n(c),i(2)),d=i(3),l=i(7),f=i.n(l),h=i(0),p=i(5),m=i.n(p),g=i(6),w=i.n(g);new h.default({el:"#app",data:{detailData:null,dealList:null,banners:[],id:"",tabSections:["商品详情","本店成交"],currentTab:"商品详情",skuType:1,skuNum:1,showCart:!1,showToast:!1},components:{Swiper:f.a},created:function(){var t=w.a.parse(location.search.substr(1)),a=t.id;this.id=a,this.getDetailData(),this.getDealData()},methods:{getDetailData:function(){var t=this;m.a.get(u.a.goodsDetail,{params:{id:this.id}}).then(function(a){t.detailData=a.data.data,a.data.data.imgs.forEach(function(a){t.banners.push({clickUrl:"",img:a})})})},getDealData:function(){var t=this;m.a.get(u.a.dealList,{params:{id:this.id}}).then(function(a){t.dealList=a.data.data.lists})},onTabClick:function(t){this.currentTab=t},selectSku:function(t){this.skuType=t,this.showCart=!0},skuNumCom:function(t){return"number"!=typeof t&&(t=0),this.skuNum<=1&&t<=0?1:(this.skuNum+=t,this.skuNum)},addCart:function(){var t=this;m.a.post(u.a.addToCart,{id:+this.id,number:this.skuNum}).then(function(a){t.showToastMsg(1e3),t.showCart=!1})},showToastMsg:function(t){var a=this;this.showToast=!0;var i=setTimeout(function(){a.showToast=!1,clearTimeout(i)},t)}},watch:{showCart:function(t,a){document.documentElement.style.overflow=t?"hidden":"auto"}},mixins:[d.a]})},7:function(t,a,i){function n(t){i(14)}var s=i(9)(i(11),i(16),n,"data-v-0f4a6c2d",null);t.exports=s.exports}},[64]);
//# sourceMappingURL=goods.5a9c34457ff33fb6822c.js.map