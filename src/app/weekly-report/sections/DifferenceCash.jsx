import { Fragment } from 'react'
import { COLOR, OFFSET } from '@/config-global'
import { fmNoUnit, toTWDate } from '@/utils/fm'

import { grey } from '@mui/material/colors'
import NoteAltIcon from '@mui/icons-material/NoteAlt'
import { TableRow, TableHead, TableBody } from '@mui/material'

import TableFooter from '../components/TableFooter'
import { useFontSize } from '../context/useFontSize'
import TableWrapper from '../components/TableWrapper'
import TableDataCell from '../components/TableDataCell'
import TableTitleCell from '../components/TableTitleCell'
import TableBodyNodata from '../components/TableBodyNodata'

export default function DifferenceCash({ data }) {
  const { fontSizeAlt } = useFontSize()
  return (
    <>
      <div
        id="difference-cash-section"
        style={{ position: 'relative', top: OFFSET, visibility: 'hidden' }}
      />
      <TableWrapper title="參-2、預估三個月/實際開發票、入帳日期及金額" colSpan={12}>
        {tableHead()}
        {data.length > 0 ? tableBody() : <TableBodyNodata colSpan={12} />}
      </TableWrapper>
    </>
  )

  function tableBody() {
    return (
      <TableBody sx={{ '& .MuiTypography-root': { fontSize: `${fontSizeAlt}rem` } }}>
        {data.map((item, index) => (
          <Fragment key={index}>
            <TableRow sx={{ bgcolor: index % 2 === 1 && COLOR.BGCOLOR }}>
              <TableDataCell value={index + 1} rowSpan={2} textAlign="center" />
              <TableDataCell value={`${toTWDate(item.ESTM_START)}~\n${toTWDate(item.ESTM_END)}`} />
              <TableDataCell value={item.CMP_ITEM_DESC} />
              <TableDataCell value={item.ESTM_COUNT} />
              <TableDataCell
                value={toTWDate(item.PRE_VOI_DAY)}
                isChanged={item.PRE_VOI_DAY_CHANGE}
                textAlign="center"
              />
              <TableDataCell
                value={fmNoUnit(item.PRE_VOI_AMOUNT)}
                isChanged={item.PRE_VOI_AMOUNT_CHANGE}
                textAlign="right"
              />
              <TableDataCell
                value={toTWDate(item.PRE_RCVAMT_DAY)}
                isChanged={item.PRE_RCVAMT_DAY_CHANGE}
                textAlign="center"
              />
              <TableDataCell
                value={fmNoUnit(item.PRE_RCVAMT_AMOUNT)}
                isChanged={item.PRE_RCVAMT_AMOUNT_CHANGE}
                textAlign="right"
              />
              <TableDataCell
                value={toTWDate(item.VOI_DAY)}
                isChanged={item.VOI_DAY_CHANGE}
                textAlign="center"
              />
              <TableDataCell
                value={fmNoUnit(item.TOT_VOIAMT)}
                isChanged={item.TOT_VOIAMT_CHANGE}
                textAlign="right"
              />
              <TableDataCell
                value={toTWDate(item.RCVAMT_DAY)}
                isChanged={item.RCVAMT_DAY_CHANGE}
                textAlign="center"
              />
              <TableDataCell
                value={fmNoUnit(item.RCVAMT)}
                isChanged={item.RCVAMT_CHANGE}
                textAlign="right"
                borderRight={false}
              />
            </TableRow>
            <TableRow sx={{ bgcolor: index % 2 === 1 && COLOR.BGCOLOR }}>
              <TableDataCell
                icon={<NoteAltIcon sx={{ color: grey[600] }} />}
                colSpan={11}
                title={`${item.REMARK}`}
                isChanged={item.REMARK_CHANGE}
                borderRight={false}
              />
            </TableRow>
          </Fragment>
        ))}
        <TableFooter wkDate={data[0].CALENDAR_DATE} colSpan={12} />
      </TableBody>
    )
  }

  function tableHead() {
    return (
      <TableHead
        sx={{
          bgcolor: COLOR.HEADER,
          '& .MuiTypography-root': { fontSize: `${fontSizeAlt}rem` },
        }}
      >
        <TableRow>
          <TableTitleCell title="項次" rowSpan={3} textAlign="center" width="60px" />
          <TableTitleCell title="工程款期間" sx={{ minWidth: '80px' }} rowSpan={2} />
          <TableTitleCell
            title="計價項目"
            sx={{ minWidth: '100px' }}
            rowSpan={2}
            minWidth="100px"
          />
          <TableTitleCell title="期別" sx={{ minWidth: '40px' }} rowSpan={2} minWidth="60px" />
          <TableTitleCell
            title="預估"
            colSpan={4}
            sx={{ bgcolor: COLOR.HEADER1 }}
            textAlign="center"
          />
          <TableTitleCell
            title="實際"
            colSpan={4}
            sx={{ bgcolor: COLOR.HEADER2 }}
            textAlign="center"
            borderRight={false}
          />
        </TableRow>
        <TableRow>
          <TableTitleCell
            title="開發票日期"
            sx={{ bgcolor: COLOR.HEADER1 }}
            minWidth="110px"
            textAlign="center"
          />
          <TableTitleCell title="發票金額" sx={{ bgcolor: COLOR.HEADER1 }} textAlign="right" />
          <TableTitleCell title="入帳日" sx={{ bgcolor: COLOR.HEADER1 }} textAlign="center" />
          <TableTitleCell title="入帳金額" sx={{ bgcolor: COLOR.HEADER1 }} textAlign="right" />
          <TableTitleCell
            title="開發票日期"
            sx={{ bgcolor: COLOR.HEADER2 }}
            minWidth="110px"
            textAlign="center"
          />
          <TableTitleCell title="發票金額" sx={{ bgcolor: COLOR.HEADER2 }} textAlign="right" />
          <TableTitleCell title="入帳日" sx={{ bgcolor: COLOR.HEADER2 }} textAlign="center" />
          <TableTitleCell
            title="入帳金額"
            sx={{ bgcolor: COLOR.HEADER2 }}
            textAlign="right"
            borderRight={false}
          />
        </TableRow>
        {/* <TableRow>
          <TableTitleCell title="備註" colSpan={11} borderRight={false} />
        </TableRow> */}
      </TableHead>
    )
  }
}
