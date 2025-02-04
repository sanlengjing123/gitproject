<template>
	<view>
		<h1 align="center">欢迎来到喜茶~</h1>
		<!-- 2: 在标签属性前面加上: 那么属性值就可以写表达式 -->
		   <image class="pic" src="../../static/images/yincha45.jpg" mode="" style="width: 200px;height: 200px;"></image>
		账号：<input type="text" v-model="user">
		密码：<input type="password" v-model="password">
		<button type="primary" @click="register" style="margin: 10px;" >注册</button>
		<button type="primary" @click="login" style="margin: 10px;">登陆</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// var name = '张三'  变量一定要在data中定义
				name: '李四',
				sex: '男',
				age: 18,
				boxStyle: 'box-green',
				user: '',
				password: '',
				registerInfos: []
			}
		},
		// 函数定义在methods
		methods: {
    
			register(){
				let registerInfo = {
					user: this.user,
					password: this.password
				};
				this.registerInfos.push(registerInfo);
				console.log(this.registerInfos);
				uni.navigateTo({
				    url: '/pages/zhuce/zhuce'
				});
				
			},
			login(){
				// console.log(this.user);
				// console.log(this.password);
				// 验证账号密码是否正确
				let pages=getCurrentPages();
				let pg= pages[ pages.length-2];
				pg.userLogin();
				uni.navigateBack();
			}
		}
	}
</script>

<style>
	.pic{
		display:block;
		margin: 0 auto;
	}

</style>
