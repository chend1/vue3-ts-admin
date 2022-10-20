<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted } from 'vue'
type EChartsOption = echarts.EChartsOption
const props = defineProps<{
  option: EChartsOption | any
  echartStyle?: { width?: string; height?: string },
  myEcharts: string
}>()
function initChart() {
  const chartDom = document.getElementById(props.myEcharts)
  const myEcharts = chartDom && echarts.init(chartDom)
  props.option && myEcharts && myEcharts.setOption(props.option)
  window.onresize = function () {
    //自适应大小
    myEcharts && myEcharts.resize()
  }
}
onMounted(() => {
  initChart()
})
</script>

<template>
  <div
    :id="myEcharts"
    :style="{
      width: echartStyle?.width || '100%',
      height: echartStyle?.height || '100%',
    }"
  ></div>
</template>

<style scoped></style>
