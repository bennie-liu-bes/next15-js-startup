import { useState } from 'react'
import { COLOR } from '@/config-global'
import { fmNoUnit, toTWDate3 } from '@/utils/fm'

import { TableRow, TableHead, TableBody, TableCell, TableFooter } from '@mui/material'

import TableWrapper from './TableWrapper'
import TableDataCell from './TableDataCell'
import TableTitleCell from './TableTitleCell'
import TableBodyNodata from './TableBodyNodata'
import { useFontSize } from '../context/useFontSize'

export default function RevenuePlotDT({ data }) {
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
              const dateA = new Date(a.YM.replace(/(\d{4})(\d{2})/, '$1/$2/01'))
              const dateB = new Date(b.YM.replace(/(\d{4})(\d{2})/, '$1/$2/01'))
              return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
            })
            .map((item, index) => (
              <TableRow key={index}>
                <TableDataCell value={toTWDate3(item.YM)} textAlign="center" />
                <TableDataCell value={fmNoUnit(item.BAGBAMT)} textAlign="right" />
                <TableDataCell value={fmNoUnit(item.AAGBAMT)} textAlign="right" />
                <TableDataCell value={fmNoUnit(item.AAGBAMT - item.BAGBAMT)} textAlign="right" />
                <TableDataCell value={fmNoUnit(item.BAYAMT)} textAlign="right" />
                <TableDataCell value={fmNoUnit(item.AAYAMT)} textAlign="right" />
                <TableDataCell value={fmNoUnit(item.AAYAMT - item.BAYAMT)} textAlign="right" />
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={7} sx={{ textAlign: 'left' }}>
              資料來源：智慧決策平台-損益表/營建收入明細
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
          <TableTitleCell title="單月預定" textAlign="right" fontColor="#000" minWidth="140px" />
          <TableTitleCell title="單月實際" textAlign="right" fontColor="#000" minWidth="140px" />
          <TableTitleCell title="單月差異" textAlign="right" fontColor="#000" minWidth="140px" />
          <TableTitleCell title="累計預定" textAlign="right" fontColor="#000" minWidth="140px" />
          <TableTitleCell title="累計實際" textAlign="right" fontColor="#000" minWidth="140px" />
          <TableTitleCell title="累計差異" textAlign="right" fontColor="#000" minWidth="140px" />
        </TableRow>
      </TableHead>
    )
  }
}
