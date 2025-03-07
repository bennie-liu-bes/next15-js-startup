/* eslint-disable tailwindcss/no-custom-classname */
import { useState } from 'react'
import { COLOR } from '@/config-global'
import { fmNoUnit, toTWDate3 } from '@/utils/fm'

import { TableRow, TableHead, TableBody } from '@mui/material'

import TableWrapper from './TableWrapper'
import TableDataCell from './TableDataCell'
import TableTitleCell from './TableTitleCell'
import TableBodyNodata from './TableBodyNodata'
import { useFontSize } from '../context/useFontSize'

export default function MonthlyPlot2DT({ data, data2 }) {
  const combinedData = data ? data.concat(data2) : data2
  const { fontSize } = useFontSize()
  const [sortOrder, setSortOrder] = useState('asc')

  const handleSort = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))
  }

  return (
    <TableWrapper
      title=""
      colSpan={7}
      scrollToRight={true}
      sx={{
        '& .MuiTableContainer-root': {
          scrollBehavior: 'smooth',
        },
      }}
    >
      {tableHead()}
      {data ? tableBody() : <TableBodyNodata colSpan={7} />}
    </TableWrapper>
  )

  function tableBody() {
    const sortedData = [...combinedData]
      .sort((a, b) => {
        const dateA = new Date(a.CALENDAR_DATE)
        const dateB = new Date(b.CALENDAR_DATE)
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
      })
      .filter(item => item.REVENUE_LISTED_BUT_NOT_PRICED_AMT !== null)

    return (
      <TableBody sx={{ '& .MuiTypography-root': { fontSize: `${fontSize}rem` } }}>
        <TableRow>
          <TableTitleCell
            title="應收工程款"
            textAlign="left"
            fontColor="#000"
            className="sticky-column"
          />
          {sortedData.map((item, index) => (
            <TableDataCell key={index} value={fmNoUnit(item.CURREV)} textAlign="right" />
          ))}
        </TableRow>
        <TableRow>
          <TableTitleCell
            title="已開發票計價金額"
            textAlign="left"
            fontColor="#000"
            className="sticky-column"
          />
          {sortedData.map((item, index) => (
            <TableDataCell key={index} value={fmNoUnit(item.ENGAMT)} textAlign="right" />
          ))}
        </TableRow>
        <TableRow>
          <TableTitleCell
            title="保留款"
            textAlign="left"
            fontColor="#000"
            className="sticky-column"
          />
          {sortedData.map((item, index) => (
            <TableDataCell
              key={index}
              value={`${fmNoUnit(item.RSVAMT)}\n(${item.RSV_INVOI_CH})`}
              textAlign="right"
            />
          ))}
        </TableRow>
        {/* <TableRow>
          <TableTitleCell
            title="開發票狀態"
            textAlign="left"
            fontColor="#000"
            className="sticky-column"
          />
          {sortedData.map((item, index) => (
            <TableDataCell key={index} value={item.RSV_INVOI_CH} textAlign="right" />
          ))}
        </TableRow>
        <TableRow>
          <TableTitleCell
            title="其他"
            textAlign="left"
            fontColor="#000"
            className="sticky-column"
          />
          {sortedData.map((item, index) => (
            <TableDataCell key={index} value={fmNoUnit(item.SAFAMT)} textAlign="right" />
          ))}
        </TableRow> */}
        <TableRow>
          <TableTitleCell
            title="已列入營收未計價金額"
            textAlign="left"
            fontColor="#000"
            className="sticky-column"
          />
          {sortedData.map((item, index) => (
            <TableDataCell
              key={index}
              value={fmNoUnit(item.REVENUE_LISTED_BUT_NOT_PRICED_AMT)}
              textAlign="right"
              sx={{ color: COLOR.ALERTCOLOR }}
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
          <TableTitleCell
            title="項目"
            textAlign="center"
            fontColor="#000"
            minWidth="240px"
            className="sticky-column header"
          />
          {[...combinedData]
            .sort((a, b) => {
              const dateA = new Date(a.CALENDAR_DATE)
              const dateB = new Date(b.CALENDAR_DATE)
              return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
            })
            .filter(item => item.REVENUE_LISTED_BUT_NOT_PRICED_AMT !== null)
            .map((item, index) => (
              <TableTitleCell
                key={index}
                title={toTWDate3(item.CALENDAR_DATE.substring(0, 7).replace('/', ''))}
                textAlign="center"
                fontColor="#000"
                minWidth="160px"
              />
            ))}
        </TableRow>
      </TableHead>
    )
  }
}
