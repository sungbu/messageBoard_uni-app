<template>
	<view class="all">
		<!-- #ifdef APP-PLUS -->
		<view class="place"></view>
		<view class="hidexRefresh"></view>
		<!-- #endif -->
		<view class="repalySum">
			<view class="sum pick">
				<view class="title">赞数</view>
				<i class="iconfont">&#xe601;</i>
				<view class="number">{{userDes[0].pickNum}}</view>
			</view>
			<view class="sum replay">
				<view class="title">回复数</view>
				<i class="iconfont replayIcon">&#xe602;</i>
				<view class="number">{{userDes[0].messageNum}}</view>
			</view>
		</view>
		<view class="replayContent" v-for="(replay,index) in replays" :key="replay.id">
			<view class="header">
				<image src="../../../static/img/header-bk.png"></image>
				<text>{{getname(index,messNames,'name')}}</text>
				<view class="date">{{changeData(replay.ctime)}}</view>
			</view>
			<view class="content">{{judgePick(replay.isPick,replay.message)}}</view>
			<view class="message">
				{{getname(index,messages,'message')}}
			</view>
			<view class="ReplayInput">
				<input type="text" :placeholder="'回复'+getname(index,messNames,'name')" @confirm="sendReplay($event,replay)">
			</view>
		</view>
		<view class="loadingText">{{loadingText}}</view>
	</view>
</template>

<script>
	import interfaces from '../../../utils/interfaces.js';
	export default{
		data() {
			return {
				loginCode: 0,
				userId: undefined,
				userDes: [],
				replays: [],
				userIdCard: [],
				page: 1,
				num: 6,
				loadingText: "加载中...",
				messNames: [],
				messages: [],
			}
		},
		onShow() {
			this.userDes = [];
			this.userId = undefined;
			this.verification(this);
			// console.log(this.loginCode)
			if(this.loginCode == 1){
				// console.log(this.userDes)
				this.userDes = [];
				this.userId = this.userIdCard[0].id;
				// console.log(this.userIdCard[0].id)
				this.initData();
			}else{
				this.navigateToSiginIn()
			}
		},
		onReachBottom() {
			this.page ++;
			this.$options.methods.getUserReplay(this);
		},
		onPullDownRefresh() {
			this.loadingText = "加载中..."
			this.page = 1,
			this.replays = [];
			this.userDes = [];
			this.initData();
			uni.stopPullDownRefresh();
		},
		methods:{
			initData() {
				this.$options.methods.allPickReplayNum(this);
				this.$options.methods.getUserReplay(this);
			},
			userIdGetUserName(data,self,index) {
				// console.log(data.messId)
				uni.request({
					method: "POST",
					url: interfaces.getUserDes, //仅为示例，并非真实接口地址。
					data: {
						"userId": data.messId,
					},
　　　　				dataType:'json',
					header: {
						// 'custom-header': 'hello' ,//自定义请求头信息
						'content-type':'application/x-www-form-urlencoded'
					}, 
					success: (res) => {
						// console.log(111)
						// console.log(res.data.data[0].username)
						self.messNames.push({name: res.data.data[0].username,index: index})
						// console.log(self.messNames)
					}
				});
			},
			getname(index,dom,origin) {
				// console.log(dom)
				var target = ""
				// console.log(origin)
				dom.forEach(function (item) {
					if(index == item.index){
						target = item[origin];
					}
				})
				return target;
				// console.log(this.messNames)
			},
			tabIdGetMessage(data,self,index) {
				uni.request({
					method: "POST",
					url: interfaces.tabIdGetMessage, //仅为示例，并非真实接口地址。
					data: {
						"tabId": data.tabId,
					},
　　　　				dataType:'json',
					header: {
						// 'custom-header': 'hello' ,//自定义请求头信息
						'content-type':'application/x-www-form-urlencoded'
					}, 
					success: (res) => {
						// console.log(111)
						// console.log(res.data.data[0].content)
						// self.messages.push(res.data.data[0].content);
						self.messages.push({message: res.data.data[0].content,index: index})
					}
				});
			},
			verification(self) {
				self.userIdCard = [];
				uni.getStorage({
					key: "userDes",
					success(e) {
						// console.log(e.data)
						self.loginCode = 1;
						self.userIdCard.push(e.data);
					}
				})
			},
			navigateToSiginIn() {
				uni.navigateTo({
					url: '../../paging/signIn'
				})
			},
			sendReplay(e,data) {
				var self = this;
				// console.log(self.tabId,self.messId,self.replayContent,self.userId)
				uni.request({
					method: "POST",
					url: interfaces.addPick, //仅为示例，并非真实接口地址。
					data: {
						"replay": 1,
						"tabId": data.tabId,
						"userId": data.userId,
						"messId": self.userId,
						"message": e.target.value
					},
　　　　				dataType:'json',
					header: {
						// 'custom-header': 'hello' ,//自定义请求头信息
						'content-type':'application/x-www-form-urlencoded'
					}, 
					success: (res) => {
						// console.log(res.data);
						if(res.data.code == 1){
							uni.showToast({
								title: "已评论",
								icon: "none"
							})
						}
					}
				});
			},
			allPickReplayNum (self) {
				uni.request({
					method: "POST",
					url: interfaces.getUserDes, //仅为示例，并非真实接口地址。
					data: {
						"userId": self.userId,
					},
　　　　				dataType:'json',
					header: {
						// 'custom-header': 'hello' ,//自定义请求头信息
						'content-type':'application/x-www-form-urlencoded'
					}, 
					success: (res) => {
						self.userDes = res.data.data;
						// console.log(self.replays)
					}
				});
			},
			getUserReplay(self){
				if(self.page == 1){
					self.replays = [];
				}
				uni.request({
					method: "POST",
					url: interfaces.userIdGetReplayNum, //仅为示例，并非真实接口地址。
					data: {
						"userId": self.userId,
						"page": self.page,
						"num": self.num
					},
　　　　				dataType:'json',
					header: {
						// 'custom-header': 'hello' ,//自定义请求头信息
						'content-type':'application/x-www-form-urlencoded'
					}, 
					success: (res) => {
						// self.replays = res.data.data;
						// console.log(res.data.data)
						if(res.data.data == undefined){
							self.loadingText = "到底了"
						}else if(res.data.data.length > 0) {
							res.data.data.forEach(function (item,index) {
								self.replays.push(item)
								self.$options.methods.userIdGetUserName(item,self,index);
								self.$options.methods.tabIdGetMessage(item,self,index)
							})
						}else{
							self.loadingText = "到底了"
						}
						// console.log(self.replays)
					}
				});
			},
			judgePick(isPick,replay) {
				if(isPick == 1){
					return "赞了你的留言"
				}else{
					return replay
				}
			},
			changeData(oDate) {
				var date = new Date(oDate)
				return date.getFullYear() + "-" + (date.getMonth() < 9 ?("0" + (date.getMonth()+1)) : date.getMonth()+1) + "-" + (date.getDate() < 9 ?("0" + date.getDate()) : date.getDate());
			},
		},

	}
</script>

<style lang="less">
	.all{
		color: #707070;
		font-weight: 200;
		font-size: 35upx;
		padding: 30upx 20upx;
		/* #ifdef APP-PLUS */
		.place{
			width: 100%;
			height: var(--status-bar-height);
		}
		.hidexRefresh{
			position: fixed;
			left: 50%;
			top: 80upx;
			background-color: #ffffff;
			margin-left: -50upx;
			width: 100upx;
			height: 100upx;
			z-index: -1;
			// border: 1px solid red;
		}
		/* #endif */
		.repalySum{
			text-align: center;
			margin-top: 30upx;
			.sum{
				display: inline-block;
				border:2px solid #707070;
				text-align: center;
				margin: 0 100upx;
				border-radius: 10upx;
				padding: 5upx 10upx;
				.title{
					font-size: 25upx;
					// letter-spacing: 10upx;
				}
				.iconfont{
					display: block;
					width: 100upx;
					height: 100upx;
					// border: 1px solid red;
					font-size: 100upx;
					color: #F26165;
				}
				.replayIcon{
					font-size: 80upx;
					line-height: 100upx;
				}
				.number{
					font-size: 25upx;
					font-weight: 800;
				}
			}
		}
		.replayContent{
			margin-top: 40upx;
			.header{
				image{
					vertical-align: top;
					width: 60upx;
					height: 60upx;
					border-radius: 50%;
					border: 3upx solid #707070;
					box-shadow: 3px 4px 3px rgba(0,0,0,15%);
				}
				text{
					vertical-align: top;
					font-size: 30upx;
					line-height: 70upx;
					margin-left: 20upx;
				}
				.date{
					display: inline;
					font-size: 20upx;
					float: right;
					margin-top: 20upx;
					margin-right: 25upx;
				}
			}
			.content{
				font-size: 30upx;
				margin-left: 40upx;
				margin-top: 20upx;
			}
			.message{
				width: 90%;
				// border: 1px solid red;
				margin: 0 auto;
				text-align: center;
				letter-spacing: 1px;
				font-size: 30upx;
				font-weight: 800;
				color: #f4f4f4;
				border: 4upx solid #525252;
				border-radius: 10upx;
				background-color: #A1A1A1;
				padding: 10upx;
				margin-top: 20upx;
				box-shadow: 4px 10px 20px rgba(0,0,0,15%);
			}
			.ReplayInput{
				input{
					border: 1px solid #707070;
					width: 90%;
					margin: 0 auto;
					border-radius: 10upx;
					margin-top: 10upx;
					color: #888888;
					background: rgba(166,166,166,20%);
					text-indent: 1em;
					font-size: 20upx;
					height: 40upx;
					padding: 0 10upx;
					box-shadow: 4px 10px 20px rgba(0,0,0,15%);
				}
			}
		}
		.loadingText{
			text-align: center;
			font-size: 20upx;
			margin-top: 10upx;
		}
}
</style>
