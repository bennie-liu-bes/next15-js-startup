'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ICCC_URL } from '@/config-global'

import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import AppBar from '@mui/material/AppBar'
import Tooltip from '@mui/material/Tooltip'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'

import DateDropDown from './DateDropDown'

// 抽取共用的滾動邏輯
const scrollToSection = sectionId => {
  const element = document.getElementById(sectionId)
  if (element) {
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
}

export default function NavBar({ data, selectedDate, handleDateChange }) {
  if (data.wkMain.length === 0) return null
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const handleScrollToWeekly = () => scrollToSection('weekly-section')
  const handleScrollToMonthly = () => scrollToSection('monthly-section')
  const handleScrollToDifference = () => scrollToSection('difference-section')
  const handleScrollToDifferenceCash = () => scrollToSection('difference-cash-section')
  const handleScrollToRevenue = () => scrollToSection('revenue-section')
  const handleScrollToMilestone = () => scrollToSection('milestone-section')
  const handleScrollToFile = () => scrollToSection('file-section')
  const handleScrollToComControl = () => scrollToSection('com-control-section')
  const handleScrollToCriticalpathCco = () => scrollToSection('criticalpath-cco-section')
  const handleScrollToTodo = () => scrollToSection('todo-section')
  const handleScrollToTodoB = () => scrollToSection('todo-b-section')
  const handleScrollToTrack = () => scrollToSection('track-section')
  const handleScrollToRegulatoryTrack = () => scrollToSection('regulatory-track-section')
  const handleScrollToControversialCases = () => scrollToSection('controversial-cases-section')

  // 從 data 中解構需要的數據
  const { SITE_CNAME, ORD_CH } = data.wkMain[0]

  const [showButtons, setShowButtons] = useState(false)

  return (
    <AppBar
      position="sticky"
      color="default"
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
    >
      <Toolbar variant="dense" sx={{ display: 'flex', alignItems: 'center' }}>
        <Link href={ICCC_URL}>
          <Image
            src="/logo.png"
            alt="logo"
            height={40}
            width={40}
            style={{ minWidth: 40, minHeight: 40 }}
          />
        </Link>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            flexGrow: 1,
            alignItems: 'end',
            display: 'flex',
            ml: 2,
            overflow: 'hidden',
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            color="inherit"
            sx={{ lineHeight: 1, whiteSpace: 'nowrap' }}
          >
            {SITE_CNAME}
          </Typography>
          <Typography
            variant="h6"
            color="inherit"
            sx={{
              lineHeight: 1,
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
          >
            {ORD_CH}
          </Typography>
        </Stack>
        <Stack>
          <DateDropDown
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
            wkWeeklyDate={data.wkWeeklyDate}
          />
        </Stack>
      </Toolbar>
      {showButtons && secondToolbar()}
    </AppBar>
  )

  function secondToolbar() {
    return (
      <Toolbar
        variant="dense"
        sx={{
          height: '35px',
          minHeight: '35px',
          // 使用 transition 讓顯示/隱藏有動畫效果
          transition: 'opacity 0.3s ease-in-out',
          opacity: showButtons ? 1 : 0,
          // 當完全隱藏時，移除這個元素的互動能力
          pointerEvents: showButtons ? 'auto' : 'none',
        }}
      >
        <Stack direction="row" spacing={1} sx={{ width: '100%', justifyContent: 'space-evenly' }}>
          <Tooltip title={'回到頂端'} placement="top" arrow followCursor>
            <Button
              variant="text"
              size="small"
              color="default"
              onClick={handleScrollToTop}
              sx={{ py: 0 }}
            >
              {<KeyboardDoubleArrowUpIcon />}
            </Button>
          </Tooltip>
          {navButton({
            value: '壹',
            handleScroll: handleScrollToWeekly,
            tooltip: '週進度',
          })}
          {navButton({
            value: '貳',
            handleScroll: handleScrollToMonthly,
            tooltip: '月進度差異值',
          })}
          {navButton({
            value: '參-1',
            handleScroll: handleScrollToDifference,
            tooltip: '會計報表現金差異',
          })}
          {navButton({
            value: '參-2',
            handleScroll: handleScrollToDifferenceCash,
            tooltip: '預估三個月/實際開發票、入帳日期及金額',
          })}
          {navButton({
            value: '肆',
            handleScroll: handleScrollToRevenue,
            tooltip: '營收管控',
          })}
          {navButton({ value: '伍-1', handleScroll: handleScrollToMilestone, tooltip: '里程碑' })}
          {navButton({ value: '伍-2', handleScroll: handleScrollToFile, tooltip: '施工現況' })}
          {navButton({
            value: '陸',
            handleScroll: handleScrollToCriticalpathCco,
            tooltip: '契約變更',
          })}
          {navButton({
            value: '柒-1(a)',
            handleScroll: handleScrollToTodo,
            tooltip: '應辦事項-困難解決需求',
          })}
          {navButton({
            value: '柒-1(b)',
            handleScroll: handleScrollToTodoB,
            tooltip: '應辦事項-契約規定應辦事項',
          })}
          {navButton({ value: '柒-2', handleScroll: handleScrollToTrack, tooltip: '追蹤管制事項' })}
          {navButton({
            value: '柒-3',
            handleScroll: handleScrollToRegulatoryTrack,
            tooltip: '未來三個月採發提送管制追蹤',
          })}
          {navButton({
            value: '柒-4',
            handleScroll: handleScrollToControversialCases,
            tooltip: '爭議案件',
          })}
          {navButton({
            value: '捌',
            handleScroll: handleScrollToComControl,
            tooltip: '完工階段管控 - 小包合約結算辦理情形',
          })}
        </Stack>
      </Toolbar>
    )
  }

  function navButton({ value, handleScroll, tooltip }) {
    return (
      <Tooltip title={<h1>{tooltip}</h1>} placement="top" arrow>
        <Button
          variant="text"
          size="small"
          color="default"
          onClick={handleScroll}
          sx={{ border: '1px solid #E0E0E0', py: 0 }}
        >
          {value}
        </Button>
      </Tooltip>
    )
  }
}
