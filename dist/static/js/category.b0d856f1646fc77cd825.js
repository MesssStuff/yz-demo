webpackJsonp([3],{12:function(t,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e=n(6),r=n.n(e),i=[{name:"有赞",href:"./index.html",icon:"icon-home"},{name:"分类",href:"./category.html",icon:"icon-category"},{name:"购物车",href:"./cart.html",icon:"icon-cart"},{name:"我",href:"./member.html",icon:"icon-user"}];a.default={name:"TabBar",data:function(){return{tabConfig:i,currentIndex:+r.a.parse(location.search.substr(1)).index||0}},props:{type:{type:String,require:!0}},methods:{navTo:function(t,a){location.href=t+"?index="+a}}}},15:function(t,a){},17:function(t,a){t.exports={render:function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"bottom-nav"},[n("ul",t._l(t.tabConfig,function(a,e){return n("li",{key:a.name,class:{active:e===t.currentIndex}},[n("a",{attrs:{href:a.href},on:{click:function(n){return n.preventDefault(),t.navTo(a.href,e)}}},[n("i",{class:a.icon}),t._v(" "),n("div",[t._v(t._s(a.name))])])])}),0)])},staticRenderFns:[]}},2:function(t,a,n){"use strict";var e={hotList:"/index/hotLists",banners:"/index/banner",topList:"/category/topList",subList:"/category/subList",rank:"/category/rank",searchList:"/search/list",goodsDetail:"/goods/details",dealList:"/goods/deal",addToCart:"/cart/add"};for(var r in e)e.hasOwnProperty(r)&&(e[r]="http://rap2api.taobao.org/app/mock/7058"+e[r]);a.a=e},3:function(t,a,n){"use strict";var e={filters:{currency:function(t){return"￥"+t.toFixed(2)}}};a.a=e},33:function(t,a){},4:function(t,a){},63:function(t,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e=n(4),r=(n.n(e),n(33)),i=(n.n(r),n(2)),o=n(3),s=n(8),c=n.n(s),u=n(0),d=n(5),f=n.n(d);new u.default({el:"#app",components:{TabBar:c.a},data:{topList:null,subData:null,rankData:null,currentId:800},created:function(){this.getTopList(),this.getSubData(800)},methods:{getTopList:function(){var t=this;f.a.get(i.a.topList).then(function(a){t.topList=a.data.lists})},getSubData:function(t){var a=this;this.currentId=t,800===t?this.getRankData():f.a.get(i.a.subList,{params:{id:t}}).then(function(t){a.subData=t.data.data})},getRankData:function(){var t=this;f.a.get(i.a.rank).then(function(a){t.rankData=a.data.data})},toSearch:function(t,a){location.href="search.html?keyword="+t+"&id="+a}},mixins:[o.a]})},8:function(t,a,n){function e(t){n(15)}var r=n(9)(n(12),n(17),e,"data-v-334fde1a",null);t.exports=r.exports}},[63]);
//# sourceMappingURL=category.b0d856f1646fc77cd825.js.map