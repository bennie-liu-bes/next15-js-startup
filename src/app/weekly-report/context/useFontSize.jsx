'use client'

import { useState, useEffect, useContext, createContext } from 'react'

const FontSizeContext = createContext()

// 定義常數
const DEFAULT_FONT_SIZE = 1.25
const FONT_SIZE_KEY = 'weeklyReport_fontSize'
const DEFAULT_FONT_SIZE_ALT = 0.9
const FONT_SIZE_ALT_KEY = 'weeklyReport_fontSizeAlt'
const DEFAULT_BOTTOM_LINE = false
const BOTTOM_LINE_KEY = 'weeklyReport_bottomLine'
const DEFAULT_BG_COLOR = true
const BG_COLOR_KEY = 'weeklyReport_bgColor'

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

  const [bottomLine, setBottomLine] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedBottomLine = localStorage.getItem(BOTTOM_LINE_KEY)
      return savedBottomLine ? savedBottomLine === 'true' : DEFAULT_BOTTOM_LINE
    }
    return DEFAULT_BOTTOM_LINE
  })

  const [bgColor, setBgColor] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedBgColor = localStorage.getItem(BG_COLOR_KEY)
      return savedBgColor ? savedBgColor === 'true' : DEFAULT_BG_COLOR
    }
    return DEFAULT_BG_COLOR
  })

  // 當 fontSize 改變時，儲存到 localStorage
  useEffect(() => {
    localStorage.setItem(FONT_SIZE_KEY, fontSize.toString())
  }, [fontSize])

  // 當 fontSizeAlt 改變時，儲存到 localStorage
  useEffect(() => {
    localStorage.setItem(FONT_SIZE_ALT_KEY, fontSizeAlt.toString())
  }, [fontSizeAlt])

  useEffect(() => {
    localStorage.setItem(BOTTOM_LINE_KEY, bottomLine.toString())
  }, [bottomLine])

  useEffect(() => {
    localStorage.setItem(BG_COLOR_KEY, bgColor.toString())
  }, [bgColor])

  return (
    <FontSizeContext.Provider
      value={{
        fontSize,
        setFontSize,
        fontSizeAlt,
        setFontSizeAlt,
        bottomLine,
        setBottomLine,
        bgColor,
        setBgColor,
      }}
    >
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
