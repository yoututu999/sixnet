<template>
  <div class="echart-pie-wrap">
    <a-empty
      v-show="isSeriesEmpty"
      :image-style="{
        height: styles.imgHeight || '40px'
      }"
      description="暂无数据"
    />
    <div
      v-show="!isSeriesEmpty"
      class="chart"
      ref="chart"
      :style="styles"
    ></div>
  </div>
</template>
<script>
import { merge, isEmpty } from 'lodash'
import { basicOption } from './option'
import * as echarts from 'echarts'

import { changeTwoDecimal_f } from '@/utils/tools'
export default {
  name: 'ChartPie',
  props: {
    // 正常的业务数据，对应echarts饼图配置中series[0].data
    seriesData: {
      type: [Array, null],
      required: true,
      default: () => []
    },
    // 表示需要特殊定制的配置
    // 一般UI会规定一个统一的设计规范（比如颜色，字体，图例格式，位置等）
    // 但不排除某个图标会和设计规范不同，需要特殊定制样式，所以开放这个配置，增强灵活性
    extraOption: {
      type: Object,
      default: () => ({})
    },
    styles: {
      type: Object,
      default: () => {
        return {
          width: '100%',
          height: '280px'
        }
      }
    }
  },
  computed: {
    // 针对饼图数据是不是无效的判断
    isSeriesEmpty () {
      return (
        isEmpty(this.seriesData) || this.seriesData.every(item => !item.value)
      )
    }
  },
  data () {
    return {
      chart: null
    }
  },
  watch: {
    seriesData: {
      deep: true,
      handler (val) {
        if (val && !this.isSeriesEmpty) {
          setTimeout(() => {
            this.chart = echarts.init(this.$refs.chart)
            this.updateChartView()
          }, 300)
        }
      }
    }
  },
  mounted () {
    window.addEventListener('resize', this.handleWindowResize)
    setTimeout(() => {
      this.chart = echarts.init(this.$refs.chart)
      this.updateChartView()
    }, 300)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleWindowResize)
  },
  methods: {
    /**
     * 将业务数据加入到基础样式配置中
     * @returns {Object} 完整的echart配置
     */
    assembleDataToOption () {
      // 这部分的图例formatter取决于UI要求，如果你的项目中不需要，就可以不写formatter
      const formatter = name => {
        const total = this.seriesData.reduce((acc, cur) => acc + cur.value, 0)
        const data = this.seriesData.find(item => item.name === name) || {}
        const percent =
          data.value && total > 0
            ? `${changeTwoDecimal_f((data.value / total) * 100)}%`
            : '0%'
        return `${name} ${percent}`
      }
      return merge(
        {},
        basicOption,
        // { color: this.colorArray },
        {
          legend: { formatter },
          series: [{ data: this.seriesData }]
        },
        this.extraOption
      )
    },

    /**
     * 更新echart视图
     */
    updateChartView () {
      if (!this.chart) return
      const fullOption = this.assembleDataToOption()

      this.chart.clear()

      this.chart.setOption(fullOption, true)

      this.chart.on('click', params => {
        this.$emit('clickJump', params)
      })
    },
    /**
     * 当窗口缩放时，echart动态调整自身大小
     */
    resizeHandler () {
      if (!this.chart) return
      this.chart.resize()
    },
    debounce (fun, delay) {
      let timer
      return function () {
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          fun()
        }, delay)
      }
    },
    handleWindowResize () {
      return this.debounce(this.resizeHandler, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
