'use client'

import ReactECharts from 'echarts-for-react'
import { fm, toTWDate3, formatNumber } from '@/utils/fm'

export default function RevenuePlot({ data }) {
  // 準備圖表數據
  const xAxisData = data.map(item => item.YM)
  const xAxisLabel = data.map(item => toTWDate3(item.YM))
  const aagbamtData = data.map(item => item.AAGBAMT)
  const bagbamtData = data.map(item => item.BAGBAMT)
  const aayamtData = data.map(item => item.AAYAMT)
  const bayamtData = data.map(item => item.BAYAMT)

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

  // 圖表配置
  const option = {
    title: {
      text: '預定營收與實際營收比較',
      left: 'center',
      textStyle: {
        fontSize: 24,
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter: function (params) {
        // 取得年月標籤
        let result = toTWDate3(params[0].axisValueLabel) + '<br/>'

        // 找出對應的數值
        const monthlyBudget = params.find(p => p.seriesName === '單月預定')?.value || 0
        const monthlyActual = params.find(p => p.seriesName === '單月實際')?.value || 0
        const accumulatedBudget = params.find(p => p.seriesName === '累計預定')?.value || 0
        const accumulatedActual = params.find(p => p.seriesName === '累計實際')?.value || 0

        // 計算差異值
        const monthlyDiff = monthlyActual - monthlyBudget
        const accumulatedDiff = accumulatedActual - accumulatedBudget

        // 創建差異值的顏色顯示
        const getDiffColor = diff => diff < 0 && 'color: #ff4d4f'

        // 按照指定順序組織顯示內容
        const items = [
          { name: '單月預定', value: monthlyBudget, color: '#33658a', type: 'rect' },
          { name: '單月實際', value: monthlyActual, color: '#f6ae2d', type: 'rect' },
          {
            name: '單月差異',
            value: monthlyDiff,
            color: '#fff',
            type: 'rect',
            style: getDiffColor(monthlyDiff),
          },
          { name: '累計預定', value: accumulatedBudget, color: '#2f4858', type: 'circle' },
          { name: '累計實際', value: accumulatedActual, color: '#f26419', type: 'circle' },
          {
            name: '累計差異',
            value: accumulatedDiff,
            color: '#fff',
            type: 'circle',
            style: getDiffColor(accumulatedDiff),
          },
        ]

        // 將每個項目加入到 result 中
        items.forEach(item => {
          let marker = ''
          if (item.type) {
            const markerStyle = item.type === 'rect' ? 'border-radius: 2px;' : 'border-radius: 50%;'
            marker = `<span style="display:inline-block;margin-right:4px;width:10px;height:10px;${markerStyle}background-color:${item.color};"></span>`
          }

          const valueStyle = item.style ? `style="${item.style}"` : ''
          result += `${marker}${item.name}: <span ${valueStyle}>${fm(item.value)}</span><br/>`
        })

        return result
      },
    },
    legend: {
      data: [
        {
          name: '單月預定',
        },
        {
          name: '單月實際',
        },
        {
          name: '累計預定',
        },
        {
          name: '累計實際',
        },
      ],
      top: '30px',
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
      axisLabel: {
        rotate: 0,
        fontSize: 14,
        formatter: value => toTWDate3(value),
      },
    },
    yAxis: [
      {
        type: 'value',
        name: '單月金額(元)',
        position: 'left',
        axisLine: {
          show: true,
        },
        axisLabel: {
          formatter: value => formatNumber(value),
          fontSize: 14,
        },
      },
      {
        type: 'value',
        name: '累計金額(元)',
        position: 'right',
        axisLine: {
          show: true,
        },
        axisLabel: {
          formatter: value => formatNumber(value),
          fontSize: 14,
        },
      },
    ],
    series: [
      {
        name: '單月預定', // 預定放在下面（先渲染）
        type: 'bar',
        data: bagbamtData,
        itemStyle: {
          color: '#33658a', // 橘色
        },
        barWidth: '40%', // 寬度
        z: 1, // 較低的層級
      },
      {
        name: '單月實際',
        type: 'bar',
        data: aagbamtData,
        itemStyle: {
          color: '#f6ae2d', // 藍色
          borderRadius: [20, 20, 0, 0],
        },
        barWidth: '20%', // 相同寬度
        z: 2, // 較高的層級
        barGap: '-76%', // 調整這個值來使兩個柱狀圖的中心重疊
      },
      {
        name: '累計預定',
        type: 'line',
        yAxisIndex: 1,
        data: bayamtData,
        itemStyle: {
          color: '#2f4858',
        },
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          width: 3,
        },
      },
      {
        name: '累計實際',
        type: 'line',
        yAxisIndex: 1,
        data: aayamtData,
        itemStyle: {
          color: '#f26419',
        },
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          width: 3,
        },
      },
    ],
    grid: {
      containLabel: true,
      left: '3%',
      right: '3%',
      bottom: '10%',
      top: '16%',
    },
    dataZoom: [
      {
        type: 'slider',
        startValue: getStartYearMonth(),
        endValue: getCurrentYearMonth(),
      },
      // {
      //   type: 'inside',
      //   startValue: xAxisData[Math.max(0, xAxisData.length - 12)],
      //   endValue: xAxisData[xAxisData.length - 1],
      // },
    ],
  }

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
    </div>
  )
}
