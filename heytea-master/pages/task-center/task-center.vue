<template>
	<view>
		<scroll-view scroll-y="true" class="chat-view" :scroll-top="y">
			<view v-for="(item, index) in chatContent" :key="index">
				<view class="left" v-if="item.character === 'service'">
					<image :src="item.imgSrc" mode=""></image>
					<view class="left-text">
						<span>{{ item.text }}</span>
						<a href="urlItem.url" v-for="urlItem in item.urls">{{urlItem.urlDesc}}</a>
					</view>
				</view>
				<view class="right" v-else>
					<image :src="item.imgSrc" mode=""></image>
					<view class="right-text">
						{{ item.text }}
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="bottom-bar">
			<input type="text" v-model="inputText" @input="inputBoxChanged" @keydown.enter="sendMsg" />
			<button :disabled="chatObject.disableSend" @click="sendMsg">发送</button>
		</view>
	</view>
</template>

<script>
	const API_KEY = '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';
	const MODEL_NAME = 'gpt-3.5-turbo';
	// const CHAT_AI_URL = 'http://localhost:5090/RandomChat/';
	const CHAT_AI_URL = 'http://localhost:58751/ChatLog/';
	// const CHAT_AI_URL = 'https://api.openai.com/v1/chat/completions';
	const ICON1 = '/static/images/icons8-person-64.png'
	const ICON2 = '/static/images/icons8-person-641.png'
	export default {
		data() {
			return {
				chatContent: [],
				inputText: '',
				y: 9999,
				chatObject: {
					disableSend: true,

				},
				shopItems: [{
					keyword: "主页",
					url: "/pages/index/index",
					urlDesc: "回到主页"
				}, {
					keyword: '错误',
					url: "/pages/index/index",
					urlDesc: "回到主页"
				}, {
					keyword: '招牌奶盖茶',
					url: "/pages/index/index",
					urlDesc: "招牌奶盖茶"
				}, {
					keyword: '招牌红茶',
					url: "/pages/index/index",
					urlDesc: "招牌红茶"
				}, {
					keyword: '原味奶茶',
					url: "/pages/index/index",
					urlDesc: "原味奶茶"
				}],
				sampleMessage: [
					"当然！根据您的口味偏好，以下是几款人们喜爱的奶茶推荐：\n\n1. 原味奶茶：经典口味，以红茶搭配鲜牛乳或奶精调制而成，口感香滑浓郁。\n\n2. 斑马奶茶：黑白相间的外观非常吸引人。混合了红茶、抹茶和巧克力酱，有独特的口感和层次感。\n\n3. 芒果奶茶：将新鲜芒果与红茶或绿茶搭配，既有丰富的芒果香味，又有茶的清新口感。\n\n4. 抹茶拿铁：将抹茶粉与牛奶混合，加入一些糖浆，口感浓郁香醇。\n\n5. 水果茶：以水果为主要原料，如草莓、蓝莓、柠檬等，添加茶底制作而成，酸甜可口。\n\n以上只是一些常见的奶茶推荐，希望能够满足你的口味需求。还有其他口味的奶茶，您可以告诉我您更喜欢的是哪一种口味，我可以进一步为您推荐。",
					"当然可以！我们推荐给您我们的招牌奶茶——喜茶招牌奶盖茶！这款奶茶是我们店内最受欢迎的产品之一。它采用顶级茶叶与新鲜牛奶混合，口感浓郁且顺滑。而且我们还有特别的奶盖处理方式，奶香浓郁，丝滑细腻，是一款令人回味无穷的奶茶。您可以选择加入绿茶或者红茶，根据自己的口味喜好来选择。建议您一定要尝试一下，相信会给您带来美好的味蕾体验。",
					"当然可以！根据你的口味，我为你推荐一款热门的奶茶——招牌红茶。这款奶茶使用优质的红茶搭配新鲜牛奶，口感浓郁香醇，茶香和牛奶的搭配相得益彰。如果你喜欢甜度更高的口味，也可以选择加入适量的糖或搭配其他口味的珍珠、布丁等配料。希望你会喜欢这款奶茶！如果你有其他的口味需求，请随时告诉我。"
				]
			}
		},
		methods: {
			onLoad(option) {
				const reply = '你好，这里是智能客服。有什么能帮你的吗？';
				let obj = {
					text: reply,
					character: 'service'
				};
				this.addMsg(obj);
			},
			addMsg(obj) {
				let miao = obj.text.includes("喵");

				obj.urls = [];

				for (let i = 0; i < this.shopItems.length; i++) {
					let shopitem = this.shopItems[i];

					if (obj.text.includes(shopitem.keyword)) {
						obj.urls.push({
							url: shopitem.url,
							urlDesc: shopitem.urlDesc,
						});
					}
				}
				obj.imgSrc = (obj.character == 'service' ? ICON1 : ICON2);

				if (miao) {
					for (urlItem in obj.urls) {
						urlItem.url += "喵~";
					}
				}

				this.chatContent.push(obj);
				// 让屏幕自动滚到下面
				this.$nextTick(() => {
					this.y++;
				})
				console.log(obj);
			},
			sendMsg() {
				let obj = {
					text: this.inputText,
					character: 'customer'
				};
				this.addMsg(obj);
				// 回复处理
				this.autoReply(this.inputText);
				// 让屏幕自动滚到下面
				this.$nextTick(() => {
					this.y++;
				})
				this.inputText = '';
				this.chatObject.disableSend = true;
			},
			inputBoxChanged() {
				this.chatObject.disableSend = this.inputText == null || this.inputText.length == 0;
			},

			// async autoReply(message) {
			// 	let randomIndex = Math.floor(Math.random() * this.sampleMessage.length);
			// 	let reply = this.sampleMessage[randomIndex];
			// 	let obj = {
			// 		text: reply,
			// 		character: 'service'
			// 	};
			// 	this.addMsg(obj);
			// }
			async autoReply(message) {
				const data = {
					'model': MODEL_NAME,
					'messages': [{
							'role': 'system',
							'content': '你是喜茶小程序猫娘智能客服，请回答顾客的问题。'
						},
						{
							'role': 'user',
							'content': message
						}
					],
					'n':4
				};


				// 请求openai接口
				const response = await fetch(CHAT_AI_URL, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + API_KEY
					},
					body: JSON.stringify(data)
				});
				// 得到返回数据
				const responseData = await response.json();

				//let responseData = res.data;
				if (responseData.choices && responseData.choices.length > 0) {
					const reply = responseData.choices[0].message.content;
					let obj = {
						text: reply,
						character: 'service'
					};
					this.addMsg(obj);
				} else {
					console.error('Invalid API response:', responseData);
				}

				// this.$axios.post(CHAT_AI_URL,
				// 	data, {
				// 		headers: {
				// 			'Content-Type': 'application/json',
				// 			'Authorization': 'Bearer ' + API_KEY
				// 		}
				// 	}
				// ).then(res => {
				// 	let responseData = res.data;
				// 	if (responseData.choices && responseData.choices.length > 0) {
				// 		const reply = responseData.choices[0].message.content;
				// 		let obj = {
				// 			text: reply,
				// 			character: 'service'
				// 		};
				// 		this.addMsg(obj);
				// 	} else {
				// 		console.error('Invalid API response:', responseData);
				// 	}
				// }).catch(err => {
				// 	const reply = '发生了错误，请重试。';
				// 	let obj = {
				// 		text: reply,
				// 		character: 'service'
				// 	};
				// 	this.addMsg(obj);
				// });
			}
		}
	}
</script>

<style>
	.chat-view {
		padding: 0px;
		box-sizing: border-box;
		top: 40px;

		position: fixed;
		width: 100%;
		bottom: 70px;
	}

	image {
		width: 50px;
		height: 50px;
		border-radius: 10px;
		align-self: flex-start;
	}

	.left {
		display: flex;
		align-items: center;
		padding: 6px;
		background-color: #ddd;
	}

	.left-text {
		user-select: text;
		border-radius: 10px;
		background-color: white;
		padding: 6px;
		margin-left: 10px;
		max-width: 60%;
	}

	.right {
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
		padding: 6px;
		background-color: #eee;
	}

	.right-text {
		user-select: text;
		background-color: darkgray;
		border-radius: 10px;
		padding: 6px;
		max-width: 60%;
		margin-right: 10px;
		color: white;
	}

	.bottom-bar {
		position: fixed;
		left: 5px;
		right: 5px;
		bottom: 0px;
		display: flex;
	}

	.bottom-bar>input {
		height: 36px;
		border: 1px solid black;
		left: 0px;
		width: 100%;
		margin: 4px;
		padding: 1px;
		border-radius: 8px;
	}

	.bottom-bar>button {
		margin: 4px;
		width: 90px;
		height: 40px;
		padding: 0px;
	}

	.content-link {
		display: flex;
		flex-wrap: wrap;
	}
</style>