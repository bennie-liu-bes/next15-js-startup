import { Fragment } from 'react'
import { COLOR, OFFSET } from '@/config-global'
import { toTWDate, toTWDate2 } from '@/utils/fm'

import { TableRow, TableHead, TableBody } from '@mui/material'

import TableFooter from '../components/TableFooter'
import { useFontSize } from '../context/useFontSize'
import TableWrapper from '../components/TableWrapper'
import TableDataCell from '../components/TableDataCell'
import TableTitleCell from '../components/TableTitleCell'
import TableBodyNodata from '../components/TableBodyNodata'

export default function RegulatoryTrack({ data }) {
  const WARN_COLOR1 = '#AD2D37'
  const WARN_COLOR2 = '#FB6F92'
  const { fontSizeAlt } = useFontSize()

  return (
    <>
      <div
        id="regulatory-track-section"
        style={{ position: 'relative', top: OFFSET, visibility: 'hidden' }}
      />
      <TableWrapper title="柒-3、未來三個月採發提送管制追蹤" colSpan={10}>
        {tableHead()}
        {data.length > 0 ? tableBody() : <TableBodyNodata colSpan={10} />}
      </TableWrapper>
    </>
  )

  function tableBody() {
    return (
      <TableBody sx={{ '& .MuiTypography-root': { fontSize: `${fontSizeAlt}rem` } }}>
        {data.map((item, index) => (
          <Fragment key={index}>
            <TableRow sx={{ bgcolor: index % 2 === 1 && COLOR.BGCOLOR }} height="60px">
              <TableDataCell value={index + 1} textAlign="center" />
              <TableDataCell value={item.CONTRACK_NO} />
              <TableDataCell value={item.CONTRACK_NANE} />
              <TableDataCell value={item.CONTRACK_LEVEL} />
              <TableDataCell
                value={item.RESERVE_DATE && toTWDate(item.RESERVE_DATE)}
                tooltip={
                  item.CHECK_1 === 'TRUE'
                    ? '⚠️未提送警示\n已超過管制提送日期'
                    : item.CHECK_2 === 'TRUE'
                      ? `⚠️提送警示\n離管制提送日期尚有${Math.floor((new Date(item.RESERVE_DATE) - new Date()) / (1000 * 60 * 60 * 24))}天`
                      : undefined
                }
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
                value={item.ACTUAL_DATE_COMB && toTWDate2(item.ACTUAL_DATE_COMB)}
                tooltip={item.CHECK_3 === 'TRUE' ? '❗實際提送日期晚於管制提送日期' : undefined}
                sx={{
                  color: item.CHECK_3 === 'TRUE' && WARN_COLOR1,
                }}
              />
              <TableDataCell
                value={item.TERM_DATE && toTWDate(item.TERM_DATE)}
                tooltip={item.CHECK_41 === 'TRUE' && '⚠️未決標警示\n已超過預定廠商確認日期'}
                sx={{
                  bgcolor: item.CHECK_41 === 'TRUE' && WARN_COLOR1,
                  color: item.CHECK_41 === 'TRUE' && '#FFF',
                }}
              />
              <TableDataCell
                value={item.CONSTRUCTION_DATE && toTWDate(item.CONSTRUCTION_DATE)}
                tooltip={item.CHECK_42 === 'TRUE' && '⚠️未決標警示\n已超過預定開工日期'}
                sx={{
                  bgcolor: item.CHECK_42 === 'TRUE' && WARN_COLOR1,
                  color: item.CHECK_42 === 'TRUE' && '#FFF',
                }}
              />
              <TableDataCell
                value={item.REMARK && `${item.REMARK}`}
                sx={{ verticalAlign: 'top' }}
              />
              <TableDataCell
                value={item.REMARKR && `${item.REMARKR}`}
                borderRight={false}
                sx={{ verticalAlign: 'top' }}
              />
            </TableRow>
          </Fragment>
        ))}
        <TableFooter wkDate={data[0].CALENDAR_DATE} colSpan={10} />
      </TableBody>
    )
  }

  function tableHead() {
    return (
      <TableHead
        sx={{ bgcolor: COLOR.HEADER, '& .MuiTypography-root': { fontSize: `${fontSizeAlt}rem` } }}
      >
        <TableRow>
          <TableTitleCell title="項次" width="40px" textAlign="center" />
          <TableTitleCell title="合約編號" minWidth="100px" />
          <TableTitleCell title="案件名稱" minWidth="160px" />
          <TableTitleCell title="等級" width="40px" />
          <TableTitleCell title="管制提送日期" minWidth="120px" />
          <TableTitleCell title="實際提送日期(歷次修正)" minWidth="120px" />
          <TableTitleCell title="預定廠商確認日期" minWidth="120px" />
          <TableTitleCell title="預定開工日期" minWidth="120px" />
          <TableTitleCell title="辦理情形" minWidth="150px" />
          <TableTitleCell title="備註" minWidth="150px" borderRight={false} />
        </TableRow>
      </TableHead>
    )
  }
}
