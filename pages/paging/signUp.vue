<template>
	<view class="all">
		<!-- #ifdef APP-PLUS -->
		<view class="place"></view>
		<!-- #endif -->
		<view class="header">
			<i class="iconfont" @tap="navigateBack()">&#xe600;</i>
		</view>
		<view class="content">
			<view class="title">
				<text>注册</text>
			</view>
			<view class="from">
				<input type="text" class="user" placeholder="用户名" v-model="username"/>
				<input type="text" class="phone" placeholder="手机号" v-model="phone">
				<input type="password" placeholder="密码" v-model="psd">
				<view class="btn" @tap="sendSignUp">
					<text>注册</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import interfaces from '../../utils/interfaces.js'
	export default{
		data() {
			return {
				username: "",
				phone: "",
				psd: ""
			}
		},
		onShow() {
			
		},
		methods:{
			navigateBack(){
				uni.navigateBack();
			},
			isPhoneNumber(tel) {
				var reg =/^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
				return reg.test(tel);
			},
			sendSignUp() {
				console.log(this.username,this.phone,this.psd)
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
						url: interfaces.signUp, //仅为示例，并非真实接口地址。
						data: {
							"phone": self.phone,
							"psd": self.psd,
							"username": self.username
						},
	　　　　				dataType:'json',
						header: {
							// 'custom-header': 'hello' ,//自定义请求头信息
							'content-type':'application/x-www-form-urlencoded'
						}, 
						success: (res) => {
							var code = res.data.code;
							if(code == 1){
								this.loadingText = "注册成功"
								uni.showToast({
									title: this.loadingText,
									icon: "none"
								})
								// console.log(res.data.data[0]);
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
			}
		}
	}
</script>

<style lang="less" scoped>
	.all{
		color: #707070;
		font-weight: 200;
		font-size: 35upx;
		display: flex;
		flex-direction:column;
		align-items:center;
		text-align: center;
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
		.content{
			// height: 400upx;
			margin-top: 300upx;
			.title{
				font-size: 60upx;
				letter-spacing: 10px;
			}
			.from{
				// border: 1px solid red;
				margin-top: 100upx;
				input{
					display: inline-block;
					margin-top: 50upx;
					width: 600upx;
					height: 80upx;
					text-align: left;
					border: 1px solid #707070;
					border-radius: 40upx;
					text-indent: 1em;
					box-shadow: 4px 10px 20px rgba(0,0,0,15%);
				}
				.user{
					display: inline-block;
					width: 30%;
				}
				.phone{					
					display: inline-block;
					width: 50%;
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
	}
</style>
