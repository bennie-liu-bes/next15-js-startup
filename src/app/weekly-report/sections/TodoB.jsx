import { Fragment } from 'react'
import { COLOR, OFFSET } from '@/config-global'

import { TableRow, TableHead, TableBody } from '@mui/material'

import TableFooter from '../components/TableFooter'
import { useFontSize } from '../context/useFontSize'
import TableWrapper from '../components/TableWrapper'
import TableDataCell from '../components/TableDataCell'
import TableTitleCell from '../components/TableTitleCell'
import TableBodyNodata from '../components/TableBodyNodata'
import TableDataCellDiff from '../components/TableDataCellDiff'
export default function TodoB({ data }) {
  const { fontSize } = useFontSize()

  return (
    <>
      <div
        id="todo-b-section"
        style={{ position: 'relative', top: OFFSET, visibility: 'hidden' }}
      />
      <TableWrapper title="柒-1(B)、應辦事項-契約規定應辦事項" colSpan={7}>
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
              <TableDataCell value={index + 1} rowSpan={2} textAlign="center" />
              <TableDataCell value={item.TODOB_NUM} rowSpan={2} isChanged={item.TODOB_NUM_CHANGE} />
              <TableDataCell value={item.TODOB_NO} rowSpan={2} isChanged={item.TODOB_NO_CHANGE} />
              <TableDataCell value={item.DELIVER_DATE} isChanged={item.DELIVER_DATE_CHANGE} />
              <TableDataCell value={item.ORGANIZER} isChanged={item.ORGANIZER_CHANGE} />
              <TableDataCell value={item.LISTED_TYPE_CH} isChanged={item.LISTED_TYPE_CH_CHANGE} />
              <TableDataCell
                value={item.REMARK}
                isChanged={item.REMARK_CHANGE}
                borderRight={false}
              />
            </TableRow>
            <TableRow sx={{ bgcolor: index % 2 === 1 && COLOR.BGCOLOR }}>
              <TableDataCellDiff
                title="📢 目前辦理狀況："
                originalText={item.STATUS_PRE}
                modifiedText={item.STATUS}
                isChanged={item.STATUS_CHANGE}
                colSpan={7}
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
          <TableTitleCell title="項次" width="80px" rowSpan={2} textAlign="center" />
          <TableTitleCell title="編號" width="80px" minWidth="80px" />
          <TableTitleCell title="項目" minWidth="100px" />
          <TableTitleCell title="預訂提送時間" minWidth="180px" />
          <TableTitleCell title="主辦單位(人員)" minWidth="180px" />
          <TableTitleCell title="列管情形" minWidth="180px" />
          <TableTitleCell title="備註" minWidth="180px" borderRight={false} />
        </TableRow>
      </TableHead>
    )
  }
}
