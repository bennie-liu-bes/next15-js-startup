import { useState } from 'react'

export function useWeeklyReportDate() {
  const [selectedDate, setSelectedDate] = useState('')

  const handleDateChange = event => {
    setSelectedDate(event.target.value)
  }

  const setDefaultDate = dates => {
    if (dates && dates.length > 0 && !selectedDate) {
      setSelectedDate(dates[0].CALENDAR_DATE)
    }
  }

  return { selectedDate, handleDateChange, setDefaultDate }
}
