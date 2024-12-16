'use client'

import ReactECharts from 'echarts-for-react'
import { fm, toTWDate3, formatNumber } from '@/utils/fm'

export default function MonthlyPlot1({ data }) {
  // 準備圖表數據
  const xAxisData = data.map(item => toTWDate3(item.YM))
  const s1Data = data.map(item => item.AAGBAMT / 100000000)
  const s2Data = data.map(item => (item.AAGBAMT / 100000000) * Math.random())
  const s3Data = data.map(item => (item.AAGBAMT / 100000000) * Math.random())
  const s4Data = data.map(item => (item.AAGBAMT / 100000000) * Math.random())
  const s5Data = data.map(item => (item.AAGBAMT / 100000000) * Math.random())
  const d1Data = s3Data.map((value, index) => value - s2Data[index])
  const d2Data = s3Data.map((value, index) => value - s4Data[index])
  const d3Data = s3Data.map((value, index) => value - s5Data[index])

  const s1Color = '#33658a'
  const s2Color = '#f6ae2d'
  const s3Color = '#f26419'
  const s4Color = '#2f4858'
  const s5Color = '#86bbd8'
  const d1Color = '#33658a'
  const d2Color = '#f6ae2d'
  const d3Color = '#f26419'

  const s1Name = '工期進度'
  const s2Name = '預定進度'
  const s3Name = '實際進度'
  const s4Name = '營收進度'
  const s5Name = '計價進度'
  const d1Name = '實際進度-預定進度'
  const d2Name = '實際進度-營收進度'
  const d3Name = '實際進度-計價進度'

  // 圖表配置
  const option = {
    title: [
      {
        text: '累計進度',
        left: 'center',
        textStyle: {
          fontSize: 24,
        },
      },
      {
        text: '累計進度差異',
        top: '47%',
        left: 'center',
        textStyle: {
          fontSize: 24,
        },
      },
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter: function (params) {
        // 取得年月標籤
        let result = params[0].axisValueLabel + '<br/>'

        // 第一個圖表的數據
        if (params[0].componentIndex === 0) {
          const items = [
            {
              name: s1Name,
              value: params.find(p => p.seriesName === s1Name).value || 0,
              color: s1Color,
            },
            {
              name: s2Name,
              value: params.find(p => p.seriesName === s2Name).value || 0,
              color: s2Color,
            },
            {
              name: s3Name,
              value: params.find(p => p.seriesName === s3Name).value || 0,
              color: s3Color,
            },
            {
              name: s4Name,
              value: params.find(p => p.seriesName === s4Name).value || 0,
              color: s4Color,
            },
            {
              name: s5Name,
              value: params.find(p => p.seriesName === s5Name).value || 0,
              color: s5Color,
            },
          ]

          items.forEach(item => {
            const marker = `<span style="display:inline-block;margin-right:4px;width:10px;height:10px;border-radius:50%;background-color:${item.color};"></span>`
            result += `${marker}${item.name}: ${fm(item.value)}<br/>`
          })
        }
        // 第二個圖表的數據
        else {
          const items = [
            {
              name: d1Name,
              value: params.find(p => p.seriesName === d1Name).value || 0,
              color: d1Color,
            },
            {
              name: d2Name,
              value: params.find(p => p.seriesName === d2Name).value || 0,
              color: d2Color,
            },
            {
              name: d3Name,
              value: params.find(p => p.seriesName === d3Name).value || 0,
              color: d3Color,
            },
          ]

          items.forEach(item => {
            const marker = `<span style="display:inline-block;margin-right:4px;width:10px;height:10px;border-radius:50%;background-color:white;border:2px solid ${item.color};"></span>`
            result += `${marker}${item.name}: ${fm(item.value)}<br/>`
          })
        }

        return result
      },
    },
    legend: [
      {
        show: true,
        top: '5%',
        left: 'center',
        itemWidth: 25,
        itemHeight: 14,
        textStyle: {
          fontSize: 12,
        },
        data: [
          { name: s1Name },
          { name: s2Name },
          { name: s3Name },
          { name: s4Name },
          { name: s5Name },
        ],
      },
      {
        show: true,
        top: '52%', // 第二個圖表的圖例位置
        left: 'center',
        itemWidth: 25,
        itemHeight: 14,
        textStyle: {
          fontSize: 12,
        },
        data: [{ name: d1Name }, { name: d2Name }, { name: d3Name }],
      },
    ],
    xAxis: [
      {
        type: 'category',
        data: xAxisData,
        axisLabel: {
          rotate: 0,
          fontSize: 14,
        },
        gridIndex: 0,
      },
      {
        type: 'category',
        data: xAxisData,
        axisLabel: {
          rotate: 0,
          fontSize: 14,
        },
        gridIndex: 1,
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: '進度百分比(%)',
        position: 'left',
        axisLine: {
          show: true,
        },
        axisLabel: {
          formatter: value => formatNumber(value),
          fontSize: 14,
        },
        gridIndex: 0,
      },
      {
        type: 'value',
        name: '差異百分比(%)',
        position: 'left',
        axisLine: {
          show: true,
        },
        axisLabel: {
          formatter: value => formatNumber(value),
          fontSize: 14,
        },
        gridIndex: 1,
      },
    ],
    series: [
      {
        name: s1Name,
        type: 'line',
        data: s1Data,
        itemStyle: {
          color: s1Color,
        },
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          width: 3,
        },
        xAxisIndex: 0,
        yAxisIndex: 0,
      },
      {
        name: s2Name,
        type: 'line',
        data: s2Data,
        itemStyle: {
          color: s2Color,
        },
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          width: 3,
        },
        xAxisIndex: 0,
        yAxisIndex: 0,
      },
      {
        name: s3Name,
        type: 'line',
        data: s3Data,
        itemStyle: {
          color: s3Color,
        },
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          width: 3,
        },
        xAxisIndex: 0,
        yAxisIndex: 0,
      },
      {
        name: s4Name,
        type: 'line',
        data: s4Data,
        itemStyle: {
          color: s4Color,
        },
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          width: 3,
        },
        xAxisIndex: 0,
        yAxisIndex: 0,
      },
      {
        name: s5Name,
        type: 'line',
        data: s5Data,
        itemStyle: {
          color: s5Color,
        },
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          width: 3,
        },
        xAxisIndex: 0,
        yAxisIndex: 0,
      },
      {
        name: d1Name,
        type: 'line',
        data: d1Data,
        itemStyle: {
          color: d1Color,
        },
        symbolSize: 8,
        lineStyle: {
          width: 3,
        },
        xAxisIndex: 1,
        yAxisIndex: 1,
      },
      {
        name: d2Name,
        type: 'line',
        data: d2Data,
        itemStyle: {
          color: d2Color,
        },
        symbolSize: 8,
        lineStyle: {
          width: 3,
        },
        xAxisIndex: 1,
        yAxisIndex: 1,
      },
      {
        name: d3Name,
        type: 'line',
        data: d3Data,
        itemStyle: {
          color: d3Color,
        },
        symbolSize: 8,
        lineStyle: {
          width: 3,
        },
        xAxisIndex: 1,
        yAxisIndex: 1,
      },
    ],
    grid: [
      {
        top: '13%',
        bottom: '55%',
        left: '3%',
        right: '3%',
        containLabel: true,
      },
      { containLabel: true, left: '3%', right: '3%', top: '60%', bottom: '8%' },
    ],
    dataZoom: [
      {
        type: 'slider',
        xAxisIndex: [0, 1], // 控制兩個 x 軸
        startValue: xAxisData[Math.max(0, xAxisData.length - 12)],
        endValue: xAxisData[xAxisData.length - 1],
        bottom: 17,
      },
      {
        type: 'inside',
        xAxisIndex: [0, 1], // 控制兩個 x 軸
        startValue: xAxisData[Math.max(0, xAxisData.length - 12)],
        endValue: xAxisData[xAxisData.length - 1],
      },
    ],
  }

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
    </div>
  )
}
