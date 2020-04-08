<template>
	<view class="all">
		<!-- #ifdef APP-PLUS -->
		<view class="place"></view>
		<!-- #endif -->
		<view class="returnBtn" >
			<i class="iconfont" @tap="navigateBack()">&#xe600;</i>
		</view>
		<view class="messContent">
			<view class="header">
				<image src="../../static/img/header-bk.png"></image>
				<text>{{messageName}}</text>
				<i @tap="removeMessage(message[0].id)" v-if="userId == messId" class="iconfont remove">&#xe6bf;</i>
			</view>
			<view class="content">
				<text>{{message[0].content}}</text>
			</view>
			<view class="control">
				<view class="date">{{changeData(message[0].ctime)}}</view>
				<view class="btn">
					<view v-if="message[0].myPick == 0" class="iconfont" @tap="pick(message)">&#xe604;<text>{{message[0].pickNum}}</text></view>
					<view v-else class="iconfont">&#xe605;<text>{{message[0].pickNum}}</text></view>
					<view class="iconfont"><label for="comment">&#xe63c;</label></view>
					<view class="iconfont">&#xe76f;</view>
				</view>
			</view>
		</view>
		<view class="replayContent" v-for="(replay,index) in replays">
			<text>{{getname(index,messname,'messname') + ' 回复 ' + getname(index,myname,'myname') + ' ：' + replay.message}}</text>
		</view>
		<view class="comment">
			<input id="comment" type="text" placeholder="评论" @confirm="sendReplay" placeholder-style="color:#f4f4f4" v-model="replayContent">
		</view>
	</view>
</template>

<script>
	import interfaces from '../../utils/interfaces.js';
	export default{
		data() {
			return{
				message: [],
				removeMessageText: "",
				pickCotnet: [],
				messId: undefined,
				replays: [],
				tabId: undefined,
				replayContent: "",
				messageName: "",
				myname: [],
				messname:[],
				userId: "",
			}
		},	
		onShow() {
			this.verification(this);
			this.getStronge()
			// console.log(this.messId);
		},
		onLoad(options) {
			this.getStronge()
			// console.log(options)
			this.message.push(JSON.parse(options.message));
			this.tabId = JSON.parse(options.message).id;
			// console.log(this.tabId)
			this.userId = JSON.parse(options.message).userId;
			this.getReplay(this.tabId);
			this.userIdGetUserName(this.message[0].userId)
		},
		methods:{
			navigateBack() {
				// console.log(111)
				uni.navigateBack();
			},
			getStronge() {
				var self = this;
				self.pickCotnet = [];
				uni.getStorage({
					key: 'pickCotnet',
					success(e) {
						// console.log(e.data)
						self.pickCotnet = e.data
						// console.log(self.pickCotnet)
					}
				})
			},
			userIdGetUserName(userId) {
				var self = this;
				uni.request({
					method: "POST",
					url: interfaces.getUserDes, //仅为示例，并非真实接口地址。
					data: {
						"userId": userId,
					},
　　　　				dataType:'json',
					header: {
						// 'custom-header': 'hello' ,//自定义请求头信息
						'content-type':'application/x-www-form-urlencoded'
					}, 
					success: (res) => {
						// console.log(111)
						// console.log(res.data.data[0].username)
						// console.log(self.messNames)
						// console.log(res.data.data[0].username)
						self.messageName = res.data.data[0].username
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
			verification(self) {
				self.userIdCard = [];
				uni.getStorage({
					key: "userDes",
					success(e) {
						self.messId  = e.data.id;
					}
				})
			},
			sendReplay() {
				var self = this;
				// console.log(self.tabId,self.messId,self.replayContent,self.userId)
				// self.replays.push({message: self.replayContent})
				uni.request({
					method: "POST",
					url: interfaces.addPick, //仅为示例，并非真实接口地址。
					data: {
						"replay": 1,
						"tabId": self.tabId,
						"userId": self.userId,
						"messId": self.messId,
						"message":self.replayContent
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
							self.replayContent = ""
							setTimeout(function () {
								self.getReplay(self.tabId);
							},200)
						}
					}
				});
			},
			getReplay(tabId) {
				var self = this;
				uni.request({
					method: "POST",
					url: interfaces.tabIdGetReplay, //仅为示例，并非真实接口地址。
					data: {
						"tabId": tabId,
					},
　　　　				dataType:'json',
					header: {
						// 'custom-header': 'hello' ,//自定义请求头信息
						'content-type':'application/x-www-form-urlencoded'
					}, 
					success: (res) => {
						// console.log(res.data.data);
						self.replays = res.data.data;
						// console.log(self.repalys)
						self.replays.forEach(function (item,index) {
							self.$options.methods.getMyname(item.userId,index,self);
							self.$options.methods.getMessname(item.messId,index,self);
						})
					}
				});
			},
			getMyname(item,index,self){
				// console.log(item,index,self)
				uni.request({
					method: "POST",
					url: interfaces.getUserDes, //仅为示例，并非真实接口地址。
					data: {
						"userId": item,
					},
　　　　				dataType:'json',
					header: {
						// 'custom-header': 'hello' ,//自定义请求头信息
						'content-type':'application/x-www-form-urlencoded'
					}, 
					success: (res) => {
						// console.log(111)
						// console.log(res.data.data[0].username)
						// console.log(self.messNames)
						// console.log(res.data.data[0].username)
						// self.messageName = res.data.data[0].username
						self.myname.push({myname: res.data.data[0].username,index : index})
						// console.log(self.myname)
					}
				});
			},
			getMessname(item,index,self){
				// console.log(item,index,self)
				uni.request({
					method: "POST",
					url: interfaces.getUserDes, //仅为示例，并非真实接口地址。
					data: {
						"userId": item,
					},
　　　　				dataType:'json',
					header: {
						// 'custom-header': 'hello' ,//自定义请求头信息
						'content-type':'application/x-www-form-urlencoded'
					}, 
					success: (res) => {
						// console.log(111)
						// console.log(res.data.data[0].username)
						// console.log(self.messNames)
						// console.log(res.data.data[0].username)
						// self.messageName = res.data.data[0].username
						self.messname.push({messname: res.data.data[0].username,index : index})
						// console.log(self.messname)
					}
				});
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
							"tabId": data[0].id,
							"userId": data[0].userId,
							"messId": self.messId
						},
	　　　　				dataType:'json',
						header: {
							// 'custom-header': 'hello' ,//自定义请求头信息
							'content-type':'application/x-www-form-urlencoded'
						}, 
						success: (res) => {
							// console.log(res.data);
						}
				});
			},
			pick(data) {
				var self = this;
				// this.$options.methods.getStronge();
				// console.log(self.pickCotnet);
				// console.log(data[0]);
				// console.log(data)
				data[0].myPick = 1;
				data[0].pickNum ++;
				uni.showToast({
					icon: "success",
					title: "已点赞"
				})
				// console.log(self.pickCotnet);
				self.pickCotnet.push(data[0]);
				console.log(self.pickCotnet);
				uni.setStorage({
					key: 'pickCotnet',
					data: self.pickCotnet
				});
				this.$options.methods.updatServerPickNum(data,this);
				// console.log(this.pickCotnet)
			},
			removeMessage(tabId) {
				console.log(1234)
				var self = this;
				uni.showModal({
					title: "警告",
					content: "确定删除这条留言~",
					success: function(res) {
						if(res.confirm){
							uni.request({
								method: "POST",
								url: interfaces.removeThisMessage, //仅为示例，并非真实接口地址。
								data: {
									"tabId": tabId,
								},
			　　　　				dataType:'json',
								header: {
									// 'custom-header': 'hello' ,//自定义请求头信息
									'content-type':'application/x-www-form-urlencoded'
								}, 
								success: (res) => {
									if(res.data.code == 1){
										self.removeMessageText = "删除成功"
										uni.showToast({
											icon: "success",
											title: self.removeMessageText,
											success() {
												setTimeout(function () {
													uni.navigateBack();													
												},1000)
											}
										})
									}else{
										self.removeMessageText = "服务器错误"
										uni.showToast({
											icon: "success",
											title: self.removeMessageText
										})
									}
								}
							});
						}
					}
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
		/* #ifdef APP-PLUS */
		.place{
			width: 100%;
			height: var(--status-bar-height);
			background-color: #FFFFFF;
		}
		/* #endif */
		.returnBtn{
			height: 80upx;
			// border: 1px solid red;
			line-height: 80upx;
			margin-top: 20upx;
			i{
				transform: rotate(180deg);
				width: 80upx;
				height: 80upx;
				border-radius: 50%;
				display: inline-block;
				margin-left: 20upx;
				// border: 1px solid red;
				text-align: center;
				background-color: #D3D3D3;
			}
		}
		.messContent{
			padding: 30upx;
			.header{
				margin-top: 50upx;
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
				i{
					float: right;
					margin-right: 30upx;
					font-size: 50upx;
					color: #CD0707;
				}
			}
			.content{
				margin-top: 40upx;
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
			.control{
				margin-top: 30upx;
				.date{
					display:inline-block;
					margin-left: 30upx;
					font-size: 25upx;
					text-indent: 0.5em;
					margin-top: 20upx;
				}
				.btn{
					display: inline-block;
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
		}
		.replayContent{
			padding: 5upx 60upx;
			text{
				font-size: 27upx;
				font-weight: 500;
			}
		}
		.comment{
			padding: 30upx;
			color: #FFFFFF;
			input{
				// border: 1px solid red;
				background-color:#808080;
				text-indent: 1em;
				height: 60upx;
				border-radius: 30upx;
				font-size:25upx;
				box-shadow: 4px 10px 20px rgba(0,0,0,15%);
			}
		}
		
	}
</style>
