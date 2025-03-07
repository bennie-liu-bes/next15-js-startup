// 格式化金額的函數
export const fm = number => {
  if (!number || isNaN(number)) return '-'
  return (
    new Intl.NumberFormat('zh-TW', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number) + '元'
  )
}

export const fmThousand = number => {
  if (!number || isNaN(number)) return '-'
  return (
    new Intl.NumberFormat('zh-TW', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number) + '仟元'
  )
}

export const fmNoUnit = number => {
  if (number === 0) return '0'
  if (!number || isNaN(number)) return '-'
  return new Intl.NumberFormat('zh-TW', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number)
}

// 格式化金額的函數(強制顯示小數2位)
export const fm2 = number => {
  if (number === 0) return 0.0
  if (!number || isNaN(number)) return '-'
  return new Intl.NumberFormat('zh-TW', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number)
}

// 格式化百分比的函數(強制顯示小數2位)
export const fm2Percent = number => {
  if (!number || isNaN(number)) return '-'
  return (
    new Intl.NumberFormat('zh-TW', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number) + '%'
  )
}

// 西元年轉民國年
export const toTWDate = dateStr => {
  if (!dateStr) return '-'
  const ifTrans = true

  try {
    // 檢查是否符合 yyyy/MM/dd 格式
    const datePattern = /^\d{4}\/\d{2}\/\d{2}$/
    if (!datePattern.test(dateStr)) return dateStr

    const [year, month, day] = dateStr.split('/')

    if (ifTrans) {
      const twYear = parseInt(year) - 1911
      return `${twYear}/${month}/${day}`
    }

    return dateStr
    // eslint-disable-next-line unused-imports/no-unused-vars
  } catch (error) {
    return '-'
  }
}

export const toTWDate2 = dateStr => {
  // 檢查是否有斷行符號
  if (dateStr.includes('\n')) {
    return dateStr
      .split('\n')
      .filter(date => date)
      .map(date => toTWDate(date))
      .join('\n')
  } else {
    return toTWDate(dateStr)
  }
}

export const toTWDate3 = dateStr => {
  if (!dateStr) return '-'
  const ifTrans = true

  try {
    // 檢查是否符合 yyyyMM 格式
    const datePattern = /^\d{4}\d{2}$/
    if (!datePattern.test(dateStr)) return dateStr

    const year = dateStr.substring(0, 4)
    const month = dateStr.substring(4, 6)

    if (ifTrans) {
      const twYear = parseInt(year) - 1911
      return `${twYear}年${month}月`
    }

    return dateStr
    // eslint-disable-next-line unused-imports/no-unused-vars
  } catch (error) {
    return '-'
  }
}

// 西元年轉民國年
export const toTWDate4 = dateStr => {
  if (!dateStr) return '-'
  const ifTrans = true

  try {
    // 檢查是否符合 yyyy/MM/dd 格式
    const datePattern = /^\d{4}\/\d{2}\/\d{2}$/
    if (!datePattern.test(dateStr)) return dateStr

    const [year, month, day] = dateStr.split('/')

    if (ifTrans) {
      const twYear = parseInt(year) - 1911
      return `${twYear}年${month}月${day}日`
    }

    return dateStr
    // eslint-disable-next-line unused-imports/no-unused-vars
  } catch (error) {
    return '-'
  }
}

// 西元年轉民國年
export const toTWDate5 = dateStr => {
  if (!dateStr) return '-'
  const ifTrans = true

  try {
    // 檢查是否符合 yyyy/MM/dd 格式
    const datePattern = /^\d{4}\/\d{2}$/
    if (!datePattern.test(dateStr)) return dateStr

    const [year, month] = dateStr.split('/')

    if (ifTrans) {
      const twYear = parseInt(year) - 1911
      return `${twYear}/${month}`
    }

    return dateStr
    // eslint-disable-next-line unused-imports/no-unused-vars
  } catch (error) {
    return '-'
  }
}

// 西元年轉民國年
export const toTWDate6 = str => {
  if (!str) return '-'
  try {
    // 使用正則表達式找出所有 20XX 年份
    const yearPattern = /20\d{2}/g

    // 替換所有符合的年份為民國年
    const result = str.replace(yearPattern, match => {
      const twYear = parseInt(match) - 1911
      return twYear.toString()
    })

    return result
  } catch (error) {
    return error
  }
}

// 格式化數字函數
export const formatNumber = value => {
  const absValue = Math.abs(value)
  if (absValue >= 100000000) {
    return (value / 100000000).toFixed(1) + '億'
  } else if (absValue >= 10000000) {
    return (value / 10000000).toFixed(0) + '千萬'
  } else if (absValue >= 1000000) {
    return (value / 1000000).toFixed(0) + '百萬'
  }
  return value.toString()
}

export const getDateWeek = date => {
  // 如果傳入的date是物件，則直接使用，否則創建一個新的日期物件
  const currentDate = typeof date === 'object' ? date : new Date()
  // 創建當年1月1日的日期物件
  const januaryFirst = new Date(currentDate.getFullYear(), 0, 1)
  // 計算1月1日到下一個星期天的天數
  const daysToNextSunday = januaryFirst.getDay() === 0 ? 0 : (7 - januaryFirst.getDay()) % 7
  // 創建下一個星期天的日期物件
  const nextSunday = new Date(
    currentDate.getFullYear(),
    0,
    januaryFirst.getDate() + daysToNextSunday
  )

  // 判斷當前日期是否小於下一個星期天
  if (currentDate < nextSunday) {
    // 如果小於，則返回1，表示當前日期在第一週
    return 1
  } else if (currentDate > nextSunday) {
    // 如果大於，則計算當前日期到下一個星期天的週數
    // 首先計算毫秒數，然後除以一天的毫秒數（86400000），再除以7（一週的天數），最後取整數
    const weeks = Math.ceil((currentDate - nextSunday) / (24 * 3600 * 1000) / 7) + 1
    // 返回週數
    return weeks
  } else {
    // 如果等於，則返回1，表示當前日期是下一個星期天
    return 1
  }
}

export const getCurrentDateWithWeekNumber = wkWeeklyDate => {
  const wkWeeklyDateWithWeekNumber = wkWeeklyDate.map(date => ({
    ...date,
    weekNumber: `${date.CALENDAR_DATE.split('/')[0]}-${getDateWeek(new Date(date.CALENDAR_DATE.replace(/\//g, '-')))}`,
  }))
  const currentDateWithWeekNumber = `${new Date().getFullYear()}-${getDateWeek(new Date())}`
  const wkWeeklyDateWithWeekNumberThisWeek = wkWeeklyDateWithWeekNumber.filter(
    date => date.weekNumber === currentDateWithWeekNumber
  )
  const wkWeeklyDateWithWeekNumberThisWeeklatestDate = wkWeeklyDateWithWeekNumberThisWeek.reduce(
    (prev, current) =>
      new Date(prev.CALENDAR_DATE) > new Date(current.CALENDAR_DATE) ? prev : current
  )
  let targetDate = wkWeeklyDateWithWeekNumberThisWeeklatestDate.CALENDAR_DATE
  return targetDate
}
