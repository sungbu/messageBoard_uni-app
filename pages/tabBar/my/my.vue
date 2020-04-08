<template>
	<view class="all">
		<view class="backgroundPic">
			<image :src="backgroundPic"></image>
		</view>
		<view class="header">
			<image :src="headerPic"></image>
			<view>
				<view class="title">{{userDes[0].username}}</view>
				<view class="idCard">ID : {{userDes[0].id}}</view>
			</view>
		</view>
		<view class="content" @tap="nav">
			<text>{{newMessage}}</text>
			<i class="iconfont">&#xe600;</i>
		</view>
		<view class="signOut" @tap="signOut()">
			<text>注销</text>
		</view>
	</view>
</template>

<script>
	import interfaces from '../../../utils/interfaces.js';
	export default{
		data() {
			return{
				loginCode: 0,
				headerPic: "../../../static/img/header-bk.png",
				backgroundPic: "../../../static/img/my-bk.jpg",
				newMessage: "",
				page: 1,
				num: 1,
				userDes: [],
			}
		},
		onShow() {
			this.verification(this);
			// console.log(this.loginCode)
			if(this.loginCode == 1){
				// console.log(this.userDes)
				this.getUsertFirestMessage();
			}else{
				this.navigateToSiginIn()
			}
		},
		methods:{
			getUsertFirestMessage() {
				var self = this;
				uni.request({
						method: "POST",
						url: interfaces.userAllMess, //仅为示例，并非真实接口地址。
						data: {
							"userId": self.userDes[0].id,
							"page": self.page,
							"num": self.num
						},
	　　　　				dataType:'json',
						header: {
							// 'custom-header': 'hello' ,//自定义请求头信息
							'content-type':'application/x-www-form-urlencoded'
						}, 
						success: (res) => {
							// console.log(res.data);
							self.newMessage = res.data.data[0].content
						}
				});
			},
			signOut() {
				var self = this;
				uni.showModal({
					title: '警告',
					content: '确定注销此用户吗？',
					success: function (res) {
						if(res.confirm){
							uni.removeStorage({
								key: "userDes",
								success() {
									uni.showToast({
										icon: "success",
										title: "注销成功"
									})
								}
							})
							self.loginCode = 0;
							self.userDes = [];
							self.newMessage = "";
							setTimeout(function () {
								uni.navigateTo({
									url:'../../paging/signIn'
								})
							},1000)
						}
					}
				})
			},
			verification(self) {
				uni.getStorage({
					key: "userDes",
					success(e) {
						// console.log(e.data)
						self.loginCode = 1;
						self.userDes.push(e.data);
					}
				})
			},
			navigateToSiginIn() {
				uni.navigateTo({
					url: "../../paging/signIn"
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
		.backgroundPic{
			height: 400upx;
			overflow: hidden;
			image{
				// border: 1px solid red;
				width: 100%;
			}
		}
		.header{
			padding: 20upx 30upx;
			image{
				width: 120upx;
				height: 120upx;
				border-radius: 50%;
				box-shadow: 3px 4px 3px rgba(0,0,0,15%);
			}
			view{
				vertical-align: top;
				display: inline-block;
				margin-top: 10upx;
				margin-left: 20upx;
				.title{
					display: block;
					font-weight: 800;
				}
				.idCard{
					font-size: 20upx;
					font-weight: 800;
				}
			}
		}
		.content{
			border: 1px solid #707070;
			box-shadow: 4px 10px 20px rgba(0,0,0,15%);
			line-height: 60upx;
			text{
				margin-left: 60upx;
				font-weight: 800;
				font-size: 27upx;
			}
			i{
				float: right;
				margin-right: 30upx;
				margin-top: 4upx;
			}
		}
		.signOut{
			// border: 1px solid #707070;
			text-align: center;
			margin-top: 200upx;
			text{
				display: inline-block;
				width: 300upx;
				line-height: 70upx;
				border: 1px solid #707070;
				border-radius: 40upx;
				box-shadow: 4px 10px 20px rgba(0,0,0,15%);
			}
		}
	}
</style>
