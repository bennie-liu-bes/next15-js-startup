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
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE)
  const [fontSizeAlt, setFontSizeAlt] = useState(DEFAULT_FONT_SIZE_ALT)
  const [bottomLine, setBottomLine] = useState(DEFAULT_BOTTOM_LINE)
  const [bgColor, setBgColor] = useState(DEFAULT_BG_COLOR)
  const [isClient, setIsClient] = useState(false)

  // 在組件掛載時從 localStorage 讀取設置
  useEffect(() => {
    setIsClient(true)
    const savedSize = localStorage.getItem(FONT_SIZE_KEY)
    if (savedSize) setFontSize(parseFloat(savedSize))

    const savedSizeAlt = localStorage.getItem(FONT_SIZE_ALT_KEY)
    if (savedSizeAlt) setFontSizeAlt(parseFloat(savedSizeAlt))

    const savedBottomLine = localStorage.getItem(BOTTOM_LINE_KEY)
    if (savedBottomLine) setBottomLine(savedBottomLine === 'true')

    const savedBgColor = localStorage.getItem(BG_COLOR_KEY)
    if (savedBgColor) setBgColor(savedBgColor === 'true')
  }, [])

  // 當設置改變時，儲存到 localStorage
  useEffect(() => {
    if (isClient) {
      localStorage.setItem(FONT_SIZE_KEY, fontSize.toString())
    }
  }, [fontSize, isClient])

  useEffect(() => {
    if (isClient) {
      localStorage.setItem(FONT_SIZE_ALT_KEY, fontSizeAlt.toString())
    }
  }, [fontSizeAlt, isClient])

  useEffect(() => {
    if (isClient) {
      localStorage.setItem(BOTTOM_LINE_KEY, bottomLine.toString())
    }
  }, [bottomLine, isClient])

  useEffect(() => {
    if (isClient) {
      localStorage.setItem(BG_COLOR_KEY, bgColor.toString())
    }
  }, [bgColor, isClient])

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
