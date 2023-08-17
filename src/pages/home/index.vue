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
          :current="swiperCur"
          circular
          :indicator-dots="indicatorDots"
          :autoplay="autoplay"
          :interval="interval"
        >
          <swiper-item>
            <view>
              <!-- <v-bar
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
              /> -->
              <v-gauge
                :styles="{ width: '100%', height: '200px' }"
                :extraOption="{
                  series: [
                    {
                      min: 0,
                      max: 10000,
                      splitNumber: 5,
                      axisTick: { distance: -15 },
                      splitLine: {
                        distance: -17
                      },
                      axisLine: {
                        lineStyle: {
                          color: [
                            [0.6, '#FF6E76'],
                            [1, '#58D9F9']
                          ]
                        }
                      },
                      axisLabel: {
                        distance: -25,
                        color: '#999'
                      },
                      pointer: {
                        offsetCenter: [0, '-70%'],
                        width: 10
                      },

                      title: {}
                    }
                  ]
                }"
                :series-data="[
                  {
                    value: 6789,
                    number: 6456,
                    name: '产水总量'
                  }
                ]"
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
import VGauge from '@/components/charts/gauge'
import dayjs from 'dayjs'
import { getTagsHistorical } from '@/services/statistics'

export default {
  components: { VBar, VPie, VGauge },
  data () {
    return {
      indicatorDots: true,
      autoplay: false,
      swiperCur: 0,
      overviewParams: [
        {
          text: '昨日',
          beginTime: dayjs().subtract(1, 'day').format('YYYY-MM-DD') + ' 00:00',
          interval: 3600 * 24
        },
        {
          text: '本月',
          beginTime: dayjs().startOf('month').format('YYYY-MM-DD') + ' 00:00',
          interval: 3600 * 24 * dayjs().date()
        },
        { text: '实时' }
      ],
      overviewQuery: {
        type: 0,
        BeginTime: dayjs().subtract(1, 'day').format('YYYY-MM-DD') + ' 00:00',
        Quantity: 2,
        Interval: 3600 * 24
      },
      StatisticsManagementArea: { data: [], xdata: [] },
      StatisticsRoomTypeQuantity: []
    }
  },
  onLoad () {
    console.log(dayjs().subtract(1, 'day'))
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
    this.getGaugeTags()
  },
  methods: {
    onChangeType (index, data) {
      if (index == this.overviewQuery.type) return
      this.overviewQuery.type = index
      this.overviewQuery.BeginTime = data.beginTime
      this.overviewQuery.Interval = data.interval
      this.getGaugeTags()
    },
    getGaugeTags () {
      return new Promise((resolve, reject) => {
        getTagsHistorical({
          TagIDs: [
            672, 689, 706, 723, 740, 757, 774, 791, 808, 825, 842, 859, 876,
            910, 927, 944, 961, 978, 995, 1012, 1029, 1046, 1063, 1081, 1160
          ],
          ...this.overviewQuery
        }).then(res => {
          if (!res.table) reject
          // console.log(res.table)
          resolve(res.table)
        })
      })
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
