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
			<image src="../../../static/img/moment-bk.jpg" mode="aspectFit"></image>
		</view>
		<view class="messages" v-for="message in userMessages" :key="message.id">
			<view class="header">
				<image src="../../../static/img/header-bk.png"></image>
				<text>{{username}}</text>
			</view>
			<view class="content">
				<text @tap="navigateToDetailsPage(message)">{{message.content}}</text>
			</view>
			<view class="date">{{changeData(message.ctime)}}</view>
			<view class="control">
				<view v-if="message.myPick == 0" class="iconfont" @tap="pick(message)">&#xe604;<text>{{message.pickNum}}</text></view>
				<view v-else class="iconfont">&#xe605;<text>{{message.pickNum}}</text></view>
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
				userId : undefined,
				page: 1,
				num: 5,
				userMessages: [],
				pickCotnet: [],
				messId: undefined,
				loadingText: "加载中...",
				userIdCard: [],
				username: ""
			}
		},
		onShow() {
			this.userId = undefined;
			this.loginCode = 0,
			this.verification(this);
			// console.log(this.loginCode)
			if(this.loginCode == 1){
				// console.log(this.userDes)
				this.userMessages = [];
				this.pickCotnet = [];
				this.userId = this.userIdCard[0].id;
				this.messId = this.userIdCard[0].id;
				// console.log(this.userIdCard[0].id)
				this.initData();
				this.getMessStorage();
				this.userIdGetUsername(this);
			}else{
				this.navigateToSiginIn()
			}
		},
		onReachBottom(){
			this.page ++;
			this.initData();
		},
		onPullDownRefresh(){
			var self = this;
			setTimeout(function () {
				self.userMessages = [];
				self.loadingText = "加载中..."
				self.page = 1;
				self.initData();
				uni.stopPullDownRefresh();
			},1000)
		},
		methods:{
			initData() {
				if(this.page == 1){
					this.userMessages = [];
				}
				var self = this;
				uni.request({
					method: "POST",
					url: interfaces.userAllMess, //仅为示例，并非真实接口地址。
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
						if(res.data.data == undefined){
							self.loadingText = "到底了"
						}else if(res.data.data.length > 0) {
							res.data.data.forEach(function (item) {
								self.userMessages.push(item)
							})
							// console.log(self.pickCotnet)
							for(let i = 0; i < self.userMessages.length; i ++){
								// console.log(self.pickCotnet.length)
								for(let j = 0; j < self.pickCotnet.length; j ++){
									if(res.data.data[i].id == self.pickCotnet[j].id){
										self.userMessages[i].myPick = 1;
									}
								}
							}
						}else{
							self.loadingText = "到底了"
						}
					}
				});
			},
			userIdGetUsername(self) {
				// console.log(self.userId);
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
						// console.log(111)
						// console.log(res.data.data[0].username)
						// console.log(res.data.data[0].username)
						self.username = res.data.data[0].username;
						// console.log(self.messNames)
					}
				});
			},
			verification(self) {
				console.log(111)
				self.userIdCard = [];
				uni.getStorage({
					key: "userDes",
					success(e) {
						console.log(e.data)
						self.loginCode = 1;
						self.userIdCard.push(e.data);
					}
				})
				console.log(self.loginCode)
			},
			navigateToSiginIn() {
				uni.navigateTo({
					url: '../../paging/signIn'
				})
			},
			changeData(oDate) {
				var date = new Date(oDate)
				return date.getFullYear() + "-" + (date.getMonth() < 9 ?("0" + (date.getMonth()+1)) : date.getMonth()+1) + "-" + (date.getDate() < 9 ?("0" + date.getDate()) : date.getDate());
			},
			updatServerPickNum(data,self) {
				// var self = this;				
				// console.log(data)
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
				console.log(data)
				data.myPick = 1;
				data.pickNum ++;
				uni.showToast({
					icon: "success",
					title: "已点赞"
				})
				this.pickCotnet.push(data);
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
			background:rgba(255,169,97,80%);
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
				background-color:#FFBF52;
				border-radius: 50%;
				
			}
			image{
				position: absolute;
				bottom: 400upx;
				right: -200upx;
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
