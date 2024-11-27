import { fm2, toTWDate } from '@/utils/fm'
import { COLOR, OFFSET } from '@/config-global'

import { TableRow, TableHead, TableBody } from '@mui/material'

import TableFooter from '../components/TableFooter'
import TableWrapper from '../components/TableWrapper'
import TableDataCell from '../components/TableDataCell'
import TableTitleCell from '../components/TableTitleCell'
import TableBodyNodata from '../components/TableBodyNodata'

export default function Weekly({ data }) {
  return (
    <>
      <div
        id="weekly-section"
        style={{ position: 'relative', top: OFFSET, visibility: 'hidden' }}
      />
      <TableWrapper title="✨ 壹、週進度(單位：％)" colSpan={5}>
        {data && tableHead()}
        {data ? tableBody() : <TableBodyNodata colSpan={5} />}
      </TableWrapper>
    </>
  )

  function tableBody() {
    return (
      <TableBody>
        <TableRow>
          <TableDataCell value="預定累計" />
          <TableDataCell value={fm2(data.EXP_PERCENT1)} textAlign="right" />
          <TableDataCell value={fm2(data.EXP_PERCENT2)} textAlign="right" />
          <TableDataCell value={fm2(data.EXP_PERCENT3)} textAlign="right" />
          <TableDataCell
            value={fm2(data.EXP_PERCENT4)}
            textAlign="right"
            isChanged={'true'}
            borderRight={false}
          />
        </TableRow>
        <TableRow>
          <TableDataCell value="實際累計" />
          <TableDataCell value={fm2(data.ACT_SUM1)} textAlign="right" />
          <TableDataCell value={fm2(data.ACT_SUM2)} textAlign="right" />
          <TableDataCell value={fm2(data.ACT_SUM3)} textAlign="right" />
          <TableDataCell
            value={fm2(data.ACT_SUM4)}
            textAlign="right"
            isChanged={'true'}
            borderRight={false}
          />
        </TableRow>
        <TableRow>
          <TableDataCell value="差異" />
          <TableDataCell value={fm2(data.ACT_SUM1 - data.EXP_PERCENT1)} textAlign="right" />
          <TableDataCell value={fm2(data.ACT_SUM2 - data.EXP_PERCENT2)} textAlign="right" />
          <TableDataCell value={fm2(data.ACT_SUM3 - data.EXP_PERCENT3)} textAlign="right" />
          <TableDataCell
            value={fm2(data.ACT_SUM4 - data.EXP_PERCENT4)}
            textAlign="right"
            isChanged={'true'}
            borderRight={false}
          />
        </TableRow>
        <TableRow>
          <TableDataCell
            colSpan={5}
            value={`📢 差異說明：\n${data.REMARK_D}`}
            isChanged={data.REMARK_D_CHANGE}
            borderRight={false}
          />
        </TableRow>
        <TableRow>
          <TableDataCell
            colSpan={5}
            value={`📄 備註：\n${data.REMARK}`}
            isChanged={data.REMARK_CHANGE}
            borderRight={false}
          />
        </TableRow>
        <TableFooter wkDate={data.CALENDAR_DATE} colSpan={5} />
      </TableBody>
    )
  }

  function tableHead() {
    return (
      <TableHead sx={{ bgcolor: COLOR.HEADER }}>
        <TableRow>
          <TableTitleCell title="日期" minWidth="120px" />
          <TableTitleCell
            title={toTWDate(data.WORK_DATE1)}
            sx={{ minWidth: '160px' }}
            textAlign="right"
          />
          <TableTitleCell
            title={toTWDate(data.WORK_DATE2)}
            sx={{ minWidth: '160px' }}
            textAlign="right"
          />
          <TableTitleCell
            title={toTWDate(data.WORK_DATE3)}
            sx={{ minWidth: '160px' }}
            textAlign="right"
          />
          <TableTitleCell
            title={toTWDate(data.WORK_DATE4)}
            sx={{ minWidth: '160px' }}
            textAlign="right"
            borderRight={false}
          />
        </TableRow>
      </TableHead>
    )
  }
}
