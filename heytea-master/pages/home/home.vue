<template>
	<view class="content">


		<!--
	<image class="logo" src="/static/intro1.jpg"></image>
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
	-->

		<view class="PHOTOcontainer">
			<!-- 自动滚动的图片展示区域 -->
			<swiper autoplay interval="3000">
				<swiper-item v-for="(photo, index) in photoList" :key="index">
					<image :src="photo"></image>
				</swiper-item>
			</swiper>
		</view>


		<view class="USERcontainer">
			<!-- 用户信息模块 -->
			<view class="user-info">
				<text class="name">{{ user.name }}</text>
			</view>
			<view class="qrcode-button" @click="showQrCode">
			  <image src="/static/QRicon.png"></image>
			</view>

		</view>


		<view class="ORDERcontainer">
			<!-- 订单模块 -->
			<view class="order-buttons">
				<image class="order-background" src="/static/order-background.png"></image>
				<button class="pickup-button" @click="goToDiandan('pickup')">
					<text>到店自取</text>
				</button>
				<button class="delivery-button" @click="goToDiandan('delivery')">喜外送</button>
			</view>


		</view>
		<br>

		<view class="VIDEOcontainer">
			<!-- 视频播放窗口 -->
			<video class="video-player" controls :src="videoUrl"></video>
		</view>
		<br><br><br>

		<iframe width="100%" height="auto%" src="https://www.youtube.com/embed/ossfi0IA6ok" title="喜茶首支剧情短片 —《橘之味｜阿公篇》"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			allowfullscreen></iframe>
		<br><br><br>

	</view>

</template>

<script>
	export default {
		data() {
			return {
				title: "喜茶点单",
				user: {
					name: "第二组用户"
				},
				photoList: [
					"/static/intro1.jpg",
					"/static/intro2.jpg",
					"/static/intro3.jpg"
				],

				adList: [
					// 广告信息列表
				],
				videoUrl: "/static/homepage.mp4", // 替换为实际的视频链接
			};
		},
		onLoad() {
			// 初始化数据，如获取轮播图图片链接、按钮列表、广告信息等
			this.photoList = [
				"/static/intro1.jpg",
				"/static/intro2.jpg",
				"/static/intro3.jpg"
			];

			this.buttonList = [
				"联系客服",
				"联系我们",
				"进入商城",
				"查看礼品卡",
				"查看消费券"
			];

			this.adList = [
				// 广告信息列表
			];
			this.videoUrl = "/static/homepage.mp4";
		},
		methods: {
			showQrCode() {
			    this.$router.push('/pages/MyQRPage/MyQRPage');
			  },
			
			goToDiandan(type) {
				// 根据按钮类型跳转到相应的页面
				if (type === 'pickup') {
					// 到店自取
					this.$router.push('/pages/mart/mart');
				} else if (type === 'delivery') {
					// 喜外送
					this.$router.push('/pages/mart/mart');
				}
			},
			// 点击按钮跳转到相应页面
			navigateTo(button) {
				if (button === "联系客服") {
					this.$router.push("/pages/LZL.vue");
				} else if (button === "联系我们") {
					this.$router.push("/pages/example-page.vue");
				} else if (button === "进入商城") {
					this.$router.push("/pages/example-page.vue");
				} else if (button === "查看礼品卡") {
					this.$router.push("/pages/giftcard.vue");
				} else if (button === "查看消费券") {
					this.$router.push("/pages/xiaofeiquan.vue");
				}
			},
		}


	};
</script>

<style>
	.content {
		background-image: url(/static/content_bac.jpg);
	}

	/* 根据需要添加样式 */
	.PHOTOcontainer {
		position: relative;
		display: flex;
		flex-direction: column;

		width: 100%;
		/* 设置宽度 */
		height: 300px;
		/* 设置高度 */
		overflow: hidden;
		/* 隐藏超出容器的内容 */
	}

	.PHOTOcontainer swiper {
		width: 100%;
		/* 设置swiper组件的宽度 */
		height: 100%;
		/* 设置swiper组件的高度 */
	}

	.PHOTOcontainer swiper-item {
		display: flex;
		/* 设置为弹性布局，使图片水平排列 */
		align-items: center;
		/* 在纵轴上居中对齐 */
		justify-content: center;
		/* 在横轴上居中对齐 */
		height: 100%;
		/* 设置每个swiper-item的高度 */
	}

	.PHOTOcontainer image {
		width: 100%;
		/* 图片宽度填满swiper-item容器 */
		height: 100%;
		/* 图片高度填满swiper-item容器 */
		object-fit: contain;
		/* 按比例缩放图片，使其填满容器 */
	}

	.USERcontainer {
		width: auto%;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30rpx;
		margin: 19px;
		border-radius: 4%;
		border: 1px solid black;
	}

	.user-info {
		margin-right: auto;
	}

	.qrcode-button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		background-color: #ffffff;
		border-radius: 50%;
		margin-left: 10px;
	}

	.qrcode-button image {
		width: 20px;
		height: 20px;
		object-fit: cover;
	}




	.ORDERcontainer {
		border-radius: 10%;
		position: relative;
		background-color: azure;
		padding: 30rpx;
		margin: 19px;
		border-radius: 4%;
		border: 1px solid black;
	}

	.order-buttons {
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.order-background {
		position: absolute;

		/*配送的容器背景*/
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		z-index: -1;
	}

	.pickup-button,
	.delivery-button {
		background-color: #abfae4;
		color: #000000;
		/*到店自取和外送文字颜色*/

		border-radius: 36%;
		cursor: pointer;
		font-size: 16px;
		padding: 10px;
	}

	.scrollable-buttons {
		display: flex;
		align-items: center;
		overflow-x: scroll;
		padding: 10px 0;
		background-color: red;
	}



	.VIDEOcontainer {
		width: 100%;
		height: 300px;
		overflow: hidden;
		background-color: #ebebeb;
	}

	.video-player {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>