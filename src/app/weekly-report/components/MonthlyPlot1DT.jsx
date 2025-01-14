import { COLOR } from '@/config-global'
import { fm2, toTWDate4 } from '@/utils/fm'

import { TableRow, TableHead, TableBody, TableCell, TableFooter } from '@mui/material'

import TableWrapper from './TableWrapper'
import TableDataCell from './TableDataCell'
import TableTitleCell from './TableTitleCell'
import TableBodyNodata from './TableBodyNodata'
import { useFontSize } from '../context/useFontSize'

export default function MonthlyPlot2DT({ data }) {
  const { fontSize } = useFontSize()

  return (
    <TableWrapper title="" colSpan={9}>
      {tableHead()}
      {data ? tableBody() : <TableBodyNodata colSpan={9} />}
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
                  <TableDataCell value={toTWDate4(item.CALENDAR_DATE)} textAlign="center" />
                  <TableDataCell value={fm2(item.CONSTRUCTION_PERCENT)} textAlign="right" />
                  <TableDataCell value={fm2(item.EXP_CUMSUM_PERCENT)} textAlign="right" />
                  <TableDataCell value={fm2(item.ACT_CUMSUM_PERCENT)} textAlign="right" />
                  <TableDataCell value={fm2(item.REVENUE_PERCENT)} textAlign="right" />
                  <TableDataCell value={fm2(item.VALUATION_PERCENT)} textAlign="right" />
                  <TableDataCell
                    value={fm2(item.ACT_CUMSUM_PERCENT_AND_EXP_CUMSUM_PERCENT_DIFF)}
                    textAlign="right"
                  />
                  <TableDataCell
                    value={fm2(item.ACT_CUMSUM_PERCENT_AND_REVENUE_PERCENT_DIFF)}
                    textAlign="right"
                  />
                  <TableDataCell
                    value={fm2(item.ACT_CUMSUM_PERCENT_AND_VALUATION_PERCENT_DIFF)}
                    textAlign="right"
                  />
                </TableRow>
              )
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={9} sx={{ textAlign: 'left' }}>
              資料來源：
              <br />
              &emsp;• 工期進度：(月底日期 - 實際開工日期 + 1) / (預定完工日期 - 實際完工日期 + 1)
              <br />
              &emsp;• 預定進度：
              <br />
              &emsp;&emsp;○ 上月底前：營管系統-ED40查詢工地記事/累計預定進度
              <br />
              &emsp;&emsp;○ 本月起：營管系統-PR50全程預定施工進度/累計完成金額百分比
              <br />
              &emsp;• 實際進度：營管系統-ED40查詢工地記事/累計實際進度
              <br />
              &emsp;•
              營收進度：營管系統-9.46各工令會計進度表/完成契約工程(含已議定追加減)/累計發生數%
              <br />
              &emsp;• 計價進度：營管系統-9.11各工令財務管控分析表(JDE)
              <br />
              &emsp;&emsp;○ 保留款已開發票：已開發票計價金額 / 已開發票未入帳金額 * 100%
              <br />
              &emsp;&emsp;○ 保留款未開發票：(已開發票計價金額 + 保留款) / 已開發票未入帳金額 * 100%
              <br />
              單位：%
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
          <TableTitleCell title="工期進度" textAlign="right" fontColor="#000" />
          <TableTitleCell title="預定進度" textAlign="right" fontColor="#000" />
          <TableTitleCell title="實際進度" textAlign="right" fontColor="#000" />
          <TableTitleCell title="營收進度" textAlign="right" fontColor="#000" />
          <TableTitleCell title="計價進度" textAlign="right" fontColor="#000" />
          <TableTitleCell title="實際-預定" textAlign="right" fontColor="#000" />
          <TableTitleCell title="實際-營收" textAlign="right" fontColor="#000" />
          <TableTitleCell title="實際-計價" textAlign="right" fontColor="#000" />
        </TableRow>
      </TableHead>
    )
  }
}
