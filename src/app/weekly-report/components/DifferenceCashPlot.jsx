'use client'

import ReactECharts from 'echarts-for-react'
import { fm, toTWDate3, formatNumber } from '@/utils/fm'

export default function DifferenceCashPlot({ data }) {
  // 準備圖表數據
  const xAxisData = data.map(item => toTWDate3(item.YM))
  const yAxisData = data.map(item => item.AAGBAMT)

  // 圖表配置
  const option = {
    title: {
      text: '累計現金收支差異',
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
        let result = params[0].axisValueLabel + '<br/>'

        // 找出對應的數值
        const accumulatedActual = params.find(p => p.seriesName === '累計金額').value || 0

        // 按照指定順序組織顯示內容
        const items = [
          { name: '累計金額', value: accumulatedActual, color: '#33658a', type: 'rect' },
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
      show: false,
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
      axisLabel: {
        rotate: 0,
        fontSize: 14,
      },
    },
    yAxis: [
      {
        type: 'value',
        name: '金額(元)',
        position: 'left',
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
        name: '累計金額', // 預定放在下面（先渲染）
        type: 'bar',
        data: yAxisData,
        itemStyle: {
          color: '#33658a', // 橘色
        },
      },
    ],
    grid: {
      containLabel: true,
      left: '3%',
      right: '3%',
      bottom: '15%',
      top: '15%',
    },
    dataZoom: [
      {
        type: 'slider',
        startValue: xAxisData[Math.max(0, xAxisData.length - 12)],
        endValue: xAxisData[xAxisData.length - 1],
      },
      {
        type: 'inside',
        startValue: xAxisData[Math.max(0, xAxisData.length - 12)],
        endValue: xAxisData[xAxisData.length - 1],
      },
    ],
  }

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
    </div>
  )
}
