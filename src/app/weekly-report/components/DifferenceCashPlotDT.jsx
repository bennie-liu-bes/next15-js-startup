import { useState } from 'react'
import { COLOR } from '@/config-global'
import { fmNoUnit, toTWDate3 } from '@/utils/fm'

import { TableRow, TableHead, TableBody, TableCell, TableFooter } from '@mui/material'

import TableWrapper from './TableWrapper'
import TableDataCell from './TableDataCell'
import TableTitleCell from './TableTitleCell'
import TableBodyNodata from './TableBodyNodata'
import { useFontSize } from '../context/useFontSize'

export default function DifferenceCashPlotDT({ data }) {
  console.log(data)
  const { fontSize } = useFontSize()
  const [sortOrder, setSortOrder] = useState('desc')

  const handleSort = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))
  }

  return (
    <TableWrapper title="" colSpan={5}>
      {tableHead()}
      {data ? tableBody() : <TableBodyNodata colSpan={5} />}
    </TableWrapper>
  )

  function tableBody() {
    return (
      <>
        <TableBody sx={{ '& .MuiTypography-root': { fontSize: `${fontSize}rem` } }}>
          {[...data]
            .sort((a, b) => {
              const dateA = new Date(a.YYMM.replace(/(\d{4})(\d{2})/, '$1/$2/01'))
              const dateB = new Date(b.YYMM.replace(/(\d{4})(\d{2})/, '$1/$2/01'))
              return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
            })
            .map((item, index) => (
              <TableRow key={index}>
                <TableDataCell value={toTWDate3(item.YYMM)} textAlign="center" />
                <TableDataCell
                  value={fmNoUnit(item.THE_MONTH_CASH_RECEIPTS_AND_PAYMENTS_DIFFERENTS)}
                  textAlign="right"
                />
                <TableDataCell
                  value={fmNoUnit(item.CUMULATIVE_CASH_RECEIPTS_AND_PAYMENTS_DIFFERENTS)}
                  textAlign="right"
                />
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={7} sx={{ textAlign: 'left' }}>
              資料來源：營管系統-9.6工務所現金差異追蹤管控
              <br />
              單位：新台幣元
            </TableCell>
          </TableRow>
        </TableFooter>
      </>
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
            title={`進度日期${sortOrder === 'asc' ? '🔺' : '🔻'}`}
            textAlign="center"
            fontColor="#000"
            minWidth="145px"
            onClick={handleSort}
            sx={{
              cursor: 'pointer',
              '&:hover': { opacity: 0.8 },
            }}
          />
          <TableTitleCell
            title="當月現金收支差異"
            textAlign="right"
            fontColor="#000"
            minWidth="200px"
          />
          <TableTitleCell
            title="累計現金收支差異"
            textAlign="right"
            fontColor="#000"
            minWidth="200px"
          />
        </TableRow>
      </TableHead>
    )
  }
}
