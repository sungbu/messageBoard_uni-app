(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/paging/signUp"],{2682:function(t,n,e){"use strict";e.r(n);var o=e("99c8"),a=e.n(o);for(var i in o)"default"!==i&&function(t){e.d(n,t,function(){return o[t]})}(i);n["default"]=a.a},"337b":function(t,n,e){"use strict";var o=e("e609"),a=e.n(o);a.a},"5b7d":function(t,n,e){"use strict";e.r(n);var o=e("a8ce"),a=e("2682");for(var i in a)"default"!==i&&function(t){e.d(n,t,function(){return a[t]})}(i);e("337b");var s=e("2877"),u=Object(s["a"])(a["default"],o["a"],o["b"],!1,null,"488737e6",null);n["default"]=u.exports},"6a36":function(t,n,e){"use strict";(function(t){e("8df6"),e("921b");o(e("66fd"));var n=o(e("5b7d"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},"99c8":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=a(e("5174"));function a(t){return t&&t.__esModule?t:{default:t}}var i={data:function(){return{username:"",phone:"",psd:""}},onShow:function(){},methods:{navigateBack:function(){t.navigateBack()},isPhoneNumber:function(t){var n=/^0?1[3|4|5|6|7|8][0-9]\d{8}$/;return n.test(t)},sendSignUp:function(){var n=this;console.log(this.username,this.phone,this.psd);var e=this;this.$options.methods.isPhoneNumber(this.phone)?void 0==this.psd||""==this.psd?(this.loadingText="密码不能为空",t.showToast({title:this.loadingText,icon:"none"})):t.request({method:"POST",url:o.default.signUp,data:{phone:e.phone,psd:e.psd,username:e.username},dataType:"json",header:{"content-type":"application/x-www-form-urlencoded"},success:function(e){var o=e.data.code;1==o?(n.loadingText="注册成功",t.showToast({title:n.loadingText,icon:"none"})):(n.loadingText="服务器错误",t.showToast({title:n.loadingText,icon:"none"}))}}):(this.loadingText="手机号格式不正确",t.showToast({title:this.loadingText,icon:"none"}))}}};n.default=i}).call(this,e("543d")["default"])},a8ce:function(t,n,e){"use strict";var o=function(){var t=this,n=t.$createElement;t._self._c},a=[];e.d(n,"a",function(){return o}),e.d(n,"b",function(){return a})},e609:function(t,n,e){}},[["6a36","common/runtime","common/vendor"]]]);