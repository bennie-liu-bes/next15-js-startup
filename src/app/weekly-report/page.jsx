'use client'

import { useEffect } from 'react'

import { Box, Alert, Stack, Container } from '@mui/material'

import { useDB } from '@/hooks/useDB'
import { useGetOrdNo } from '@/hooks/useGetOrdNo'
import { useWeeklyReportDate } from '@/hooks/useWeeklyReportDate'

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
  const { data, loading, error } = useDB(ordNo, selectedDate)

  useEffect(() => {
    if (data.wkWeeklyDate.length > 0 && !selectedDate) {
      setDefaultDate(data.wkWeeklyDate)
    }
  }, [data.wkWeeklyDate, selectedDate, setDefaultDate])

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>
  }

  return (
    <Box>
      <NavBar data={data} selectedDate={selectedDate} handleDateChange={handleDateChange} />
      <Container sx={{ my: 2 }}>
        <Stack spacing={2}>
          <Main data={data.wkMain[0]} />
          <MainHelp data={data.wkMainHelp} />
          <Weekly data={data.wkWeekly[0]} />
          <Monthly data={data.wkMonthly[0]} />
          <Difference data={data.wkDifference[0]} />
          <DifferenceCash data={data.wkDifferenceCash} />
          <Revenue data={data.wkRevenue[0]} />
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
      </Container>
    </Box>
  )
}
