<template>
	<view class="content">
		<van-cell-group title="报表中心" inset>
			<van-grid :border="false" column-num="2">
				<van-grid-item v-for="(item, i) in reportList" :key="i">
					<template #icon>
						<van-icon class-prefix="sixnet" :name="item.icon" size="50" class="mgb-lg" />
					</template>
					<template #text>
						<span class="report-text">{{ item.name }}</span>
					</template>
				</van-grid-item>
			</van-grid>
		</van-cell-group>
		<!-- <van-cell-group title="报表中心" inset>
      <van-cell title="水质运行记录" size="large" is-link clickable>
        <template #icon>
          <van-icon
            class-prefix="sixnet"
            name="ziyuan"
            size="22"
            class="mgr-base"
            color=""
          />
        </template>
      </van-cell>
      <van-cell title="月度运行报告" size="large" is-link clickable>
        <template #icon>
          <van-icon
            class-prefix="sixnet"
            name="tongji"
            size="22"
            class="mgr-base"
            color=""
          />
        </template>
      </van-cell>
      <van-cell title="年度运行报告" size="large" is-link clickable>
        <template #icon>
          <van-icon
            class-prefix="sixnet"
            name="shujutongji"
            size="22"
            class="mgr-base"
            color=""
          />
        </template>
      </van-cell>
      <van-cell title="历史数据对比分析" size="large" is-link clickable>
        <template #icon>
          <van-icon
            class-prefix="sixnet"
            name="tongji1"
            size="22"
            class="mgr-base"
            color=""
          />
        </template>
      </van-cell>
    </van-cell-group> -->
	</view>
</template>

<script>
export default {
    data() {
        return {
            reportList: [{
                name: '水质运行记录',
                icon: 'ziyuan'
            },
            {
                name: '月度运行报告',
                icon: 'tongji'
            },
            {
                name: '年度运行报告',
                icon: 'shujutongji'
            },
            {
                name: '历史数据对比分析',
                icon: 'tongji1'
            }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
	.content {}

	.report-text {
		font-size: $uni-font-size-base;
	}
</style>