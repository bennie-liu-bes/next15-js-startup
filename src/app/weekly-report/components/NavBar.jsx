'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { COLOR } from '@/config-global'
import { ICCC_URL } from '@/config-global'

import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import AppBar from '@mui/material/AppBar'
import Slider from '@mui/material/Slider'
import { IconButton } from '@mui/material'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import Toolbar from '@mui/material/Toolbar'
import Checkbox from '@mui/material/Checkbox'
import { useTheme } from '@mui/material/styles'
import FormGroup from '@mui/material/FormGroup'
import Typography from '@mui/material/Typography'
import SettingsIcon from '@mui/icons-material/Settings'
import EditNoteIcon from '@mui/icons-material/EditNote'
import useMediaQuery from '@mui/material/useMediaQuery'
import FormatSizeIcon from '@mui/icons-material/FormatSize'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import FormControlLabel from '@mui/material/FormControlLabel'
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'

import { useActiveSection } from '@/hooks/useActiveSection'

import DateDropDown from './DateDropDown'
import { useFontSize } from '../context/useFontSize'

export default function NavBar({ data, selectedDate, handleDateChange, is102B1A }) {
  const theme = useTheme()
  if (data.wkMain.length === 0) return null

  const [isFullscreen, setIsFullscreen] = useState(false)
  const activeSection = useActiveSection()

  // 抽取共用的滾動邏輯
  const scrollToSection = sectionId => {
    const element = document.getElementById(sectionId)
    if (element) {
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset

      window.scrollTo({
        top: offsetPosition - 50,
        behavior: 'smooth',
      })
    }
  }

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  const handleScrollToWeekly = () => scrollToSection('weekly-section')
  const handleScrollToMainHelp = () => scrollToSection('main-help-section')
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

  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'))
  const [showButtons, setShowButtons] = useState(isSmUp ? true : false)
  const [showSettings, setShowSettings] = useState(false)
  const {
    fontSize,
    setFontSize,
    fontSizeAlt,
    setFontSizeAlt,
    bottomLine,
    setBottomLine,
    bgColor,
    setBgColor,
  } = useFontSize()

  const handleChange = (event, newValue) => {
    setFontSize(newValue)
  }
  const handleChangeAlt = (event, newValue) => {
    setFontSizeAlt(newValue)
  }

  const handleBottomLineChange = () => {
    setBottomLine(!bottomLine)
  }

  const handleBgColorChange = () => {
    setBgColor(!bgColor)
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else if (document.exitFullscreen) {
      document.exitFullscreen()
    }
    setIsFullscreen(!isFullscreen)
  }

  return (
    <AppBar
      position="sticky"
      color="default"
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => {
        setShowButtons(isSmUp ? true : false)
        setShowSettings(false)
      }}
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
      {showSettings && settingsToolbar()}
    </AppBar>
  )

  function secondToolbar() {
    return (
      <Toolbar
        id="second-toolbar"
        variant="dense"
        sx={{
          minHeight: '35px',
          // 使用 transition 讓顯示/隱藏有動畫效果
          transition: 'opacity 0.3s ease-in-out',
          opacity: showButtons ? 1 : 0,
          // 當完全隱藏時，移除這個元素的互動能力
          pointerEvents: showButtons ? 'auto' : 'none',
        }}
      >
        <Tooltip title={<Typography variant="body1">回到頂端</Typography>} placement="top" arrow>
          <IconButton size="medium" color="default" onClick={handleScrollToTop} sx={{ mb: 1 }}>
            {<KeyboardDoubleArrowUpIcon />}
          </IconButton>
        </Tooltip>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            width: '100%',
            justifyContent: 'space-evenly',
            overflow: 'hidden',
            flexWrap: 'wrap', // 允許按鈕斷行
            gap: '4px', // 設定按鈕之間的間距
            mb: 1,
          }}
        >
          {!is102B1A ? (
            <>
              {navButton({
                value: '壹',
                handleScroll: handleScrollToWeekly,
                tooltip: '週進度',
                sectionId: 'weekly-section',
              })}
              {navButton({
                value: '貳',
                handleScroll: handleScrollToMonthly,
                tooltip: '月進度差異值',
                sectionId: 'monthly-section',
              })}
              {navButton({
                value: '參-1',
                handleScroll: handleScrollToDifference,
                tooltip: '會計報表現金差異',
                sectionId: 'difference-section',
              })}
              {navButton({
                value: '參-2',
                handleScroll: handleScrollToDifferenceCash,
                tooltip: '預估三個月/實際開發票、入帳日期及金額',
                sectionId: 'difference-cash-section',
              })}
              {navButton({
                value: '肆',
                handleScroll: handleScrollToRevenue,
                tooltip: '營收管控',
                sectionId: 'revenue-section',
              })}
              {navButton({
                value: '伍-1',
                handleScroll: handleScrollToMilestone,
                tooltip: '里程碑',
                sectionId: 'milestone-section',
              })}
              {navButton({
                value: '伍-2',
                handleScroll: handleScrollToFile,
                tooltip: '施工現況',
                sectionId: 'file-section',
              })}
              {navButton({
                value: '陸',
                handleScroll: handleScrollToCriticalpathCco,
                tooltip: '契約變更',
                sectionId: 'criticalpath-cco-section',
              })}
              {navButton({
                value: '柒-1(a)',
                handleScroll: handleScrollToTodo,
                tooltip: '應辦事項-困難解決需求',
                sectionId: 'todo-section',
              })}
              {navButton({
                value: '柒-1(b)',
                handleScroll: handleScrollToTodoB,
                tooltip: '應辦事項-契約規定應辦事項',
                sectionId: 'todo-b-section',
              })}
              {navButton({
                value: '柒-2',
                handleScroll: handleScrollToTrack,
                tooltip: '追蹤管制事項',
                sectionId: 'track-section',
              })}
              {navButton({
                value: '柒-3',
                handleScroll: handleScrollToRegulatoryTrack,
                tooltip: '未來三個月採發提送管制追蹤',
                sectionId: 'regulatory-track-section',
              })}
              {navButton({
                value: '柒-4',
                handleScroll: handleScrollToControversialCases,
                tooltip: '爭議案件',
                sectionId: 'controversial-cases-section',
              })}
              {navButton({
                value: '捌',
                handleScroll: handleScrollToComControl,
                tooltip: '完工階段管控 - 小包合約結算辦理情形',
                sectionId: 'com-control-section',
              })}
            </>
          ) : (
            <>
              {navButton({
                value: '壹',
                handleScroll: handleScrollToMainHelp,
                tooltip: '需公司援助事項',
                sectionId: 'main-help-section',
              })}
              {navButton({
                value: '貳',
                handleScroll: handleScrollToRevenue,
                tooltip: '營收管控',
                sectionId: 'revenue-section',
              })}
              {navButton({
                value: '參',
                handleScroll: handleScrollToDifferenceCash,
                tooltip: '預估三個月/實際開發票、入帳日期及金額',
                sectionId: 'difference-cash-section',
              })}
              {navButton({
                value: '肆',
                handleScroll: handleScrollToFile,
                tooltip: '施工現況',
                sectionId: 'file-section',
              })}
              {navButton({
                value: '伍',
                handleScroll: handleScrollToRegulatoryTrack,
                tooltip: '未來三個月採發提送管制追蹤',
                sectionId: 'regulatory-track-section',
              })}
            </>
          )}
        </Stack>
        <Tooltip title={<Typography variant="body1">設定</Typography>} placement="top" arrow>
          <IconButton
            size="medium"
            color="default"
            onClick={() => setShowSettings(!showSettings)}
            sx={{ mb: 1 }}
          >
            {<SettingsIcon />}
          </IconButton>
        </Tooltip>
        <Tooltip
          title={<Typography variant="body1">{isFullscreen ? '離開全螢幕' : '全螢幕'}</Typography>}
          placement="top"
          arrow
        >
          <IconButton size="medium" color="default" onClick={toggleFullscreen} sx={{ mb: 1 }}>
            {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </IconButton>
        </Tooltip>
      </Toolbar>
    )
  }

  function settingsToolbar() {
    return (
      <Toolbar
        variant="dense"
        sx={{
          minHeight: '35px',
          transition: 'opacity 0.3s ease-in-out',
          mb: 1,
          justifyContent: 'flex-end',
        }}
      >
        <Stack direction="row" spacing={1} sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
          <Tooltip
            title={<Typography variant="body1">差異文字註記</Typography>}
            placement="top"
            arrow
          >
            <EditNoteIcon fontSize="large" />
          </Tooltip>
          {/* <Typography variant="body1">差異文字註記: </Typography> */}
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={bottomLine}
                  onChange={handleBottomLineChange}
                  color="secondary"
                />
              }
              label={
                <Typography variant="body1" sx={{ textDecoration: 'underline solid #ab47bc 3px' }}>
                  底線
                </Typography>
              }
            />
            <FormControlLabel
              control={
                <Checkbox checked={bgColor} onChange={handleBgColorChange} color="default" />
              }
              label={
                <Typography variant="body1" sx={{ backgroundColor: COLOR.BGCOLOR }}>
                  底色
                </Typography>
              }
            />
          </FormGroup>
        </Stack>
        <Divider orientation="vertical" flexItem sx={{ mr: 2 }} />
        <Stack spacing={1} direction="row" sx={{ width: '200px', mr: 2 }}>
          <Tooltip title={<Typography variant="body1">字體大小</Typography>} placement="top" arrow>
            <FormatSizeIcon fontSize="medium" />
          </Tooltip>
          <Slider
            aria-label="Font Size"
            value={fontSize}
            min={0.3}
            max={2}
            step={0.05}
            marks={[{ value: 1.25, label: undefined }]}
            valueLabelDisplay="auto"
            valueLabelFormat={value => (value === 1.25 ? `預設${value}倍` : `${value}倍`)}
            onChange={handleChange}
          />
        </Stack>
        <Divider orientation="vertical" flexItem sx={{ mr: 2 }} />
        <Stack spacing={1} direction="row" sx={{ width: '200px' }}>
          <Tooltip
            title={<Typography variant="body1">參-2、柒-3 字體大小</Typography>}
            placement="top"
            arrow
          >
            <FormatSizeIcon fontSize="medium" />
          </Tooltip>
          <Slider
            aria-label="Font Size Alt"
            value={fontSizeAlt}
            color="secondary"
            min={0.3}
            max={2}
            step={0.05}
            marks={[{ value: 0.9, label: undefined }]}
            valueLabelDisplay="auto"
            valueLabelFormat={value => (value === 0.9 ? '預設0.9倍' : `${value}倍`)}
            onChange={handleChangeAlt}
          />
        </Stack>
      </Toolbar>
    )
  }

  function navButton({ value, handleScroll, tooltip, sectionId }) {
    const isActive = activeSection === sectionId

    return (
      <Tooltip title={<Typography variant="body1">{tooltip}</Typography>} placement="top" arrow>
        <Button
          disableRipple
          variant="text"
          size="medium"
          onClick={handleScroll}
          sx={{
            border: '1px solid #E0E0E0',
            py: 0.5,
            flex: 1,
            color: isActive ? '#fff' : 'inherit',
            backgroundColor: isActive ? COLOR.NAVBTNHIGHLIGHT : 'transparent',
          }}
        >
          {value}
        </Button>
      </Tooltip>
    )
  }
}
