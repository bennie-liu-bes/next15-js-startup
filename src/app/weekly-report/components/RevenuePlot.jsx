'use client'

import ReactECharts from 'echarts-for-react'
import { fm, toTWDate3, formatNumber } from '@/utils/fm'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
export default function RevenuePlot({ data }) {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.down('sm'))
  // 準備圖表數據
  const xAxisData = data.map(item => item.YM)
  const xAxisLabel = data.map(item => toTWDate3(item.YM))
  const aagbamtData = data.map(item => item.AAGBAMT)
  const bagbamtData = data.map(item => item.BAGBAMT)
  const aayamtData = data.map(item => item.AAYAMT)
  const bayamtData = data.map(item => item.BAYAMT)
  const aagbamtCumsumData = data.map(item => item.AAGBAMT_CUMSUM)
  const bagbamtCumsumData = data.map(item => item.BAGBAMT_CUMSUM)

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

        // 檢查是否有月度數據
        const hasMonthlyData = params.some(p =>
          ['單月預定營收', '單月實際營收'].includes(p.seriesName)
        )

        // 檢查是否有年度累計數據
        const hasYearlyData = params.some(p =>
          ['年度累計預定營收', '年度累計實際營收'].includes(p.seriesName)
        )

        // 檢查是否有累計數據
        const hasTotalData = params.some(p =>
          ['累計預定營收', '累計實際營收'].includes(p.seriesName)
        )

        // 處理月度數據
        if (hasMonthlyData) {
          const monthlyItems = [
            {
              name: '單月預定營收',
              value: params.find(p => p.seriesName === '單月預定營收')?.value,
              color: '#33658a',
              type: 'rect',
            },
            {
              name: '單月實際營收',
              value: params.find(p => p.seriesName === '單月實際營收')?.value,
              color: '#f6ae2d',
              type: 'rect',
            },
          ]

          monthlyItems.forEach(item => {
            if (item.value !== undefined) {
              const marker = `<span style="display:inline-block;margin-right:4px;width:10px;height:10px;border-radius:2px;background-color:${item.color};"></span>`
              result += `${marker}${item.name}: ${fm(item.value)}<br/>`
            }
          })

          // 如果兩個月度數據都有，才顯示差異
          if (monthlyItems[0].value !== undefined && monthlyItems[1].value !== undefined) {
            const diff = monthlyItems[1].value - monthlyItems[0].value
            const diffColor = diff < 0 ? 'color: #ff4d4f' : ''
            const marker = `<span style="display:inline-block;margin-right:4px;width:10px;height:10px;border-radius:2px;background-color:#fff;"></span>`
            result += `${marker}單月營收差異: <span style="${diffColor}">${fm(diff)}</span><br/>`
          }
        }

        // 處理年度累計數據
        if (hasYearlyData) {
          const yearlyItems = [
            {
              name: '年度累計預定營收',
              value: params.find(p => p.seriesName === '年度累計預定營收')?.value,
              color: '#2f4858',
              type: 'circle',
            },
            {
              name: '年度累計實際營收',
              value: params.find(p => p.seriesName === '年度累計實際營收')?.value,
              color: '#f26419',
              type: 'circle',
            },
          ]

          yearlyItems.forEach(item => {
            if (item.value !== undefined) {
              const marker = `<span style="display:inline-block;margin-right:4px;width:10px;height:10px;border-radius:50%;background-color:${item.color};"></span>`
              result += `${marker}${item.name}: ${fm(item.value)}<br/>`
            }
          })

          // 如果兩個年度累計數據都有，才顯示差異
          if (yearlyItems[0].value !== undefined && yearlyItems[1].value !== undefined) {
            const diff = yearlyItems[1].value - yearlyItems[0].value
            const diffColor = diff < 0 ? 'color: #ff4d4f' : ''
            const marker = `<span style="display:inline-block;margin-right:4px;width:10px;height:10px;border-radius:50%;background-color:#fff;"></span>`
            result += `${marker}年度累計營收差異: <span style="${diffColor}">${fm(diff)}</span><br/>`
          }
        }

        // 處理累計數據
        if (hasTotalData) {
          const totalItems = [
            {
              name: '累計預定營收',
              value: params.find(p => p.seriesName === '累計預定營收')?.value,
              color: '#2f4858',
            },
            {
              name: '累計實際營收',
              value: params.find(p => p.seriesName === '累計實際營收')?.value,
              color: '#f26419',
            },
          ]

          totalItems.forEach(item => {
            if (item.value !== undefined) {
              const marker = `<span style="display:inline-block;margin-right:4px;width:10px;height:10px;border-radius:50%;background-color:white;border:2px solid ${item.color};"></span>`
              result += `${marker}${item.name}: ${fm(item.value)}<br/>`
            }
          })

          // 如果兩個累計數據都有，才顯示差異
          if (totalItems[0].value !== undefined && totalItems[1].value !== undefined) {
            const diff = totalItems[1].value - totalItems[0].value
            const diffColor = diff < 0 ? 'color: #ff4d4f' : ''
            const marker = `<span style="display:inline-block;margin-right:4px;width:10px;height:10px;border-radius:50%;background-color:white;border:2px solid #fff;"></span>`
            result += `${marker}累計營收差異: <span style="${diffColor}">${fm(diff)}</span><br/>`
          }
        }

        return result
      },
    },
    legend: {
      data: [
        {
          name: '單月預定營收',
        },
        {
          name: '單月實際營收',
        },
        {
          name: '年度累計預定營收',
        },
        {
          name: '年度累計實際營收',
        },
        {
          name: '累計預定營收',
        },
        {
          name: '累計實際營收',
        },
      ],
      top: '30px',
      selected: {
        單月預定營收: true,
        單月實際營收: true,
        年度累計預定營收: true,
        年度累計實際營收: true,
        累計預定營收: false,
        累計實際營收: false,
      },
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
        name: '單月預定營收', // 預定放在下面（先渲染）
        type: 'bar',
        data: bagbamtData,
        itemStyle: {
          color: '#33658a', // 橘色
        },
        barWidth: '40%', // 寬度
        z: 1, // 較低的層級
      },
      {
        name: '單月實際營收',
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
        name: '年度累計預定營收',
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
        name: '年度累計實際營收',
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
      {
        name: '累計預定營收',
        type: 'line',
        yAxisIndex: 1,
        data: bagbamtCumsumData,
        itemStyle: {
          color: '#2f4858',
        },
        symbolSize: 8,
        lineStyle: {
          width: 3,
        },
        label: {
          show: true,
          formatter: function (params) {
            // 只在每 3 個點顯示一次標籤
            if (params.dataIndex % 3 !== 0) {
              return ''
            }
            const value = params.value
            if (value >= 100000000) {
              return (value / 100000000).toFixed(1) + '億'
            } else {
              return (value / 10000).toFixed(1) + '萬'
            }
          },
          fontSize: 12,
          position: 'top',
        },
      },
      {
        name: '累計實際營收',
        type: 'line',
        yAxisIndex: 1,
        data: aagbamtCumsumData,
        itemStyle: {
          color: '#f26419',
        },
        symbolSize: 8,
        lineStyle: {
          width: 3,
        },
        label: {
          show: true,
          formatter: function (params) {
            // 只在每 3 個點顯示一次標籤
            if (params.dataIndex % 3 !== 0) {
              return ''
            }
            const value = params.value
            if (value >= 100000000) {
              return (value / 100000000).toFixed(1) + '億'
            } else {
              return (value / 10000).toFixed(1) + '萬'
            }
          },
          fontSize: 12,
          position: 'top',
        },
      },
    ],
    grid: {
      containLabel: true,
      top: isXs ? '22%' : '16%',
      bottom: '10%',
      left: isXs ? '2%' : '3%',
      right: isXs ? '2%' : '3%',
    },
    dataZoom: [
      {
        type: 'slider',
        startValue: getStartYearMonth(),
        endValue: getCurrentYearMonth(),
        labelFormatter: function (value) {
          // 將 YYYYMM 格式轉換為 YYYY年MM月
          return xAxisLabel[value]
        },
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
