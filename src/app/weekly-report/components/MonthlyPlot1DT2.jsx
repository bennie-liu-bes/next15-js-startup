/* eslint-disable tailwindcss/no-custom-classname */
import { useState } from 'react'
import { COLOR } from '@/config-global'
import { fm2, toTWDate4 } from '@/utils/fm'

import { Stack, TableRow, TableHead, TableBody } from '@mui/material'

import TableWrapper from './TableWrapper'
import TableDataCell from './TableDataCell'
import TableTitleCell from './TableTitleCell'
import TableBodyNodata from './TableBodyNodata'
import { useFontSize } from '../context/useFontSize'

export default function MonthlyPlot2DT({ data }) {
  const { fontSize } = useFontSize()
  const [sortOrder, setSortOrder] = useState('asc')

  return (
    <Stack direction="row" spacing={0}>
      <TableWrapper
        title=""
        colSpan={1}
        scrollToRight={true}
        sx={{
          '& .MuiTableContainer-root': {
            scrollBehavior: 'smooth',
          },
          borderBottomRightRadius: '0px',
          borderTopRightRadius: '0px',
          borderRight: 'none',
          width: 'fit-content',
          minWidth: 'min-content',
        }}
      >
        {tableFixColumn()}
      </TableWrapper>
      <TableWrapper
        title=""
        colSpan={8}
        scrollToRight={true}
        sx={{
          '& .MuiTableContainer-root': {
            scrollBehavior: 'smooth',
          },
          borderBottomLeftRadius: '0px',
          borderTopLeftRadius: '0px',
          borderLeft: 'none',
        }}
      >
        {tableHead()}
        {data ? tableBody() : <TableBodyNodata colSpan={8} />}
      </TableWrapper>
    </Stack>
  )

  function tableFixColumn() {
    return (
      <TableBody sx={{ '& .MuiTypography-root': { fontSize: `${fontSize}rem` } }}>
        <TableRow>
          <TableTitleCell
            title="項目"
            textAlign="center"
            fontColor="#000"
            minWidth="245px"
            className="sticky-column header"
          />
        </TableRow>
        <TableRow>
          <TableTitleCell
            title="累計工期進度"
            textAlign="left"
            fontColor="#000"
            className="sticky-column"
          />
        </TableRow>
        <TableRow>
          <TableTitleCell
            title="累計預定進度"
            textAlign="left"
            fontColor="#000"
            className="sticky-column"
          />
        </TableRow>
        <TableRow>
          <TableTitleCell
            title="累計實際進度"
            textAlign="left"
            fontColor="#000"
            className="sticky-column"
          />
        </TableRow>
        <TableRow>
          <TableTitleCell
            title="累計營收進度"
            textAlign="left"
            fontColor="#000"
            className="sticky-column"
          />
        </TableRow>
        <TableRow sx={{ borderBottom: '2px double #000' }}>
          <TableTitleCell
            title="累計計價進度"
            textAlign="left"
            fontColor="#000"
            className="sticky-column"
          />
        </TableRow>
        <TableRow>
          <TableTitleCell
            title="累計實際進度-預定進度"
            textAlign="left"
            fontColor="#000"
            className="sticky-column"
          />
        </TableRow>
        <TableRow>
          <TableTitleCell
            title="累計實際進度-營收進度"
            textAlign="left"
            fontColor="#000"
            className="sticky-column"
          />
        </TableRow>
        <TableRow>
          <TableTitleCell
            title="累計營收進度-計價進度"
            textAlign="left"
            fontColor="#000"
            className="sticky-column"
          />
        </TableRow>
      </TableBody>
    )
  }

  function tableBody() {
    const sortedData = [...data]
      .sort((a, b) => {
        const dateA = new Date(a.CALENDAR_DATE)
        const dateB = new Date(b.CALENDAR_DATE)
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
      })
      .filter(item => item.REVENUE_LISTED_BUT_NOT_PRICED_AMT !== null)

    return (
      <TableBody sx={{ '& .MuiTypography-root': { fontSize: `${fontSize}rem` } }}>
        <TableRow>
          {sortedData.map((item, index) => (
            <TableDataCell key={index} value={fm2(item.CONSTRUCTION_PERCENT)} textAlign="right" />
          ))}
        </TableRow>
        <TableRow>
          {sortedData.map((item, index) => (
            <TableDataCell key={index} value={fm2(item.EXP_CUMSUM_PERCENT)} textAlign="right" />
          ))}
        </TableRow>
        <TableRow>
          {sortedData.map((item, index) => (
            <TableDataCell key={index} value={fm2(item.ACT_CUMSUM_PERCENT)} textAlign="right" />
          ))}
        </TableRow>
        <TableRow>
          {sortedData.map((item, index) => (
            <TableDataCell key={index} value={fm2(item.REVENUE_PERCENT)} textAlign="right" />
          ))}
        </TableRow>
        <TableRow sx={{ borderBottom: '2px double #000' }}>
          {sortedData.map((item, index) => (
            <TableDataCell key={index} value={fm2(item.VALUATION_PERCENT)} textAlign="right" />
          ))}
        </TableRow>
        <TableRow>
          {sortedData.map((item, index) => (
            <TableDataCell
              key={index}
              value={fm2(item.ACT_CUMSUM_PERCENT_AND_EXP_CUMSUM_PERCENT_DIFF)}
              textAlign="right"
            />
          ))}
        </TableRow>
        <TableRow>
          {sortedData.map((item, index) => (
            <TableDataCell
              key={index}
              value={fm2(item.ACT_CUMSUM_PERCENT_AND_REVENUE_PERCENT_DIFF)}
              textAlign="right"
            />
          ))}
        </TableRow>
        <TableRow>
          {sortedData.map((item, index) => (
            <TableDataCell
              key={index}
              value={fm2(item.REVENUE_PERCENT_AND_VALUATION_PERCENT_DIFF)}
              textAlign="right"
            />
          ))}
        </TableRow>
      </TableBody>
    )
  }

  function tableHead() {
    return (
      <TableHead
        sx={{
          bgcolor: COLOR.BGCOLOR,
          '& .MuiTypography-root': { fontSize: `${fontSize}rem` },
        }}
      >
        <TableRow>
          {[...data]
            .sort((a, b) => {
              const dateA = new Date(a.CALENDAR_DATE)
              const dateB = new Date(b.CALENDAR_DATE)
              return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
            })
            .filter(item => item.REVENUE_LISTED_BUT_NOT_PRICED_AMT !== null)
            .map((item, index) => (
              <TableTitleCell
                key={index}
                title={toTWDate4(item.CALENDAR_DATE)}
                textAlign="center"
                fontColor="#000"
                minWidth="180px"
                borderRight={true}
              />
            ))}
        </TableRow>
      </TableHead>
    )
  }
}
