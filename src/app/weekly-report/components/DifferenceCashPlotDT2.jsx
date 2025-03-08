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

export default function DifferenceCashPlotDT({ data }) {
  const { fontSize } = useFontSize()
  const [sortOrder, setSortOrder] = useState('asc')

  const handleSort = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))
  }

  return (
    <TableWrapper
      title=""
      colSpan={5}
      scrollToRight={true}
      sx={{
        '& .MuiTableContainer-root': {
          scrollBehavior: 'smooth',
        },
      }}
    >
      {tableHead()}
      {data ? tableBody() : <TableBodyNodata colSpan={5} />}
    </TableWrapper>
  )

  function tableBody() {
    const sortedData = [...data].sort((a, b) => {
      const dateA = new Date(a.YYMM.replace(/(\d{4})(\d{2})/, '$1/$2/01'))
      const dateB = new Date(b.YYMM.replace(/(\d{4})(\d{2})/, '$1/$2/01'))
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
    })

    return (
      <TableBody sx={{ '& .MuiTypography-root': { fontSize: `${fontSize}rem` } }}>
        <TableRow>
          <TableTitleCell
            title="當月現金收支差異"
            textAlign="left"
            fontColor="#000"
            className="sticky-column"
          />
          {sortedData.map((item, index) => (
            <TableDataCell
              key={index}
              value={fmNoUnit(item.THE_MONTH_CASH_RECEIPTS_AND_PAYMENTS_DIFFERENTS)}
              textAlign="right"
            />
          ))}
        </TableRow>
        <TableRow>
          <TableTitleCell
            title="累計現金收支差異"
            textAlign="left"
            fontColor="#000"
            className="sticky-column"
          />
          {sortedData.map((item, index) => (
            <TableDataCell
              key={index}
              value={fmNoUnit(item.CUMULATIVE_CASH_RECEIPTS_AND_PAYMENTS_DIFFERENTS)}
              textAlign="right"
            />
          ))}
        </TableRow>
        <TableRow>
          <TableTitleCell
            title="當月墊繳利息"
            textAlign="left"
            fontColor="#000"
            className="sticky-column"
          />
          {sortedData.map((item, index) => (
            <TableDataCell
              key={index}
              value={fmNoUnit(item.THE_MONTH_ADVANCE_INTEREST)}
              textAlign="right"
            />
          ))}
        </TableRow>
        <TableRow>
          <TableTitleCell
            title="累計墊繳利息"
            textAlign="left"
            fontColor="#000"
            className="sticky-column"
          />
          {sortedData.map((item, index) => (
            <TableDataCell
              key={index}
              value={fmNoUnit(item.CUMULATIVE_ADVANCE_INTEREST)}
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
          <TableTitleCell
            title="項目"
            textAlign="center"
            fontColor="#000"
            minWidth="200px"
            className="sticky-column header"
          />
          {[...data]
            .sort((a, b) => {
              const dateA = new Date(a.YYMM.replace(/(\d{4})(\d{2})/, '$1/$2/01'))
              const dateB = new Date(b.YYMM.replace(/(\d{4})(\d{2})/, '$1/$2/01'))
              return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
            })
            .map((item, index) => (
              <TableTitleCell
                key={index}
                title={toTWDate3(item.YYMM)}
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
