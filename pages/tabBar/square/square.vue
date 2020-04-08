<template>
	<view class="all">
		<!-- #ifdef APP-PLUS -->
		<view class="place"></view>
		<view class="hidexRefresh"></view>
		<!-- #endif -->
		<view class="addMessBtn" @tap="changeWriteMessPage()">
			<i class="one"></i>
			<i class="two"></i>
		</view>
		<view class="background">
			<view class="circle"></view>
			<image src="../../../static/img/square-bk.jpg" mode="aspectFit"></image>
		</view>
		<view class="banner">
			<swiper circular="true" autoplay="true" indicator-dots="true">
				<swiper-item v-for="(swiper,index) in hotMessages" :key="swiper.id">
					<view class="author">{{getname(index)}}</view>
					<view class="content" @tap="navigateToDetailsPage(swiper)">{{sliceMessage(swiper.content)}}</view>
					<view class="control">						
						<view v-if="swiper.myPick == 0" class="iconfont" @tap="pick(swiper)">&#xe60a;<text>{{swiper.pickNum}}</text></view>
						<view v-else class="iconfont on" @tap="pick">&#xe60a;<text>{{swiper.pickNum}}</text></view>
						<view class="iconfont">&#xe63c;</view>
						<view class="iconfont">&#xe76f;</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="messages" v-for="(message,index) in messages" :key="message.id">
			<view class="header">
				<image src="../../../static/img/header-bk.png"></image>
				<text>{{getname(index)}}</text>
			</view>
			<view class="content">
				<text @tap="navigateToDetailsPage(message)" >{{message.content}}</text>
			</view>
			<view class="date">{{changeData(message.ctime)}}</view>
			<view class="control">
				<view v-if="message.myPick == 0" class="iconfont" @tap="pick(message)">&#xe604;<text>{{message.pickNum}}</text></view>
				<view v-else class="iconfont">&#xe605;<text>{{message.pickNum}}</text></view>
				<view class="iconfont">&#xe63c;</view>
				<view class="iconfont">&#xe76f;</view>
			</view>
		</view>
		<view class="loadingText">{{loadingText}}</view>
	</view>
</template>

<script>
	import interfaces from '../../../utils/interfaces.js';
	export default{
		data() {
			return{
				hotMessages: [
					{
						"id" : "",
						"userId": "",
						"content": "",
						"pickNum" : "",
						"messageNum": "",
						"ctime": "",
						"time": 100,
					},
				],
				messages: [],
				pickCotnet: [],
				messagePage: 1,
				messageNum: 6,
				loadingText : "加载中...",
				messId : undefined,
				hotMessStrLen: 10,
				hotMessLen: 3,
				messNames: []
			}
		},
		onShow() {
			this.messages = [];
			this.verification(this);
			this.getMessStorage();
			this.getHotMessages();
			this.getMessage();
		},
		methods:{
			getHotMessages() {
				if(this.messagePage == 1){
					this.messages = [];
				}
				var self = this;
				uni.request({
						method: "POST",
						url: interfaces.getHotMessage, //仅为示例，并非真实接口地址。
						data: {
							"page": 1,
							"num": self.hotMessLen
						},
	　　　　				dataType:'json',
						header: {
							// 'custom-header': 'hello' ,//自定义请求头信息
							'content-type':'application/x-www-form-urlencoded'
						}, 
						success: (res) => {
							self.hotMessages = res.data;
							for(let i = 0; i < self.hotMessages.length; i ++){
								// console.log(self.pickCotnet.length)
								for(let j = 0; j < self.pickCotnet.length; j ++){
									if(res.data[i].id == self.pickCotnet[j].id){
										self.hotMessages[i].myPick = 1;
									}
								}
							}
						}
				});
			},
			getname(index){
				var name = ""
				this.messNames.forEach(function (item) {
					if(item.index == index){
						// console.log(item)
						name = item.name
					}
				})
				return name
			},
			userIdGetUserName(data,self,index) {
				// console.log(index)
				// self.messNames.push("");
				// self.messNames.push("");
				uni.request({
					method: "POST",
					url: interfaces.getUserDes, //仅为示例，并非真实接口地址。
					data: {
						"userId": data.userId,
					},
　　　　				dataType:'json',
					header: {
						// 'custom-header': 'hello' ,//自定义请求头信息
						'content-type':'application/x-www-form-urlencoded'
					}, 
					success: (res) => {
						// console.log(111)
						// console.log(res.data.data[0].username)
						self.messNames.push({name: res.data.data[0].username,index: index});
						console.log(self.messNames)
						// console.log(self.messNames)
					}
				});
			},
			verification(self) {
				self.userIdCard = [];
				uni.getStorage({
					key: "userDes",
					success(e) {
						self.messId  = e.data.id;
					}
				})
			},
			getMessage() {
				var self = this;
				uni.request({
						method: "POST",
						url: interfaces.getMessage, //仅为示例，并非真实接口地址。
						data: {
							"page": self.messagePage,
							"num": self.messageNum
						},
	　　　　				dataType:'json',
						header: {
							// 'custom-header': 'hello' ,//自定义请求头信息
							'content-type':'application/x-www-form-urlencoded'
						}, 
						success: (res) => {
							// console.log(self.pickCotnet)
							// self.messages = res.data;
							if(res.data == undefined){
								self.loadingText = "到底了"
							}else if(res.data.length > 0) {
								res.data.forEach(function (item,index) {
									self.messages.push(item)
									self.$options.methods.userIdGetUserName(item,self,index);
								})
								for(let i = 0; i < self.messages.length; i ++){
									// console.log(self.pickCotnet.length)
									for(let j = 0; j < self.pickCotnet.length; j ++){
										if(res.data[i].id == self.pickCotnet[j].id){
											self.messages[i].myPick = 1;
										}
									}
								}
							}else{
								self.loadingText = "到底了"
							}
						}
				});
			},
			changeData(oDate) {
				var date = new Date(oDate)
				return date.getFullYear() + "-" + (date.getMonth() < 9 ?("0" + (date.getMonth()+1)) : date.getMonth()+1) + "-" + (date.getDate() < 9 ?("0" + date.getDate()) : date.getDate());
			},
			updatServerPickNum(data,self) {
				// var self = this;				
				// console.log(self.messId)
				uni.request({
						method: "POST",
						url: interfaces.addPick, //仅为示例，并非真实接口地址。
						data: {
							"replay": 0,
							"tabId": data.id,
							"userId": data.userId,
							"messId": self.messId
						},
	　　　　				dataType:'json',
						header: {
							// 'custom-header': 'hello' ,//自定义请求头信息
							'content-type':'application/x-www-form-urlencoded'
						}, 
						success: (res) => {
							console.log(res.data);
						}
				});
			},
			pick(data) {
				// console.log(data)
				data.myPick = 1;
				data.pickNum ++;
				uni.showToast({
					icon: "success",
					title: "已点赞"
				})
				this.pickCotnet.push(data);
				console.log(this.pickCotnet);
				uni.setStorage({
					key: 'pickCotnet',
					data: this.pickCotnet
				});
				this.$options.methods.updatServerPickNum(data,this);
				// console.log(this.pickCotnet)
			},
			getMessStorage() {
				var self = this;
				uni.getStorage({
					key: 'pickCotnet',
					success(e) {
						self.pickCotnet = e.data;
					}
				})
				// console.log(this.pickCotnet)
			},
			sliceMessage(str) {
				if(str.length > 10){
					// console.log("str" + this.hotMessStrLen)
					return str.slice(0,this.hotMessStrLen) + "...";
				}else{
					return str
				}
			},
			changeWriteMessPage(){
				uni.navigateTo({
					url: "../../paging/wirteMessage"
				})
			},
			navigateToDetailsPage(message) {
				uni.navigateTo({
					url:"../../paging/detailsPage?message=" + JSON.stringify(message)
				})
			}
		},
		onPullDownRefresh() {
			//下拉刷新
			var self = this;
			setTimeout(function () {
				self.messages = [];
				self.loadingText = "加载中..."
				self.messagePage = 1;
				self.getHotMessages();
				self.getMessage();
				uni.stopPullDownRefresh();
			},1000)
		},
		onReachBottom() {
			//上拉加载
			this.messagePage ++;
			// console.log(this.messagePage)
			this.getMessage();
		}
	}
</script>

<style lang="less">
	.all{
		color: #707070;
		font-weight: 200;
		font-size: 35upx;
		padding-top: 30upx;
		.addMessBtn{
			position:fixed;
			right: 70upx;
			bottom: 150upx;
			width: 100upx;
			height: 100upx;
			background:rgba(74,179,255,80%);
			border-radius: 50%;
			text-align: center;
			// line-height: 100upx;
			z-index:1;
			box-shadow: 4px 10px 20px rgba(0,0,0,15%);
			i{
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%);
				width:60upx;
				height: 10upx;
				background-color: #f4f4f4;
				border-radius: 5upx;
			}
			.two{
				margin-left: -30upx;
				transform: rotate(90deg);
			}
		}
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
		.background{
			position: fixed;
			height: 1300upx;
			width: 750upx;
			// border:1px solid red;
			z-index: -1;
			.circle{
				position: absolute;
				top: -150upx;
				left: -50upx;
				width: 300upx;
				height: 300upx;
				background-color: #3192DC;
				border-radius: 50%;
				
			}
			image{
				position: absolute;
				bottom: 0;
				
			}
		}
		.banner{
			// box-sizing: border-box;
			width: 90%;
			border: 3px solid #707070;
			border-radius: 20px;
			margin: 0 auto;
			height: 250upx;
			background: rgba(255,255,255,0.7);
			box-shadow: 4px 10px 20px rgba(0,0,0,15%);
			swiper{
				// box-sizing: border-box;
				margin: 10px;
				height: 250upx;
				swiper-item{
					// height: 200upx;
					.author{
						font-size: 30upx;
					}
					.content{
						text-align:center;
						margin-top: 30upx;
						// margin:0 auto;
					}
					.control{
						// border:1px solid red;
						margin-top: 60upx;
						text-align:right;
						view{
							font-size: 40upx;
							display: inline-block;
							margin-right: 10upx;
							text{
								font-size: 15upx;
							}
						}
						.on{
							color: #EE5555;
						}
					}
				}
			}
		}
		.messages{
			margin: 50upx 30upx;
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
			}
			.content{
				margin-top: 20upx;
				text{
					display:block;
					margin-left: 30upx;
					font-weight: 500;
					border: 1px solid #a0a0a0;
					padding: 10upx;
					border-radius: 20upx;
					background:rgba(0,0,0,15%);
					line-height: 48upx;
					box-shadow: 4px 10px 20px rgba(0,0,0,15%);
				}
			}
			.date{
				display:inline-block;
				margin-left: 30upx;
				font-size: 25upx;
				text-indent: 0.5em;
				margin-top: 20upx;
			}
			.control{
				float: right;
				// border: 1px solid red;
				display:inline-block;
				margin-right: 40upx;
				margin-top: 10upx;
				view{
					display:inline-block;
					margin-right: 10upx;
					// border: 1px solid red;
					padding: 8upx;
					text{
						font-size: 15upx;
						margin-left: 5upx;
						
					}
					
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
