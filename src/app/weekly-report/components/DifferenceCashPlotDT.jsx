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
          {data.map((item, index) => (
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
            <TableCell colSpan={7} sx={{ textAlign: 'right' }}>
              資料來源：營管系統-9.6工務所現金差異追蹤管控 單位：新台幣元
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
          <TableTitleCell title="進度日期" textAlign="center" fontColor="#000" />
          <TableTitleCell title="當月現金收支差異" textAlign="right" fontColor="#000" />
          <TableTitleCell title="累計現金收支差異" textAlign="right" fontColor="#000" />
        </TableRow>
      </TableHead>
    )
  }
}
