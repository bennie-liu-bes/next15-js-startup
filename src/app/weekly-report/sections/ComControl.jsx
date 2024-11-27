import { COLOR, OFFSET } from '@/config-global'

import { TableRow, TableHead, TableBody } from '@mui/material'

import TableFooter from '../components/TableFooter'
import TableWrapper from '../components/TableWrapper'
import TableDataCell from '../components/TableDataCell'
import TableTitleCell from '../components/TableTitleCell'
import TableBodyNodata from '../components/TableBodyNodata'

export default function ComControl({ data }) {
  return (
    <>
      <div
        id="com-control-section"
        style={{ position: 'relative', top: OFFSET, visibility: 'hidden' }}
      />
      <TableWrapper title="✨ 捌、完工階段管控 - 小包合約結算辦理情形" colSpan={5}>
        {tableHead()}
        {data ? tableBody() : <TableBodyNodata colSpan={5} />}
      </TableWrapper>
    </>
  )

  function tableBody() {
    return (
      <TableBody>
        <TableRow>
          <TableDataCell
            value={data.SHOULD_BE}
            isChanged={data.SHOULD_BE_CHANGE}
            textAlign="center"
          />
          <TableDataCell
            value={data.ALREADY_APPROVED}
            isChanged={data.ALREADY_APPROVED_CHANGE}
            textAlign="center"
          />
          <TableDataCell
            value={data.UNDER_REVIEW}
            isChanged={data.UNDER_REVIEW_CHANGE}
            textAlign="center"
          />
          <TableDataCell
            value={data.SETTLEMENT}
            isChanged={data.SETTLEMENT_CHANGE}
            textAlign="center"
          />
          <TableDataCell value={data.REMARK} isChanged={data.REMARK_CHANGE} borderRight={false} />
        </TableRow>
        <TableFooter wkDate={data.CALENDAR_DATE} colSpan={5} />
      </TableBody>
    )
  }

  function tableHead() {
    return (
      <TableHead sx={{ bgcolor: COLOR.HEADER }}>
        <TableRow>
          <TableTitleCell title="應辦理小包結算數量(件)" minWidth="260px" />
          <TableTitleCell title="成控處已核備(件)" minWidth="200px" />
          <TableTitleCell title="成控處審核中(件)" minWidth="200px" />
          <TableTitleCell title="工務所結算中(件)" minWidth="200px" />
          <TableTitleCell title="備註" minWidth="200px" borderRight={false} />
        </TableRow>
      </TableHead>
    )
  }
}
