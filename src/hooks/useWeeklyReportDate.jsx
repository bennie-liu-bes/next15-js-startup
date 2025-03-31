import { useState } from 'react'
import { getCurrentDateWithWeekNumber } from '@/utils/fm'
export function useWeeklyReportDate() {
  const [selectedDate, setSelectedDate] = useState('')

  const handleDateChange = event => {
    setSelectedDate(event.target.value)
  }

  const setDefaultDate = dates => {
    if (dates && dates.length > 0 && !selectedDate) {
      let targetDate = getCurrentDateWithWeekNumber(dates)

      setSelectedDate(targetDate || dates[0].CALENDAR_DATE)
    }
  }

  return { selectedDate, handleDateChange, setDefaultDate }
}
