import { Fragment } from 'react'
import { fmNoUnit, toTWDate } from '@/utils/fm'
import { COLOR, OFFSET } from '@/config-global'

import { red, grey } from '@mui/material/colors'
import NoteAltIcon from '@mui/icons-material/NoteAlt'
import CampaignIcon from '@mui/icons-material/Campaign'
import { TableRow, TableHead, TableBody } from '@mui/material'

import TableFooter from '../components/TableFooter'
import { useFontSize } from '../context/useFontSize'
import TableWrapper from '../components/TableWrapper'
import TableDataCell from '../components/TableDataCell'
import TableTitleCell from '../components/TableTitleCell'
import TableBodyNodata from '../components/TableBodyNodata'

export default function CriticalpathCco({ data }) {
  const { fontSize } = useFontSize()

  return (
    <>
      <div
        id="criticalpath-cco-section"
        style={{ position: 'relative', top: OFFSET, visibility: 'hidden' }}
      />
      <TableWrapper title="陸、契約變更" colSpan={6}>
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
              <TableDataCell value={index + 1} rowSpan={3} textAlign="center" />
              <TableDataCell value={item.CCO_NO} isChanged={item.CCO_NO_CHANGE} />
              <TableDataCell value={item.CCO_ITEM} isChanged={item.CCO_ITEM_CHANGE} />
              <TableDataCell value={fmNoUnit(item.CCO_AMONT)} isChanged={item.CCO_AMONT_CHANGE} />
              <TableDataCell
                value={item.CCO_CDSUM_EXPLAIN}
                isChanged={item.CCO_CDSUM_EXPLAIN_CHANGE}
              />
              <TableDataCell
                value={toTWDate(item.CCO_FDATE)}
                isChanged={item.CCO_FDATE_CHANGE}
                borderRight={false}
              />
            </TableRow>
            <TableRow sx={{ bgcolor: index % 2 === 1 && COLOR.BGCOLOR }}>
              <TableDataCell
                icon={<CampaignIcon sx={{ color: red[400] }} />}
                title="辦理情形："
                value={item.STATUS}
                isChanged={item.STATUS_CHANGE}
                colSpan={5}
                borderRight={false}
              />
            </TableRow>
            <TableRow sx={{ bgcolor: index % 2 === 1 && COLOR.BGCOLOR }}>
              <TableDataCell
                icon={<NoteAltIcon sx={{ color: grey[600] }} />}
                title="備註："
                value={item.REMARK}
                isChanged={item.REMARK_CHANGE}
                colSpan={5}
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
          <TableTitleCell title="項次" width="80px" rowSpan={3} textAlign="center" />
          <TableTitleCell title="契約變更編號" minWidth="160px" />
          <TableTitleCell title="事由" minWidth="200px" />
          <TableTitleCell title="案件金額" minWidth="120px" />
          <TableTitleCell title="變更金額及計價情形說明" minWidth="260px" />
          <TableTitleCell title="契約變更完成日" minWidth="180px" borderRight={false} />
        </TableRow>
        {/* <TableRow>
          <TableTitleCell title="辦理情形" colSpan={5} borderRight={false} />
        </TableRow>
        <TableRow>
          <TableTitleCell title="備註" colSpan={5} borderRight={false} />
        </TableRow> */}
      </TableHead>
    )
  }
}
