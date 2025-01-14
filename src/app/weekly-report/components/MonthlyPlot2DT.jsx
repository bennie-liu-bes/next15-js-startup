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
          {data.map(
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
            <TableCell colSpan={7} sx={{ textAlign: 'right' }}>
              資料來源：營管系統-9.11各工令財務管控分析表(JDE) 單位：新台幣元
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
          <TableTitleCell title="應收工程款" textAlign="right" fontColor="#000" />
          <TableTitleCell title="已開發票計價金額" textAlign="right" fontColor="#000" />
          <TableTitleCell title="保留款" textAlign="right" fontColor="#000" />
          <TableTitleCell title="開發票狀態" fontColor="#000" />
          <TableTitleCell title="其他金額" textAlign="right" fontColor="#000" />
          <TableTitleCell
            title="已列入營收未計價金額"
            borderRight={false}
            textAlign="right"
            fontColor="#000"
          />
        </TableRow>
      </TableHead>
    )
  }
}
