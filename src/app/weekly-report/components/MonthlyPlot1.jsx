'use client'

import ReactECharts from 'echarts-for-react'
import { toTWDate3, toTWDate4, fm2Percent, formatNumber } from '@/utils/fm'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
export default function MonthlyPlot1({ data }) {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.down('sm'))

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
    now.setMonth(now.getMonth() - 1 + 1)
    return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`
  }

  const getStartYearMonth = () => {
    const now = new Date()
    // 從上個月開始往回推11個月（總共12個月）
    now.setMonth(now.getMonth() - 12 + 1)
    return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`
  }

  const s1Data = data.map(item => item.CONSTRUCTION_PERCENT)

  const s2Data = data.map(item => item.EXP_CUMSUM_PERCENT)

  const s3Data = data.map(item => item.ACT_CUMSUM_PERCENT)

  const s4Data = data.map(item => item.REVENUE_PERCENT)

  const s5Data = data.map(item => item.VALUATION_PERCENT)

  const d1Data = data.map(item => item.ACT_CUMSUM_PERCENT_AND_EXP_CUMSUM_PERCENT_DIFF)

  const d2Data = data.map(item => item.ACT_CUMSUM_PERCENT_AND_REVENUE_PERCENT_DIFF)

  const d3Data = data.map(item => item.REVENUE_PERCENT_AND_VALUATION_PERCENT_DIFF)

  const s1Color = '#FF6666'
  const s2Color = '#66B266'
  const s3Color = '#A982C6'
  const s4Color = '#66A9D9'
  const s5Color = '#FFC966'
  const d1Color = '#66B266'
  const d2Color = '#66A9D9'
  const d3Color = '#FFC966'

  const s1Name = '累計工期進度'
  const s2Name = '累計預定進度'
  const s3Name = '累計實際進度'
  const s4Name = '累計營收進度'
  const s5Name = '累計計價進度'
  const d1Name = '累計實際進度-預定進度'
  const d2Name = '累計實際進度-營收進度'
  const d3Name = '累計營收進度-計價進度'

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
        const index = xAxisData.indexOf(params[0].axisValue)
        const calendarDate = data[index].CALENDAR_DATE
        let result = toTWDate4(calendarDate) + '<br/>'

        // 檢查是否有第一個圖表的數據（通過檢查任一第一個圖表的系列是否存在）
        const hasFirstChartData = params.some(p =>
          [s1Name, s2Name, s3Name, s4Name, s5Name].includes(p.seriesName)
        )

        // 檢查是否有第二個圖表的數據
        const hasSecondChartData = params.some(p => [d1Name, d2Name, d3Name].includes(p.seriesName))

        // 處理第一個圖表的數據
        if (hasFirstChartData) {
          const items = [
            {
              name: s1Name,
              value: params.find(p => p.seriesName === s1Name)?.value,
              color: s1Color,
            },
            {
              name: s2Name,
              value: params.find(p => p.seriesName === s2Name)?.value,
              color: s2Color,
            },
            {
              name: s3Name,
              value: params.find(p => p.seriesName === s3Name)?.value,
              color: s3Color,
            },
            {
              name: s4Name,
              value: params.find(p => p.seriesName === s4Name)?.value,
              color: s4Color,
            },
            {
              name: s5Name,
              value: params.find(p => p.seriesName === s5Name)?.value,
              color: s5Color,
            },
          ]

          items.forEach(item => {
            if (item.value !== undefined) {
              const marker = `<span style="display:inline-block;margin-right:4px;width:10px;height:10px;border-radius:50%;background-color:${item.color};"></span>`
              result += `${marker}${item.name}: ${fm2Percent(item.value)}<br/>`
            }
          })
        }

        // 處理第二個圖表的數據
        if (hasSecondChartData) {
          const items = [
            {
              name: d1Name,
              value: params.find(p => p.seriesName === d1Name)?.value,
              color: d1Color,
            },
            {
              name: d2Name,
              value: params.find(p => p.seriesName === d2Name)?.value,
              color: d2Color,
            },
            {
              name: d3Name,
              value: params.find(p => p.seriesName === d3Name)?.value,
              color: d3Color,
            },
          ]

          items.forEach(item => {
            if (item.value !== undefined) {
              const marker = `<span style="display:inline-block;margin-right:4px;width:10px;height:10px;border-radius:50%;background-color:white;border:2px solid ${item.color};"></span>`
              result += `${marker}${item.name}: ${fm2Percent(item.value)}<br/>`
            }
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
        top: isXs ? '18%' : '13%',
        bottom: '55%',
        left: isXs ? '6%' : '3%',
        right: isXs ? '3%' : '3%',
        containLabel: true,
      },
      {
        containLabel: true,
        top: isXs ? '65%' : '60%',
        bottom: '8%',
        left: isXs ? '6%' : '3%',
        right: isXs ? '3%' : '3%',
      },
    ],
    dataZoom: [
      {
        type: 'slider',
        xAxisIndex: [0, 1], // 控制兩個 x 軸
        startValue: getStartYearMonth(),
        endValue: getCurrentYearMonth(),
        bottom: 17,
        labelFormatter: function (value) {
          // 將 YYYYMM 格式轉換為 YYYY年MM月
          return xAxisLabel[value]
        },
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
