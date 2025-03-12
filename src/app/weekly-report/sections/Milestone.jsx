import { Fragment } from 'react'
import { toTWDate } from '@/utils/fm'
import { COLOR, OFFSET } from '@/config-global.js'

import { grey, purple } from '@mui/material/colors'
import NoteAltIcon from '@mui/icons-material/NoteAlt'
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert'
import { TableRow, TableHead, TableBody } from '@mui/material'

import TableFooter from '../components/TableFooter'
import { useFontSize } from '../context/useFontSize'
import TableWrapper from '../components/TableWrapper'
import TableDataCell from '../components/TableDataCell'
import TableTitleCell from '../components/TableTitleCell'
import TableBodyNodata from '../components/TableBodyNodata'
import TableDataCellDiff from '../components/TableDataCellDiff'

export default function Milestone({ data }) {
  const { fontSize } = useFontSize()

  return (
    <>
      <div
        id="milestone-section"
        style={{ position: 'relative', top: OFFSET, visibility: 'hidden' }}
      />
      <TableWrapper title="伍-1、里程碑" colSpan={7}>
        {tableHead()}
        {data.length > 0 ? tableBody() : <TableBodyNodata colSpan={7} />}
      </TableWrapper>
    </>
  )

  function tableBody() {
    return (
      <TableBody sx={{ '& .MuiTypography-root': { fontSize: `${fontSize}rem` } }}>
        {data.map((item, index) => (
          <Fragment key={index}>
            <TableRow sx={{ bgcolor: index % 2 === 1 && COLOR.BGCOLOR }}>
              <TableDataCell value={index + 1} rowSpan={3} textAlign="center" />
              <TableDataCell
                rowSpan={3}
                value={
                  item.MILESTONE_NO_SUB +
                  `${item.COMPLETION_DATE && new Date(item.COMPLETION_DATE) <= new Date() && '\n(已完工)'}`
                }
                isChanged={item.MILESTONE_NO_SUB_CHANGE}
                sx={{ color: COLOR.ALERTCOLOR }}
              />
              <TableDataCell
                value={toTWDate(item.MILESTONE_DATE)}
                isChanged={item.MILESTONE_DATE_CHANGE}
                sx={{ color: COLOR.ALERTCOLOR }}
              />
              <TableDataCell
                value={toTWDate(item.POSTPONE_E_DATE)}
                isChanged={item.POSTPONE_E_DATE_CHANGE}
                sx={{ color: COLOR.ALERTCOLOR }}
              />
              <TableDataCell
                value={toTWDate(item.COMPLETION_DATE)}
                isChanged={item.COMPLETION_DATE_CHANGE}
                sx={{ color: COLOR.ALERTCOLOR }}
              />
              <TableDataCell
                value={item.MILESTONE}
                isChanged={item.MILESTONE_CHANGE}
                sx={{ color: COLOR.ALERTCOLOR }}
              />
              <TableDataCell
                value={item.OVERDUE_FINE_D}
                isChanged={item.OVERDUE_FINE_D_CHANGE}
                borderRight={false}
                sx={{ color: COLOR.ALERTCOLOR }}
              />
            </TableRow>
            <TableRow sx={{ bgcolor: index % 2 === 1 && COLOR.BGCOLOR }}>
              <TableDataCellDiff
                icon={<CrisisAlertIcon sx={{ color: purple[400] }} />}
                title="逾期罰則："
                originalText={item.OVERDUE_FINE_PRE}
                modifiedText={item.OVERDUE_FINE}
                colSpan={6}
                isChanged={item.OVERDUE_FINE_CHANGE}
                borderRight={false}
              />
            </TableRow>
            <TableRow sx={{ bgcolor: index % 2 === 1 && COLOR.BGCOLOR }}>
              <TableDataCellDiff
                icon={<NoteAltIcon sx={{ color: grey[600] }} />}
                title="備註："
                originalText={item.REMARK_PRE}
                modifiedText={item.REMARK}
                colSpan={6}
                isChanged={item.REMARK_CHANGE}
                borderRight={false}
              />
            </TableRow>
          </Fragment>
        ))}
        <TableFooter wkDate={data[0].CALENDAR_DATE} colSpan={7} />
      </TableBody>
    )
  }

  function tableHead() {
    return (
      <TableHead
        sx={{ bgcolor: COLOR.HEADER, '& .MuiTypography-root': { fontSize: `${fontSize}rem` } }}
      >
        <TableRow>
          <TableTitleCell title="項次" width="80px" rowSpan={3} textAlign="center" />
          <TableTitleCell title="里程碑序號" minWidth="140px" />
          <TableTitleCell title="原契約完工日" minWidth="160px" />
          <TableTitleCell title="展延後完工日" minWidth="160px" />
          <TableTitleCell title="實際完工日" minWidth="160px" />
          <TableTitleCell title="完成交付項目" minWidth="200px" />
          <TableTitleCell title="預估逾期罰款" minWidth="160px" borderRight={false} />
        </TableRow>
      </TableHead>
    )
  }
}
