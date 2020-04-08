<template>
	<view class="all">
		<!-- #ifdef APP-PLUS -->
		<view class="place"></view>
		<!-- #endif -->
		<view class="header">
			<i class="iconfont" @tap="navigateBack()">&#xe600;</i>
			<text>写留言</text>
		</view>
		<view class="writeContent">
			<textarea cols="40" rows="10" :placeholder="contentText" @input="writeMessage"></textarea>
			<view class="send" @tap="sendMessage(contentText)">
				<text>发表</text>
			</view>
		</view>
	</view>
</template>

<script>
	import interfaces from '../../utils/interfaces.js';
	export default{
		data() {
			return{
				contentText:"分享新鲜事...",
				userId: undefined,
				sendToast: "",
			}
		},
		onShow() {
			this.verification(this);
			console.log(this.userId)
		},
		methods:{
			navigateBack() {
				uni.navigateBack();
			},
			verification(self) {
				uni.getStorage({
					key: "userDes",
					success(e) {
						self.userId  = e.data.id;
					}
				})
			},
			writeMessage(e) {
				this.contentText = e.detail.value;
			},
			sendMessage(data) {
				console.log(124)
				var self = this;
				uni.request({
					method: "POST",
					url: interfaces.sendMessage, //仅为示例，并非真实接口地址。
					data: {
						"userId": self.userId,
						"content": data
					},
　　　　				dataType:'json',
					header: {
						// 'custom-header': 'hello' ,//自定义请求头信息
						'content-type':'application/x-www-form-urlencoded'
					}, 
					success: (res) => {
						// console.log(res.data);
						if(res.data.code == 1){
							self.sendToast = "添加成功"
							uni.showToast({
								icon: "success",
								title: self.sendToast,
								success() {
									setTimeout(function () {
										uni.navigateBack()
									},1000)
								}
							})
						}else{
							self.sendToast = "服务器出错",
							uni.showToast({
								icon: "none",
								title: self.sendToast
							})
						}
					}
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	page{
		background-color: #F0F0F0;
	}
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
		.header{
			background-color: #FFFFFF;
			border-bottom: 1px solid #707070;
			height: 80upx;
			line-height: 80upx;
			i{
				// border: 1px solid red;
				width: 50upx;
				display: inline-block;
				transform: rotate(180deg);
				margin-left: 20upx;
			}
			text{
				display:inline-block;
				transform: translate(50%);
				font-size: 30upx;
				font-weight: 600;
			}
		}
		.writeContent{
			position: relative;
			background-color: #FFFFFF;
			height: 600upx;
			// border: 1px solid #707070;
			textarea{
				box-sizing: border-box;
				width: 100%;
				height: 100%;
				// border: 1px solid red;
				padding: 30upx;
				font-size: 30upx;
				font-weight: 500;
			}
			.send{
				width: 100%;
				// position: absolute;
				// bottom: 30upx;
				// right: 30upx;
				text-align: right;
				box-sizing: border-box;
				// border: 1px solid red;
				background-color: #FFFFFF;
				padding: 10px 40upx;
				// border-right: 1px solid #707070;
				// border-left: 1px solid #707070;
				border-bottom: 1px solid #707070;
				text{
					display: inline-block;
					background-color: #169AFF;
					padding: 10upx 20upx;
					color: #f4f4f4;
					font-size: 27upx;
					border-radius: 10upx;
					font-weight: 400;
				}
			}
		}
	}
</style>
