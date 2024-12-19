'use client'

import ReactECharts from 'echarts-for-react'
import { fm2Percent, toTWDate3, toTWDate4, formatNumber } from '@/utils/fm'

export default function MonthlyPlot1({ data }) {
  data = data.sort((a, b) => new Date(a.CALENDAR_DATE) - new Date(b.CALENDAR_DATE))

  // 準備圖表數據
  const xAxisData = data.map(item => item.CALENDAR_DATE.substring(0, 7).replace('/', ''))
  const xAxisLabel = data.map(item =>
    toTWDate3(item.CALENDAR_DATE.substring(0, 7).replace('/', ''))
  )

  // 在 option 定義之前加入這段程式碼來計算日期範圍
  const getCurrentYearMonth = () => {
    const now = new Date()
    // 將日期設為上個月
    now.setMonth(now.getMonth() - 1)
    return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`
  }

  const getStartYearMonth = () => {
    const now = new Date()
    // 從上個月開始往回推11個月（總共12個月）
    now.setMonth(now.getMonth() - 12)
    return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`
  }

  const s1Data = data.map(item => item.CONSTRUCTION_PERCENT)

  const s2Data = data.map(item => item.EXP_CUMSUM_PERCENT)

  const s3Data = data.map(item => item.ACT_CUMSUM_PERCENT)

  const s4Data = data.map(item => 2)

  const s5Data = data.map(item => 1)

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
        // 使用對應索引的 CALENDAR_DATE
        const index = xAxisData.indexOf(params[0].axisValue)
        const calendarDate = data[index].CALENDAR_DATE
        let result = toTWDate4(calendarDate) + '<br/>'

        // 第一個圖表的數據
        if (params[0].componentIndex === 0) {
          const items = [
            {
              name: s1Name,
              value: params.find(p => p.seriesName === s1Name)?.value || 0,
              color: s1Color,
            },
            {
              name: s2Name,
              value: params.find(p => p.seriesName === s2Name)?.value || 0,
              color: s2Color,
            },
            {
              name: s3Name,
              value: params.find(p => p.seriesName === s3Name)?.value || 0,
              color: s3Color,
            },
            {
              name: s4Name,
              value: params.find(p => p.seriesName === s4Name)?.value || 0,
              color: s4Color,
            },
            {
              name: s5Name,
              value: params.find(p => p.seriesName === s5Name)?.value || 0,
              color: s5Color,
            },
          ]

          items.forEach(item => {
            const marker = `<span style="display:inline-block;margin-right:4px;width:10px;height:10px;border-radius:50%;background-color:${item.color};"></span>`
            result += `${marker}${item.name}: ${fm2Percent(item.value)}<br/>`
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
            result += `${marker}${item.name}: ${fm2Percent(item.value)}<br/>`
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
          formatter: value => toTWDate3(value),
        },
        gridIndex: 0,
      },
      {
        type: 'category',
        data: xAxisData,
        axisLabel: {
          rotate: 0,
          fontSize: 14,
          formatter: value => toTWDate3(value),
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
        startValue: getStartYearMonth(),
        endValue: getCurrentYearMonth(),
        bottom: 17,
      },
      // {
      //   type: 'inside',
      //   xAxisIndex: [0, 1], // 控制兩個 x 軸
      //   startValue: getStartYearMonth(),
      //   endValue: getCurrentYearMonth(),
      // },
    ],
  }

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
    </div>
  )
}
