<template>
  <view class="content">
    <van-tabs
      v-model:active="active"
      @click-tab="onClickTab"
      color="#174f88"
      title-active-color="#174f88"
      class="mgb-lg"
    >
      <van-tab title="通知" :name="1"></van-tab>
      <van-tab title="告警" :name="2"></van-tab>
    </van-tabs>
    <component class="" :is="componentTag"></component>
  </view>
</template>

<script>
import mess from './child/mess'
import alarm from './child/alarm'
export default {
  components: { alarm, mess },
  data () {
    return {
      active: 1,
      componentTag: ''
    }
  },
  onLoad () {
    this.componentTag = 'mess'
  },
  methods: {
    onClickTab () {
      this.componentTag = this.active == 1 ? 'mess' : 'alarm'
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
}
</style>
