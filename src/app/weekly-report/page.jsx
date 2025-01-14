'use client'

import { useEffect } from 'react'

import { Box, Stack } from '@mui/material'

import { useDB } from '@/hooks/useDB'
import { useGetOrdNo } from '@/hooks/useGetOrdNo'
import { useWeeklyReportDate } from '@/hooks/useWeeklyReportDate'

import Error from './Error'
import Main from './sections/Main'
import File from './sections/File'
import Todo from './sections/Todo'
import TodoB from './sections/TodoB'
import Track from './sections/Track'
import Weekly from './sections/Weekly'
import Footer from './sections/Footer'
import NavBar from './components/NavBar'
import Monthly from './sections/Monthly'
import Revenue from './sections/Revenue'
import Loading from './components/Loading'
import MainHelp from './sections/MainHelp'
import Milestone from './sections/Milestone'
import Difference from './sections/Difference'
import ComControl from './sections/ComControl'
import DifferenceCash from './sections/DifferenceCash'
import RegulatoryTrack from './sections/RegulatoryTrack'
import CriticalpathCco from './sections/CriticalpathCco'
import ControversialCases from './sections/ControversialCases'

export default function WeeklyReport() {
  const { selectedDate, handleDateChange, setDefaultDate } = useWeeklyReportDate()
  const ordNo = useGetOrdNo()
  const is102B1A = ordNo === '102B1A'
  const { data, loading, error } = useDB(ordNo, selectedDate)
  console.log(data)

  useEffect(() => {
    if (data.wkWeeklyDate.length > 0 && !selectedDate) {
      setDefaultDate(data.wkWeeklyDate)
    }
  }, [data.wkWeeklyDate, selectedDate, setDefaultDate])

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error message={error} />
  }

  // if (data.wkWeeklyDate.length === 0) {
  //   return <Error message={'工令相關資料尚未建立'} />
  // }

  if (data.message === '沒有找到相關資料') {
    return <Error message={data.message} />
  } else if (!data.message === '初始化空資料' || !data || !data.wkMain[0]) {
    return
  }

  return (
    <>
      <NavBar
        data={data}
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
        is102B1A={is102B1A}
      />
      <Box
        sx={{
          my: 2,
          mx: {
            xs: 1, // 在 xs 螢幕時 margin-left 和 margin-right 為 8px
            sm: 2, // 在 sm 螢幕時 margin-left 和 margin-right 為 16px
            md: 4, // 在 md 以上螢幕時保持原本的 margin 32px
          },
        }}
      >
        {is102B1A ? (
          <Stack spacing={2}>
            <Revenue
              data={data.wkRevenue[0]}
              frProjectIncome={data.frProjectIncome}
              showPlot={false}
              is102B1A={is102B1A}
            />
            <DifferenceCash
              data={data.wkDifferenceCash}
              plotData={data.frProjectIncome}
              is102B1A={is102B1A}
            />
            <File data={data.wkFile} is102B1A={is102B1A} />
            <RegulatoryTrack data={data.wkRegulatoryTrack} is102B1A={is102B1A} />
            <Footer />
          </Stack>
        ) : (
          <Stack spacing={2}>
            <Box sx={{ mb: 2 }}>
              <Main data={data.wkMain[0]} />
            </Box>
            <MainHelp data={data.wkMainHelp} />
            <Weekly data={data.wkWeekly[0]} data2={data.wkWeeklyCustomize} />
            <Monthly data={data.wkMonthly[0]} plotData1={data.wkMonthlyPlot1} />
            <Difference data={data.wkDifference[0]} />
            <DifferenceCash data={data.wkDifferenceCash} plotData={data.wkDifferenceCashPlot} />
            <Revenue data={data.wkRevenue[0]} frProjectIncome={data.frProjectIncome} />
            <Milestone data={data.wkMilestone} />
            <File data={data.wkFile} />
            <CriticalpathCco data={data.wkCriticalpathCco} />
            <Todo data={data.wkTodo} />
            <TodoB data={data.wkTodoB} />
            <Track data={data.wkTrack} />
            <RegulatoryTrack data={data.wkRegulatoryTrack} />
            <ControversialCases data={data.wkControversialCases} />
            <ComControl data={data.wkComControl[0]} />
            <Footer />
          </Stack>
        )}
      </Box>
    </>
  )
}
