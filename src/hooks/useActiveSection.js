import { useState, useEffect } from 'react'

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState('weekly-section') // 預設為 weekly-section

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        // 找出所有可見的區域
        const visibleSections = entries.filter(entry => {
          const rect = entry.target.getBoundingClientRect()
          // 檢查元素是否在視窗的上半部
          const isInUpperHalf = rect.top < window.innerHeight / 2
          return entry.isIntersecting && isInUpperHalf
        })

        if (visibleSections.length > 0) {
          // 找出最上方的可見區域
          const topSection = visibleSections.reduce((prev, current) => {
            const prevRect = prev.target.getBoundingClientRect()
            const currentRect = current.target.getBoundingClientRect()
            return prevRect.top > currentRect.top ? current : prev
          })

          const newActiveSection = topSection.target.id
          if (activeSection !== newActiveSection) {
            setActiveSection(newActiveSection)
            // console.log('Active section changed to:', newActiveSection) // 除錯用
          }
        }
      },
      {
        threshold: [0], // 只要出現就觸發
        rootMargin: '0px 0px -50% 0px', // 只觀察上半部
      }
    )

    // 初始化時立即檢查當前位置
    const checkInitialPosition = () => {
      const sections = document.querySelectorAll('[id$="-section"]')
      let topSection = null
      let minDistance = Infinity

      sections.forEach(section => {
        const rect = section.getBoundingClientRect()
        const distance = Math.abs(rect.top)
        if (distance < minDistance && rect.top <= window.innerHeight / 2) {
          minDistance = distance
          topSection = section
        }
      })

      if (topSection) {
        setActiveSection(topSection.id)
        // console.log('Initial active section:', topSection.id) // 除錯用
      }
    }

    // 觀察所有區域
    const sections = document.querySelectorAll('[id$="-section"]')
    sections.forEach(section => observer.observe(section))

    // 初始檢查
    checkInitialPosition()

    // 監聽滾動事件以處理邊界情況
    const handleScroll = () => {
      checkInitialPosition()
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [activeSection])

  return activeSection
}
