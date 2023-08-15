<template>
  <view class="main van-safe-area-bottom">
    <view class="main-box">
      <view class="flex main-box-title">
        <text>概况</text>
        <view class="params">
          <text
            v-for="(p, i) in overviewParams"
            :class="[{ cur: overviewQuery.type == i }]"
            @click="onChangeType(i, p)"
            >{{ p.text }}</text
          >
        </view>
      </view>
      <view class="main-box-cont">
        <swiper
          class="swiper"
          circular
          :indicator-dots="indicatorDots"
          :autoplay="autoplay"
          :interval="interval"
        >
          <swiper-item>
            <view>
              <v-bar
                :styles="{ width: '100%', height: '200px' }"
                :series-data="StatisticsManagementArea.data"
                :xaxis-data="StatisticsManagementArea.xdata"
                :extraOption="{
                  color: '#a9aaae',
                  grid: {
                    left: '10%',
                    right: '5%',
                    top: '5%',
                    bottom: '15%'
                  },
                  series: [{ label: { show: false } }],
                  tooltip: {
                    formatter: params => {
                      let data = params[0].data
                      return `<b>${data.month}月</b><br> ${params[0].value} ㎡`
                    }
                  }
                }"
              />
            </view>
          </swiper-item>
          <swiper-item>
            <v-pie
              :styles="{ width: '100%', height: '200px', imgHeight: '80px' }"
              :series-data="StatisticsRoomTypeQuantity"
              :extraOption="{
                legend: { show: false },

                series: [{ radius: '60%' }]
              }"
            />
          </swiper-item>
        </swiper>
      </view>
    </view>
    <view class="main-box">
      <view class="flex main-box-title">
        <text>站点列表</text>
      </view>
    </view>
  </view>
</template>
<script>
import VBar from '@/components/charts/bar'
import VPie from '@/components/charts/pie'

export default {
  components: { VBar, VPie },
  data () {
    return {
      indicatorDots: true,
      autoplay: false,
      overviewParams: [
        { text: '昨日', beginTime: '' },
        { text: '本月', beginTime: '' },
        { text: '实时', beginTime: '' }
      ],
      overviewQuery: {
        type: 0
      },
      StatisticsManagementArea: { data: [], xdata: [] },
      StatisticsRoomTypeQuantity: []
    }
  },
  onLoad () {
    this.StatisticsManagementArea = {
      data: [
        {
          data: [
            { name: 1, value: 434 },
            { name: 2, value: 44 },
            { name: 3, value: 68 },
            { name: 4, value: 123 },
            { name: 5, value: 33 }
          ]
        }
      ],
      xdata: [1, 2, 3, 4, 5]
    }
    this.StatisticsRoomTypeQuantity = [
      { name: '22', value: 343 },
      { name: '23', value: 222 },
      { name: '252', value: 66 }
    ]
  },
  methods: {
    onChangeType (index, data) {
      if (index == this.overviewQuery.type) return
      this.overviewQuery.type = index
      this.overviewQuery.beginTime = data.beginTime
    }
  }
}
</script>
<style lang="scss" scoped>
.main {
  width: 100%;
  height: calc(100vh - 50px);
  // background: url(/src/static/imgs/background-9.png) no-repeat center;
  box-sizing: border-box;
}
.swiper {
  height: 220px;
}
.cur {
  color: #333;
  font-weight: 600;
}
</style>
