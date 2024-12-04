import { fm2, toTWDate } from '@/utils/fm'
import { COLOR, OFFSET } from '@/config-global'

import { TableRow, TableHead, TableBody } from '@mui/material'

import TableFooter from '../components/TableFooter'
import { useFontSize } from '../context/useFontSize'
import TableWrapper from '../components/TableWrapper'
import TableDataCell from '../components/TableDataCell'
import TableTitleCell from '../components/TableTitleCell'
import TableBodyNodata from '../components/TableBodyNodata'
import TableDataCellDiff from '../components/TableDataCellDiff'
export default function Weekly({ data }) {
  const { fontSize } = useFontSize()

  return (
    <>
      <div
        id="weekly-section"
        style={{ position: 'relative', top: OFFSET, visibility: 'hidden' }}
      />
      <TableWrapper title="壹、週進度(單位：％)" colSpan={5}>
        {data && tableHead()}
        {data ? tableBody() : <TableBodyNodata colSpan={5} />}
      </TableWrapper>
    </>
  )

  function tableBody() {
    return (
      <TableBody sx={{ '& .MuiTypography-root': { fontSize: `${fontSize}rem` } }}>
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
          <TableDataCellDiff
            title="📢 差異說明："
            originalText={data.REMARK_D_PRE}
            modifiedText={data.REMARK_D}
            colSpan={5}
            isChanged={data.REMARK_D_CHANGE}
          />
        </TableRow>
        <TableRow>
          <TableDataCellDiff
            title="📄 備註："
            originalText={data.REMARK_PRE}
            modifiedText={data.REMARK}
            colSpan={5}
            isChanged={data.REMARK_CHANGE}
          />
        </TableRow>
        <TableFooter wkDate={data.CALENDAR_DATE} colSpan={5} />
      </TableBody>
    )
  }

  function tableHead() {
    return (
      <TableHead
        sx={{ bgcolor: COLOR.HEADER, '& .MuiTypography-root': { fontSize: `${fontSize}rem` } }}
      >
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
