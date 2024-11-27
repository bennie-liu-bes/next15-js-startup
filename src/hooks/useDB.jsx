import { useMemo, useState, useEffect } from 'react'

export function useDB(ordNo, selectedDate) {
  const [rawData, setRawData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // 初始化空資料結構
  const emptyData = {
    wkWeeklyDate: [],
    wkMain: [],
    wkMainHelp: [],
    wkWeekly: [],
    wkWeeklyCustomize: [],
    wkMonthly: [],
    wkDifference: [],
    wkDifferenceCash: [],
    wkRevenue: [],
    wkMilestone: [],
    wkFile: [],
    wkCriticalpathCco: [],
    wkTodo: [],
    wkTodoB: [],
    wkTrack: [],
    wkRegulatoryTrack: [],
    wkControversialCases: [],
    wkComControl: [],
  }

  useEffect(() => {
    async function fetchData() {
      if (!ordNo || ordNo.startsWith('error:')) {
        setError(ordNo)
        return
      }

      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 3000))
      setError(null)

      try {
        const response = await fetch(`/api/db?ordNo=${ordNo}`)
        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.message || '資料獲取失敗')
        }

        if (result.error) {
          throw new Error(result.error)
        }

        setRawData(result)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [ordNo])

  const data = useMemo(() => {
    if (!rawData) return emptyData
    if (!selectedDate) return { ...rawData } // 如果沒有選擇日期，返回所有資料

    return {
      wkWeeklyDate: rawData.wkWeeklyDate,
      wkMain: rawData.wkMain.filter(item => item.WK_DATA === selectedDate),
      wkMainHelp: rawData.wkMainHelp.filter(item => item.CALENDAR_DATE === selectedDate),
      wkWeekly: rawData.wkWeekly.filter(item => item.CALENDAR_DATE === selectedDate),
      wkWeeklyCustomize: rawData.wkWeeklyCustomize.filter(
        item => item.CALENDAR_DATE === selectedDate
      ),
      wkMonthly: rawData.wkMonthly.filter(item => item.CALENDAR_DATE === selectedDate),
      wkDifference: rawData.wkDifference.filter(item => item.CALENDAR_DATE === selectedDate),
      wkDifferenceCash: rawData.wkDifferenceCash.filter(
        item => item.CALENDAR_DATE === selectedDate
      ),
      wkRevenue: rawData.wkRevenue.filter(item => item.CALENDAR_DATE === selectedDate),
      wkMilestone: rawData.wkMilestone.filter(item => item.CALENDAR_DATE === selectedDate),
      wkFile: rawData.wkFile.filter(item => item.CALENDAR_DATE === selectedDate),
      wkCriticalpathCco: rawData.wkCriticalpathCco.filter(
        item => item.CALENDAR_DATE === selectedDate
      ),
      wkTodo: rawData.wkTodo.filter(item => item.CALENDAR_DATE === selectedDate),
      wkTodoB: rawData.wkTodoB.filter(item => item.CALENDAR_DATE === selectedDate),
      wkTrack: rawData.wkTrack.filter(item => item.CALENDAR_DATE === selectedDate),
      wkRegulatoryTrack: rawData.wkRegulatoryTrack.filter(
        item => item.CALENDAR_DATE === selectedDate
      ),
      wkControversialCases: rawData.wkControversialCases.filter(
        item => item.CALENDAR_DATE === selectedDate
      ),
      wkComControl: rawData.wkComControl.filter(item => item.CALENDAR_DATE === selectedDate),
    }
  }, [rawData, selectedDate])

  return { data, loading, error }
}
