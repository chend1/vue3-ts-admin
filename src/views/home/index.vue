<script setup lang="ts">
import * as echarts from 'echarts'
import MyEcharts from '@/components/MyEcharts.vue'
// 饼状图
const barOption = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)',
      },
    },
  ],
}
// 折线图
const lineOption = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line',
    },
  ],
}
// 饼状图
const pieOption = {
  title: {
    text: 'Referer of a Website',
    subtext: 'Fake Data',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
}
</script>

<template>
  <div class="main">
    <div class="item">
      <div class="title">柱形图</div>
      <div class="echarts">
        <MyEcharts :option="barOption" myEcharts="myEcharts"></MyEcharts>
      </div>
    </div>
    <div class="item">
      <div class="title">折线图</div>
      <div class="echarts">
        <MyEcharts :option="lineOption" myEcharts="myEcharts2"></MyEcharts>
      </div>
    </div>
    <div class="item">
      <div class="title">饼状图</div>
      <div class="echarts">
        <MyEcharts :option="pieOption" myEcharts="myEcharts3"></MyEcharts>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  .item {
    width: 32.3%;
    height: 350px;
    background-color: #d7e7ff;
    box-sizing: border-box;
    padding: 10px;
    margin-right: 1%;
    .echarts {
      height: 350px;
    }
  }
}
</style>
