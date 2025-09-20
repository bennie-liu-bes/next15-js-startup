'use client'

import { useMemo } from 'react'

import { Box, Grid2 } from '@mui/material'

import MetricCard from './MetricCard'

/**
 * 指標卡片容器組件
 * @param {Object} props
 * @param {Array} props.data - 保固數據陣列
 * @param {string} props.siteFilter - 當前的工務所篩選條件
 */
export default function MetricCards({ data = [], siteFilter = '' }) {
  // 根據篩選條件過濾數據
  const filteredData = useMemo(() => {
    if (!siteFilter) return data
    return data.filter(row => row.SITE_CNAME === siteFilter)
  }, [data, siteFilter])

  // 計算總體統計數據
  const overallStats = useMemo(() => {
    const totalCount = filteredData.length
    const expiredCount = filteredData.filter(row => row.IS_EXPIRED === 'Y').length
    const totalAmount = filteredData.reduce((sum, row) => {
      const amount = parseFloat(row.ENSURE_AMOUNT || 0)
      return sum + (isNaN(amount) ? 0 : amount)
    }, 0)
    const expiredAmount = filteredData
      .filter(row => row.IS_EXPIRED === 'Y')
      .reduce((sum, row) => {
        const amount = parseFloat(row.ENSURE_AMOUNT || 0)
        return sum + (isNaN(amount) ? 0 : amount)
      }, 0)

    return {
      count: { expired: expiredCount, total: totalCount },
      amount: { expired: expiredAmount, total: totalAmount },
    }
  }, [filteredData])

  // 計算各保固金種類的統計數據
  const ensureTypeStats = useMemo(() => {
    const ensureTypes = ['定存單', '現金', '保證書', '切結書']

    return ensureTypes.map(type => {
      const typeData = filteredData.filter(row => row.ENSURE_CH === type)
      const expiredTypeData = typeData.filter(row => row.IS_EXPIRED === 'Y')

      // 筆數統計
      const totalCount = typeData.length
      const expiredCount = expiredTypeData.length

      // 金額統計
      const totalAmount = typeData.reduce((sum, row) => {
        const amount = parseFloat(row.ENSURE_AMOUNT || 0)
        return sum + (isNaN(amount) ? 0 : amount)
      }, 0)
      const expiredAmount = expiredTypeData.reduce((sum, row) => {
        const amount = parseFloat(row.ENSURE_AMOUNT || 0)
        return sum + (isNaN(amount) ? 0 : amount)
      }, 0)

      return {
        type,
        count: { expired: expiredCount, total: totalCount },
        amount: { expired: expiredAmount, total: totalAmount },
      }
    })
  }, [filteredData])

  return (
    <Box sx={{ mb: 2 }}>
      {/* 指標卡片網格 - 響應式設計 */}
      <Grid2 container spacing={2}>
        {/* 第一張卡片：總體統計 */}
        <Grid2 xs={12} sm={6} md={4} lg={2.4} xl={2.4}>
          <MetricCard
            title="整體保固狀況"
            countData={overallStats.count}
            amountData={overallStats.amount}
            showIcon={true}
            sx={{ height: '100%', width: '100%' }}
          />
        </Grid2>

        {/* 第二到五張卡片：各保固金種類 */}
        {ensureTypeStats.map(stat => (
          <Grid2 xs={12} sm={6} md={4} lg={2.4} xl={2.4} key={stat.type}>
            <MetricCard
              title={null}
              countData={stat.count}
              amountData={stat.amount}
              ensureType={stat.type}
              sx={{ height: '100%', width: '100%' }}
            />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  )
}
