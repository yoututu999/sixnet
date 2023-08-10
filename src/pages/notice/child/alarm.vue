<template>
  <view>
    <van-pull-refresh
      v-model="refreshing"
      class="van-safe-area-bottom"
      @refresh="onRefresh"
    >
      <van-list
        ref="vanList"
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="loadList"
      >
        <div
          v-for="(item, index) in list"
          :key="index"
          @click="goPage(item)"
          class="notice-item"
        >
          <view class="pgup">
            <b>{{ item.Title }}</b>
          </view>
          <view class="center">{{ item.NeiRong }}</view>
          <view class="pgdn">{{ item.AddTime }}</view>
        </div>
      </van-list>
    </van-pull-refresh>
  </view>
</template>
<script>
import { getAlarmList } from '@/services/notice'
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      params: {
        type: 0,
        page: 1,
        limit: 15,
        order: 'desc'
      }
    }
  },
  mounted () {},
  methods: {
    loadList () {
      getAlarmList(this.params)
        .then(res => {
          const { data, code, count } = res
          this.refreshing = false
          if (code == 0) {
            if (count == 0) {
              this.finished = true
              this.loading = false
              return
            }
            // 加载状态结束
            this.loading = false
            this.list = this.list.concat(data)

            // 数据全部加载完成
            if (
              this.params.page == Math.ceil(count / this.params.limit) ||
              count == 0
            ) {
              this.finished = true
              return
            }
            this.params.page++
          } else {
            this.finished = true
            this.loading = false
            this.error = true
          }
        })
        .catch(() => {
          this.error = true
          this.loading = false
        })
    },
    onRefresh () {
      this.refreshing = true
      // 清空列表数据
      this.finished = false
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.params.page = 1
      this.list = []

      this.$refs.vanList.check()
    }
  }
}
</script>
