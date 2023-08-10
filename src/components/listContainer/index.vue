<template>
  <!-- 列表下拉刷新，触底加载容器 -->
  <div class="list_container" ref="list_parent" @scroll="scrollFunc">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <slot name="list1" />
    </van-pull-refresh>
  </div>
</template>
<script>
export default {
  model: {
    prop: 'value',
    event: 'value'
  },
  props: {
    value: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  watch: {
    value: {
      handler (val) {
        this.refreshing = val
      },
      immediate: true
    }
  },
  data () {
    return {
      refreshing: false
    }
  },
  methods: {
    isScrollBottom () {
      // 是否滚动到了底部
      let box = this.$refs.list_parent
      var clientHeight = box.clientHeight
      var scrollTop = box.scrollTop
      var scrollHeight = box.scrollHeight
      if (scrollTop + clientHeight >= scrollHeight) {
        return true
      } else {
        return false
      }
    },
    //滚动
    scrollFunc () {
      if (this.isScrollBottom()) {
        //alert(1)
        //触底，调用加载事件
        //this.$emit("load");
      }
    },
    onRefresh () {
      this.$emit('refresh')
    }
  }
}
</script>
<style lang="scss" scoped>
.list_container {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
