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
  if (!number || isNaN(number)) return '-'
  return new Intl.NumberFormat('zh-TW', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number)
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
