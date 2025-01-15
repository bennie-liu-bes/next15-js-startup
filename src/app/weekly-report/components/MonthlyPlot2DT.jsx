import { useState } from 'react'
import { COLOR } from '@/config-global'
import { fmNoUnit, toTWDate3 } from '@/utils/fm'

import { TableRow, TableHead, TableBody, TableCell, TableFooter } from '@mui/material'

import { useFontSize } from '../context/useFontSize'
import TableWrapper from '../components/TableWrapper'
import TableDataCell from '../components/TableDataCell'
import TableTitleCell from '../components/TableTitleCell'
import TableBodyNodata from '../components/TableBodyNodata'

export default function MonthlyPlot2DT({ data }) {
  const { fontSize } = useFontSize()
  const [sortOrder, setSortOrder] = useState('desc')

  const handleSort = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))
  }

  return (
    <TableWrapper title="" colSpan={7}>
      {tableHead()}
      {data ? tableBody() : <TableBodyNodata colSpan={7} />}
    </TableWrapper>
  )

  function tableBody() {
    return (
      <>
        <TableBody sx={{ '& .MuiTypography-root': { fontSize: `${fontSize}rem` } }}>
          {[...data]
            .sort((a, b) => {
              const dateA = new Date(a.CALENDAR_DATE)
              const dateB = new Date(b.CALENDAR_DATE)
              return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
            })
            .map(
              (item, index) =>
                item.REVENUE_LISTED_BUT_NOT_PRICED_AMT !== null && (
                  <TableRow key={index}>
                    <TableDataCell
                      value={toTWDate3(item.CALENDAR_DATE.substring(0, 7).replace('/', ''))}
                      textAlign="center"
                    />
                    <TableDataCell value={fmNoUnit(item.CURREV)} textAlign="right" />
                    <TableDataCell value={fmNoUnit(item.ENGAMT)} textAlign="right" />
                    <TableDataCell value={fmNoUnit(item.RSVAMT)} textAlign="right" />
                    <TableDataCell value={item.RSV_INVOI_CH} />
                    <TableDataCell value={fmNoUnit(item.SAFAMT)} textAlign="right" />
                    <TableDataCell
                      value={fmNoUnit(item.REVENUE_LISTED_BUT_NOT_PRICED_AMT)}
                      textAlign="right"
                    />
                  </TableRow>
                )
            )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={7} sx={{ textAlign: 'left' }}>
              資料來源：營管系統-9.11各工令財務管控分析表(JDE)
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
          <TableTitleCell title="應收工程款" textAlign="right" fontColor="#000" minWidth="135px" />
          <TableTitleCell
            title="已開發票計價金額"
            textAlign="right"
            fontColor="#000"
            minWidth="195px"
          />
          <TableTitleCell title="保留款" textAlign="right" fontColor="#000" minWidth="135px" />
          <TableTitleCell title="開發票狀態" fontColor="#000" minWidth="135px" />
          <TableTitleCell title="其他" textAlign="right" fontColor="#000" minWidth="80px" />
          <TableTitleCell
            title="已列入營收未計價金額"
            borderRight={false}
            textAlign="right"
            fontColor="#000"
            minWidth="235px"
          />
        </TableRow>
      </TableHead>
    )
  }
}
