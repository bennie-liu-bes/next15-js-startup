import { Fragment } from 'react'
import { COLOR, OFFSET } from '@/config-global'

import { TableRow, TableHead, TableBody } from '@mui/material'

import TableFooter from '../components/TableFooter'
import { useFontSize } from '../context/useFontSize'
import TableWrapper from '../components/TableWrapper'
import TableDataCell from '../components/TableDataCell'
import TableTitleCell from '../components/TableTitleCell'
import TableBodyNodata from '../components/TableBodyNodata'

export default function Track({ data }) {
  const { fontSize } = useFontSize()

  return (
    <>
      <div id="track-section" style={{ position: 'relative', top: OFFSET, visibility: 'hidden' }} />
      <TableWrapper title="柒-2、追蹤管制事項" colSpan={6}>
        {tableHead()}
        {data.length > 0 ? tableBody() : <TableBodyNodata colSpan={6} />}
      </TableWrapper>
    </>
  )

  function tableBody() {
    return (
      <TableBody sx={{ '& .MuiTypography-root': { fontSize: `${fontSize}rem` } }}>
        {data.map((item, index) => (
          <Fragment key={index}>
            <TableRow sx={{ bgcolor: index % 2 === 1 && COLOR.BGCOLOR }}>
              <TableDataCell value={index + 1} textAlign="center" />
              <TableDataCell value={item.TRACK_NUM} isChanged={item.TRACK_NUM_CHANGE} />
              <TableDataCell value={item.TRACK_NO} isChanged={item.TRACK_NO_CHANGE} />
              <TableDataCell value={item.TRACK_ITEM} isChanged={item.TRACK_ITEM_CHANGE} />
              <TableDataCell value={item.STATUS} isChanged={item.STATUS_CHANGE} />
              <TableDataCell
                value={item.REMARK}
                isChanged={item.REMARK_CHANGE}
                borderRight={false}
              />
            </TableRow>
          </Fragment>
        ))}
        <TableFooter wkDate={data[0].CALENDAR_DATE} colSpan={6} />
      </TableBody>
    )
  }

  function tableHead() {
    return (
      <TableHead
        sx={{ bgcolor: COLOR.HEADER, '& .MuiTypography-root': { fontSize: `${fontSize}rem` } }}
      >
        <TableRow>
          <TableTitleCell title="項次" width="80px" textAlign="center" />
          <TableTitleCell title="編號" minWidth="80px" />
          <TableTitleCell title="項目" minWidth="80px" />
          <TableTitleCell title="事由" minWidth="80px" />
          <TableTitleCell title="辦理情形" minWidth="80px" />
          <TableTitleCell title="備註" minWidth="100px" borderRight={false} />
        </TableRow>
      </TableHead>
    )
  }
}
