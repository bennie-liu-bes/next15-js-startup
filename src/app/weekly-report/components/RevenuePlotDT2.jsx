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

export default function RevenuePlotDT({ data }) {
  const { fontSize } = useFontSize()
  const [sortOrder, setSortOrder] = useState('asc')

  const handleSort = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))
  }

  return (
    <TableWrapper
      title=""
      colSpan={5}
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
      const dateA = new Date(a.YM.replace(/(\d{4})(\d{2})/, '$1/$2/01'))
      const dateB = new Date(b.YM.replace(/(\d{4})(\d{2})/, '$1/$2/01'))
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
    })

    return (
      <TableBody sx={{ '& .MuiTypography-root': { fontSize: `${fontSize}rem` } }}>
        <TableRow>
          <TableTitleCell
            title="單月預定營收"
            textAlign="left"
            fontColor="#000"
            className="sticky-column"
          />
          {sortedData.map((item, index) => (
            <TableDataCell key={index} value={fmNoUnit(item.BAGBAMT)} textAlign="right" />
          ))}
        </TableRow>
        <TableRow>
          <TableTitleCell
            title="單月實際營收"
            textAlign="left"
            fontColor="#000"
            className="sticky-column"
          />
          {sortedData.map((item, index) => (
            <TableDataCell key={index} value={fmNoUnit(item.AAGBAMT)} textAlign="right" />
          ))}
        </TableRow>
        <TableRow sx={{ borderBottom: '2px double #000' }}>
          <TableTitleCell
            title="單月營收差異"
            textAlign="left"
            fontColor="#000"
            className="sticky-column"
          />
          {sortedData.map((item, index) => (
            <TableDataCell
              key={index}
              value={fmNoUnit(item.AAGBAMT - item.BAGBAMT)}
              textAlign="right"
            />
          ))}
        </TableRow>
        <TableRow>
          <TableTitleCell
            title="年度累計預定營收"
            textAlign="left"
            fontColor="#000"
            className="sticky-column"
          />
          {sortedData.map((item, index) => (
            <TableDataCell key={index} value={fmNoUnit(item.BAYAMT)} textAlign="right" />
          ))}
        </TableRow>
        <TableRow>
          <TableTitleCell
            title="年度累計實際營收"
            textAlign="left"
            fontColor="#000"
            className="sticky-column"
          />
          {sortedData.map((item, index) => (
            <TableDataCell key={index} value={fmNoUnit(item.AAYAMT)} textAlign="right" />
          ))}
        </TableRow>
        <TableRow>
          <TableTitleCell
            title="年度累計營收差異"
            textAlign="left"
            fontColor="#000"
            className="sticky-column"
          />
          {sortedData.map((item, index) => (
            <TableDataCell
              key={index}
              value={fmNoUnit(item.AAYAMT - item.BAYAMT)}
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
              const dateA = new Date(a.YM.replace(/(\d{4})(\d{2})/, '$1/$2/01'))
              const dateB = new Date(b.YM.replace(/(\d{4})(\d{2})/, '$1/$2/01'))
              return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
            })
            .map((item, index) => (
              <TableTitleCell
                key={index}
                title={toTWDate3(item.YM)}
                textAlign="center"
                fontColor="#000"
                minWidth="160px"
                data-month={toTWDate3(item.YM)}
              />
            ))}
        </TableRow>
      </TableHead>
    )
  }
}
