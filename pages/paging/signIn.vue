<template>
	<view class="all">
		<!-- #ifdef APP-PLUS -->
		<view class="place"></view>
		<!-- #endif -->
		<view class="header">
			<i class="iconfont" @tap="navigateBack()">&#xe600;</i>
		</view>
		<view class="background">
			<image src="../../static/img/signIn-bk.jpg"></image>
		</view>
		<view class="content">
			<view class="title">
				<text>登录</text>
			</view>
			<view class="from">
				<input type="text" placeholder="手机号" v-model="phone">
				<input type="password" placeholder="密码" v-model="psd">
				<view class="btn" @tap="sendSignIn()">
					<text>登录</text>
				</view>
			</view>
		</view>
		<view class="signUp" @tap="signUp()">
			<text>注册</text>
		</view>
	</view>
</template>

<script>
	import interfaces from '../../utils/interfaces.js'
	export default{
		data() {
			return {
				phone: "",
				psd: "",
				loadingText: ""
			}
		},
		onShow() {
			
		}
		,
		methods:{
			isPhoneNumber(tel) {
				var reg =/^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
				return reg.test(tel);
			},
			signUp() {
				uni.navigateTo({
					url: 'signUp'
				})
			},
			sendSignIn() {
				var self = this;
				// console.log(this.phone,this.psd)
				if(!this.$options.methods.isPhoneNumber(this.phone)){
					this.loadingText = "手机号格式不正确"
					uni.showToast({
						title: this.loadingText,
						icon: "none"
					})
				}else if(this.psd == undefined || this.psd == ""){
					this.loadingText = "密码不能为空"
					uni.showToast({
						title: this.loadingText,
						icon: "none"
					})
				}else{
					uni.request({
						method: "POST",
						url: interfaces.signIn, //仅为示例，并非真实接口地址。
						data: {
							"phone": self.phone,
							"psd": self.psd
						},
	　　　　				dataType:'json',
						header: {
							// 'custom-header': 'hello' ,//自定义请求头信息
							'content-type':'application/x-www-form-urlencoded'
						}, 
						success: (res) => {
							var code = res.data.code;
							if(code == 2){
								this.loadingText = "登录成功"
								uni.showToast({
									title: this.loadingText,
									icon: "none"
								})
								// console.log(res.data.data[0]);
								uni.setStorage({
									key: 'userDes',
									data: res.data.data[0]
								});
								setTimeout(function () {
										uni.switchTab({
											url: '../tabBar/my/my'
										})
								},1000)
							}else if(code == 3){
								this.loadingText = "密码错误"
								uni.showToast({
									title: this.loadingText,
									icon: "none"
								})
							}else{
								this.loadingText = "服务器错误"
								uni.showToast({
									title: this.loadingText,
									icon: "none"
								})
							}
						}
					});
				}
			},
			navigateBack(){
				uni.switchTab({
					url:'../tabBar/square/square'
				})
			}
		},
		
	}
</script>

<style lang="less">
	.all{
		color: #707070;
		font-weight: 200;
		font-size: 35upx;
		display: flex;
		flex-direction:column;
		align-items:center;
		text-align: center;
		// border: 1px solid red;
		/* #ifdef APP-PLUS */
		.place{
			width: 100%;
			height: var(--status-bar-height);
			background-color: #FFFFFF;
		}
		/* #endif */
		.header{
			// border: 1px solid red;
			width: 750upx;
			text-align: left;
			background-color: #FFFFFF;
			// border-bottom: 2px solid #707070;
			height: 80upx;
			line-height: 80upx;
			i{
				// border: 1px solid red;
				width: 50upx;
				display: inline-block;
				transform: rotate(180deg);
				margin-left: 20upx;
			}
		}
		.background{
			position: fixed;
			bottom: 0;
			left: 0;
			z-index: -1;
			image{
				width: 750upx;
			}
		}
		.content{
			// height: 400upx;
			margin-top: 200upx;
			.title{
				font-size: 60upx;
				letter-spacing: 10px;
			}
			.from{
				margin-top: 100upx;
				input{
					margin-top: 50upx;
					width: 600upx;
					height: 80upx;
					text-align: left;
					border: 1px solid #707070;
					border-radius: 40upx;
					text-indent: 1em;
					box-shadow: 4px 10px 20px rgba(0,0,0,15%);
				}
				
			}
			.btn{
				margin-top: 100upx;
				// border: 1px solid #707070;
				text{
					border: 1px solid #707070;
					padding: 20upx 100upx;
					border-radius: 50upx;
					box-shadow: 4px 10px 20px rgba(0,0,0,15%);
				}
			}
		}
		.signUp{
			width: 550upx;
			display: block;
			margin-top: 60upx;
			// margin-right: -30upx;
			// border: 1px solid red;
			text-align: right;
			font-size: 25upx;
		}
		
	}
</style>
