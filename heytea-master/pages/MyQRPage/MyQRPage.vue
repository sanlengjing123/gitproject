<template>
  <view>
    <image :src="qrCodeImageUrl"></image>
  </view>
</template>

<script>
export default {
  data() {
    return {
      qrCodeImageUrl: '/static/myQR.jpg' // 替换为你的myQR图片的实际路径
    };
  }
};
</script>

<style>
/* 可选的样式 */
</style>
