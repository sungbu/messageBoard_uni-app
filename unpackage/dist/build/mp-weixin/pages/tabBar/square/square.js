(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabBar/square/square"],{"0805":function(e,t,s){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=n(s("5174"));function n(e){return e&&e.__esModule?e:{default:e}}var o={data:function(){return{hotMessages:[{id:"",userId:"",content:"",pickNum:"",messageNum:"",ctime:"",time:100}],messages:[],pickCotnet:[],messagePage:1,messageNum:6,loadingText:"加载中...",messId:void 0,hotMessStrLen:10,hotMessLen:3,messNames:[]}},onShow:function(){this.messages=[],this.verification(this),this.getMessStorage(),this.getHotMessages(),this.getMessage()},methods:{getHotMessages:function(){1==this.messagePage&&(this.messages=[]);var t=this;e.request({method:"POST",url:a.default.getHotMessage,data:{page:1,num:t.hotMessLen},dataType:"json",header:{"content-type":"application/x-www-form-urlencoded"},success:function(e){t.hotMessages=e.data;for(var s=0;s<t.hotMessages.length;s++)for(var a=0;a<t.pickCotnet.length;a++)e.data[s].id==t.pickCotnet[a].id&&(t.hotMessages[s].myPick=1)}})},getname:function(e){var t="";return this.messNames.forEach(function(s){s.index==e&&(t=s.name)}),t},userIdGetUserName:function(t,s,n){e.request({method:"POST",url:a.default.getUserDes,data:{userId:t.userId},dataType:"json",header:{"content-type":"application/x-www-form-urlencoded"},success:function(e){s.messNames.push({name:e.data.data[0].username,index:n}),console.log(s.messNames)}})},verification:function(t){t.userIdCard=[],e.getStorage({key:"userDes",success:function(e){t.messId=e.data.id}})},getMessage:function(){var t=this;e.request({method:"POST",url:a.default.getMessage,data:{page:t.messagePage,num:t.messageNum},dataType:"json",header:{"content-type":"application/x-www-form-urlencoded"},success:function(e){if(void 0==e.data)t.loadingText="到底了";else if(e.data.length>0){e.data.forEach(function(e,s){t.messages.push(e),t.$options.methods.userIdGetUserName(e,t,s)});for(var s=0;s<t.messages.length;s++)for(var a=0;a<t.pickCotnet.length;a++)e.data[s].id==t.pickCotnet[a].id&&(t.messages[s].myPick=1)}else t.loadingText="到底了"}})},changeData:function(e){var t=new Date(e);return t.getFullYear()+"-"+(t.getMonth()<9?"0"+(t.getMonth()+1):t.getMonth()+1)+"-"+(t.getDate()<9?"0"+t.getDate():t.getDate())},updatServerPickNum:function(t,s){e.request({method:"POST",url:a.default.addPick,data:{replay:0,tabId:t.id,userId:t.userId,messId:s.messId},dataType:"json",header:{"content-type":"application/x-www-form-urlencoded"},success:function(e){console.log(e.data)}})},pick:function(t){t.myPick=1,t.pickNum++,e.showToast({icon:"success",title:"已点赞"}),this.pickCotnet.push(t),e.setStorage({key:"pickCotnet",data:this.pickCotnet}),this.$options.methods.updatServerPickNum(t,this)},getMessStorage:function(){var t=this;e.getStorage({key:"pickCotnet",success:function(e){t.pickCotnet=e.data}})},sliceMessage:function(e){return e.length>10?e.slice(0,this.hotMessStrLen)+"...":e},changeWriteMessPage:function(){e.navigateTo({url:"../../paging/wirteMessage"})},navigateToDetailsPage:function(t){e.navigateTo({url:"../../paging/detailsPage?message="+JSON.stringify(t)})}},onPullDownRefresh:function(){var t=this;setTimeout(function(){t.messages=[],t.loadingText="加载中...",t.messagePage=1,t.getHotMessages(),t.getMessage(),e.stopPullDownRefresh()},1e3)},onReachBottom:function(){this.messagePage++,this.getMessage()}};t.default=o}).call(this,s("543d")["default"])},"1dff":function(e,t,s){"use strict";var a=s("d698"),n=s.n(a);n.a},"83d0":function(e,t,s){"use strict";(function(e){s("8df6"),s("921b");a(s("66fd"));var t=a(s("c995"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,s("543d")["createPage"])},a83e:function(e,t,s){"use strict";s.r(t);var a=s("0805"),n=s.n(a);for(var o in a)"default"!==o&&function(e){s.d(t,e,function(){return a[e]})}(o);t["default"]=n.a},c995:function(e,t,s){"use strict";s.r(t);var a=s("e03c"),n=s("a83e");for(var o in n)"default"!==o&&function(e){s.d(t,e,function(){return n[e]})}(o);s("1dff");var i=s("2877"),u=Object(i["a"])(n["default"],a["a"],a["b"],!1,null,null,null);t["default"]=u.exports},d698:function(e,t,s){},e03c:function(e,t,s){"use strict";var a=function(){var e=this,t=e.$createElement,s=(e._self._c,e.__map(e.hotMessages,function(t,s){var a=e.getname(s),n=e.sliceMessage(t.content);return{$orig:e.__get_orig(t),m0:a,m1:n}})),a=e.__map(e.messages,function(t,s){var a=e.getname(s),n=e.changeData(t.ctime);return{$orig:e.__get_orig(t),m2:a,m3:n}});e.$mp.data=Object.assign({},{$root:{l0:s,l1:a}})},n=[];s.d(t,"a",function(){return a}),s.d(t,"b",function(){return n})}},[["83d0","common/runtime","common/vendor"]]]);