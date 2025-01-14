'use client'

import ReactECharts from 'echarts-for-react'
import { fmNoUnit, toTWDate3, fmThousand } from '@/utils/fm'

export default function MonthlyPlot2({ data }) {
  // 過濾掉 REVENUE_LISTED_BUT_NOT_PRICED_AMT 為 null 的資料
  data = data.filter(item => item.REVENUE_LISTED_BUT_NOT_PRICED_AMT !== null)
  // 準備圖表數據
  const xAxisData = data.map(item => toTWDate3(item.CALENDAR_DATE.substring(0, 7).replace('/', '')))
  const yAxisData = data.map(item => item.REVENUE_LISTED_BUT_NOT_PRICED_AMT)

  // 圖表配置
  const option = {
    title: {
      text: '已列入營收未計價金額',
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
        const items = [{ name: '金額', value: accumulatedActual, color: '#33658a', type: 'rect' }]

        // 將每個項目加入到 result 中
        items.forEach(item => {
          let marker = ''
          if (item.type) {
            const markerStyle = item.type === 'rect' ? 'border-radius: 2px;' : 'border-radius: 50%;'
            marker = `<span style="display:inline-block;margin-right:4px;width:10px;height:10px;${markerStyle}background-color:${item.color};"></span>`
          }

          const valueStyle = item.style ? `style="${item.style}"` : ''
          result += `${marker}${item.name}: <span ${valueStyle}>${fmThousand(item.value / 1000)}</span><br/>`
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
        name: '金額(仟元)',
        position: 'left',
        axisLine: {
          show: true,
        },
        axisLabel: {
          formatter: value => fmNoUnit(value / 1000),
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
      // {
      //   type: 'inside',
      //   startValue: xAxisData[Math.max(0, xAxisData.length - 12)],
      //   endValue: xAxisData[xAxisData.length - 1],
      // },
    ],
  }

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
    </div>
  )
}
