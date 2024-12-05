'use client'

import { useState, useEffect, useContext, createContext } from 'react'

const FontSizeContext = createContext()

// 定義常數
const DEFAULT_FONT_SIZE = 1.25
const FONT_SIZE_KEY = 'weeklyReport_fontSize'
const DEFAULT_FONT_SIZE_ALT = 0.9
const FONT_SIZE_ALT_KEY = 'weeklyReport_fontSizeAlt'

export function FontSizeProvider({ children }) {
  // 從 localStorage 讀取儲存的值，如果沒有則使用預設值
  const [fontSize, setFontSize] = useState(() => {
    // 由於這是 client component，我們需要確保 localStorage 的存取是在客戶端執行
    if (typeof window !== 'undefined') {
      const savedSize = localStorage.getItem(FONT_SIZE_KEY)
      return savedSize ? parseFloat(savedSize) : DEFAULT_FONT_SIZE
    }
    return DEFAULT_FONT_SIZE
  })

  const [fontSizeAlt, setFontSizeAlt] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedSize = localStorage.getItem(FONT_SIZE_ALT_KEY)
      return savedSize ? parseFloat(savedSize) : DEFAULT_FONT_SIZE_ALT
    }
    return DEFAULT_FONT_SIZE_ALT
  })

  // 當 fontSize 改變時，儲存到 localStorage
  useEffect(() => {
    localStorage.setItem(FONT_SIZE_KEY, fontSize.toString())
  }, [fontSize])

  // 當 fontSizeAlt 改變時，儲存到 localStorage
  useEffect(() => {
    localStorage.setItem(FONT_SIZE_ALT_KEY, fontSizeAlt.toString())
  }, [fontSizeAlt])

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize, fontSizeAlt, setFontSizeAlt }}>
      {children}
    </FontSizeContext.Provider>
  )
}

export function useFontSize() {
  const context = useContext(FontSizeContext)
  if (!context) {
    throw new Error('useFontSize must be used within a FontSizeProvider')
  }
  return context
}
