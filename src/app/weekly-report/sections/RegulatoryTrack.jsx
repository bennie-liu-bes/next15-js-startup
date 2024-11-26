import { Fragment } from 'react'
import { COLOR, OFFSET } from '@/config-global'
import { toTWDate, toTWDate2 } from '@/utils/fm'

import { TableRow, TableHead, TableBody } from '@mui/material'

import TableFooter from '../components/TableFooter'
import TableWrapper from '../components/TableWrapper'
import TableDataCell from '../components/TableDataCell'
import TableTitleCell from '../components/TableTitleCell'
import TableBodyNodata from '../components/TableBodyNodata'

export default function RegulatoryTrack({ data }) {
  const WARN_COLOR1 = '#AD2D37'
  const WARN_COLOR2 = '#FB6F92'
  return (
    <>
      <div
        id="regulatory-track-section"
        style={{ position: 'relative', top: OFFSET, visibility: 'hidden' }}
      />
      <TableWrapper title="✨ 柒-3、未來三個月採發提送管制追蹤" colSpan={8}>
        {tableHead()}
        {data.length > 0 ? tableBody() : <TableBodyNodata colSpan={8} />}
      </TableWrapper>
    </>
  )

  function tableBody() {
    return (
      <TableBody>
        {data.map((item, index) => (
          <Fragment key={index}>
            <TableRow sx={{ bgcolor: index % 2 === 1 && COLOR.BGCOLOR, height: '120px' }}>
              <TableDataCell value={index + 1} rowSpan={3} textAlign="center" />
              <TableDataCell value={item.CONTRACK_NO} />
              <TableDataCell value={item.CONTRACK_NANE} />
              <TableDataCell value={item.CONTRACK_LEVEL} />
              <TableDataCell
                value={toTWDate(item.RESERVE_DATE)}
                sx={{
                  bgcolor:
                    item.CHECK_1 === 'TRUE'
                      ? WARN_COLOR1
                      : item.CHECK_2 === 'TRUE'
                        ? WARN_COLOR2
                        : undefined,
                  color: (item.CHECK_1 === 'TRUE' || item.CHECK_2 === 'TRUE') && '#FFF',
                }}
              />
              <TableDataCell
                value={toTWDate2(item.ACTUAL_DATE_COMB)}
                sx={{
                  color: item.CHECK_3 === 'TRUE' && WARN_COLOR1,
                }}
              />
              <TableDataCell
                value={toTWDate(item.TERM_DATE)}
                sx={{
                  bgcolor: item.CHECK_41 === 'TRUE' && WARN_COLOR1,
                  color: item.CHECK_41 === 'TRUE' && '#FFF',
                }}
              />
              <TableDataCell
                value={toTWDate(item.CONSTRUCTION_DATE)}
                borderRight={false}
                sx={{
                  bgcolor: item.CHECK_42 === 'TRUE' && WARN_COLOR1,
                  color: item.CHECK_42 === 'TRUE' && '#FFF',
                }}
              />
            </TableRow>
            <TableRow sx={{ bgcolor: index % 2 === 1 && COLOR.BGCOLOR }}>
              <TableDataCell
                colSpan={9}
                value={`📢 辦理情形：\n${item.REMARK}`}
                borderRight={false}
              />
            </TableRow>
            <TableRow sx={{ bgcolor: index % 2 === 1 && COLOR.BGCOLOR }}>
              <TableDataCell colSpan={9} value={`📄 備註：\n${item.REMARKR}`} borderRight={false} />
            </TableRow>
          </Fragment>
        ))}
        <TableFooter wkDate={data[0].CALENDAR_DATE} colSpan={10} />
      </TableBody>
    )
  }

  function tableHead() {
    return (
      <TableHead sx={{ bgcolor: COLOR.HEADER }}>
        <TableRow>
          <TableTitleCell title="項次" width="50px" rowSpan={3} textAlign="center" />
          <TableTitleCell title="合約編號" minWidth="80px" />
          <TableTitleCell title="案件名稱" minWidth="120px" />
          <TableTitleCell title="等級" width="50px" />
          <TableTitleCell title="管制提送日期" minWidth="160px" />
          <TableTitleCell title="實際提送日期(歷次修正)" minWidth="160px" />
          <TableTitleCell title="預定廠商確認日期" minWidth="160px" />
          <TableTitleCell title="預定開工日期" minWidth="160px" borderRight={false} />
        </TableRow>
        <TableRow>
          <TableTitleCell title="辦理情形" colSpan={7} borderRight={false} />
        </TableRow>
        <TableRow>
          <TableTitleCell title="備註" colSpan={7} borderRight={false} />
        </TableRow>
      </TableHead>
    )
  }
}
