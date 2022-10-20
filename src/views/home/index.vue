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
// 雷达图
const radarOption = {
  color: ['#67F9D8', '#FFE434', '#56A3F1', '#FF917C'],
  title: {
    text: 'Customized Radar Chart',
  },
  legend: {},
  radar: [
    {
      indicator: [
        { text: 'Indicator1' },
        { text: 'Indicator2' },
        { text: 'Indicator3' },
        { text: 'Indicator4' },
        { text: 'Indicator5' },
      ],
      center: ['25%', '50%'],
      radius: 120,
      startAngle: 90,
      splitNumber: 4,
      shape: 'circle',
      axisName: {
        formatter: '【{value}】',
        color: '#428BD4',
      },
      splitArea: {
        areaStyle: {
          color: ['#77EADF', '#26C3BE', '#64AFE9', '#428BD4'],
          shadowColor: 'rgba(0, 0, 0, 0.2)',
          shadowBlur: 10,
        },
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(211, 253, 250, 0.8)',
        },
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(211, 253, 250, 0.8)',
        },
      },
    },
    {
      indicator: [
        { text: 'Indicator1', max: 150 },
        { text: 'Indicator2', max: 150 },
        { text: 'Indicator3', max: 150 },
        { text: 'Indicator4', max: 120 },
        { text: 'Indicator5', max: 108 },
        { text: 'Indicator6', max: 72 },
      ],
      center: ['75%', '50%'],
      radius: 120,
      axisName: {
        color: '#fff',
        backgroundColor: '#666',
        borderRadius: 3,
        padding: [3, 5],
      },
    },
  ],
  series: [
    {
      type: 'radar',
      emphasis: {
        lineStyle: {
          width: 4,
        },
      },
      data: [
        {
          value: [100, 8, 0.4, -80, 2000],
          name: 'Data A',
        },
        {
          value: [60, 5, 0.3, -100, 1500],
          name: 'Data B',
          areaStyle: {
            color: 'rgba(255, 228, 52, 0.6)',
          },
        },
      ],
    },
    {
      type: 'radar',
      radarIndex: 1,
      data: [
        {
          value: [120, 118, 130, 100, 99, 70],
          name: 'Data C',
          symbol: 'rect',
          symbolSize: 12,
          lineStyle: {
            type: 'dashed',
          },
          label: {
            show: true,
            formatter: function (params: any) {
              return params.value
            },
          },
        },
        {
          value: [100, 93, 50, 90, 70, 60],
          name: 'Data D',
          areaStyle: {
            color: new echarts.graphic.RadialGradient(0.1, 0.6, 1, [
              {
                color: 'rgba(255, 145, 124, 0.1)',
                offset: 0,
              },
              {
                color: 'rgba(255, 145, 124, 0.9)',
                offset: 1,
              },
            ]),
          },
        },
      ],
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
    <div class="item">
      <div class="title">雷达图</div>
      <div class="echarts">
        <MyEcharts :option="radarOption" myEcharts="myEcharts4"></MyEcharts>
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
