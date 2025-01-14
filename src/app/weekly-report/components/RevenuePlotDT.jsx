import { COLOR } from '@/config-global'
import { fmNoUnit, toTWDate3 } from '@/utils/fm'

import { TableRow, TableHead, TableBody, TableCell, TableFooter } from '@mui/material'

import TableWrapper from './TableWrapper'
import TableDataCell from './TableDataCell'
import TableTitleCell from './TableTitleCell'
import TableBodyNodata from './TableBodyNodata'
import { useFontSize } from '../context/useFontSize'

export default function RevenuePlotDT({ data }) {
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
            <TableCell colSpan={7} sx={{ textAlign: 'right' }}>
              資料來源：智慧決策平台-損益表/營建收入明細 單位：新台幣元
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
          <TableTitleCell title="單月預定" textAlign="right" fontColor="#000" />
          <TableTitleCell title="單月實際" textAlign="right" fontColor="#000" />
          <TableTitleCell title="單月差異" textAlign="right" fontColor="#000" />
          <TableTitleCell title="累計預定" textAlign="right" fontColor="#000" />
          <TableTitleCell title="累計實際" textAlign="right" fontColor="#000" />
          <TableTitleCell title="累計差異" textAlign="right" fontColor="#000" />
        </TableRow>
      </TableHead>
    )
  }
}
