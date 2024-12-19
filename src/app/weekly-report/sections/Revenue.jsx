import { COLOR, OFFSET } from '@/config-global'
import { BORDER_RADIUS } from '@/config-global.js'
import { fmNoUnit, toTWDate5, toTWDate6 } from '@/utils/fm'

import { red, grey } from '@mui/material/colors'
import NoteAltIcon from '@mui/icons-material/NoteAlt'
import CampaignIcon from '@mui/icons-material/Campaign'
import { Paper, TableRow, TableHead, TableBody } from '@mui/material'

import TableFooter from '../components/TableFooter'
import RevenuePlot from '../components/RevenuePlot'
import { useFontSize } from '../context/useFontSize'
import TableWrapper from '../components/TableWrapper'
import TableDataCell from '../components/TableDataCell'
import TableTitleCell from '../components/TableTitleCell'
import TableBodyNodata from '../components/TableBodyNodata'
import TableDataCellDiff from '../components/TableDataCellDiff'

export default function Revenue({ data, frProjectIncome }) {
  const { fontSize } = useFontSize()

  return (
    <>
      <div
        id="revenue-section"
        style={{ position: 'relative', top: OFFSET, visibility: 'hidden' }}
      />
      <TableWrapper title="肆、營收管控(含物調)" colSpan={6}>
        {data && tableHead()}
        {data ? tableBody() : <TableBodyNodata colSpan={6} />}
      </TableWrapper>
      <Paper sx={{ borderRadius: BORDER_RADIUS, border: '1px solid #2C3E50', py: 1 }}>
        <RevenuePlot data={frProjectIncome} />
      </Paper>
    </>
  )

  function tableBody() {
    return (
      <TableBody sx={{ '& .MuiTypography-root': { fontSize: `${fontSize}rem` } }}>
        <TableRow>
          <TableDataCell value="修正營收" />
          <TableDataCell
            value={fmNoUnit(data.E_REVENUE_A)}
            isChanged={data.E_REVENUE_A_CHANGE}
            textAlign="right"
          />
          <TableDataCell
            value={fmNoUnit(data.E_REVENUE_B)}
            isChanged={data.E_REVENUE_B_CHANGE}
            textAlign="right"
          />
          <TableDataCell
            value={fmNoUnit(data.E_REVENUE_C)}
            isChanged={data.E_REVENUE_C_CHANGE}
            textAlign="right"
          />
          <TableDataCell
            value={fmNoUnit(data.A_GRAND_TOTAL)}
            isChanged={data.A_GRAND_TOTAL_CHANGE}
            textAlign="right"
            rowSpan={2}
          />
          <TableDataCell
            value={fmNoUnit(data.A_GRAND_TOTAL_O)}
            isChanged={data.A_GRAND_TOTAL_O_CHANGE}
            textAlign="right"
            rowSpan={2}
            borderRight={false}
          />
        </TableRow>
        <TableRow>
          <TableDataCell value="實際營收" />
          <TableDataCell
            value={`${fmNoUnit(data.A_REVENUE_A)}\n${data.A_REVENUE_A_DATE_RANGE}`}
            isChanged={data.A_REVENUE_A_CHANGE}
            textAlign="right"
          />
          <TableDataCell
            value={`${fmNoUnit(data.A_REVENUE_B)}\n${data.A_REVENUE_B_DATE_RANGE}`}
            isChanged={data.A_REVENUE_B_CHANGE}
            textAlign="right"
          />
          <TableDataCell
            value={`${fmNoUnit(data.A_REVENUE_C)}\n${data.A_REVENUE_C_DATE_RANGE}`}
            isChanged={data.A_REVENUE_C_CHANGE}
            textAlign="right"
          />
        </TableRow>
        <TableRow>
          <TableDataCellDiff
            icon={<CampaignIcon sx={{ color: red[400] }} />}
            colSpan={6}
            title="差異說明："
            originalText={data.DIF_RMK_PRE}
            modifiedText={data.DIF_RMK}
            isChanged={data.DIF_RMK_CHANGE}
            borderRight={false}
          />
        </TableRow>
        <TableRow>
          <TableDataCellDiff
            icon={<NoteAltIcon sx={{ color: grey[600] }} />}
            colSpan={6}
            title="備註："
            originalText={data.REMARK_PRE}
            modifiedText={data.REMARK}
            isChanged={data.REMARK_CHANGE}
            borderRight={false}
          />
        </TableRow>
        <TableFooter wkDate={data.CALENDAR_DATE} colSpan={6} />
      </TableBody>
    )
  }

  function tableHead() {
    return (
      <TableHead
        sx={{ bgcolor: COLOR.HEADER, '& .MuiTypography-root': { fontSize: `${fontSize}rem` } }}
      >
        <TableRow>
          <TableTitleCell title="" minWidth="120px" />
          <TableTitleCell
            title={toTWDate5(data.PREPER_TITLE_A)}
            minWidth="180px"
            textAlign="right"
          />
          <TableTitleCell
            title={toTWDate5(data.PREPER_TITLE_B)}
            minWidth="180px"
            textAlign="right"
          />
          <TableTitleCell
            title={toTWDate6(data.PREPER_TITLE_C.replace(/\\n/g, '\n'))}
            minWidth="180px"
            textAlign="right"
          />
          <TableTitleCell
            title={toTWDate6(data.A_GRAND_TOTAL_TITLE)}
            minWidth="180px"
            textAlign="right"
            rowSpan={2}
          />
          <TableTitleCell
            title={toTWDate6(data.A_GRAND_TOTAL_O_TITLE.replace(/\\n/g, '\n'))}
            minWidth="240px"
            textAlign="right"
            rowSpan={2}
            borderRight={false}
          />
        </TableRow>
        <TableRow>
          <TableTitleCell
            title="核定營收"
            fontColor="black"
            sx={{ bgcolor: 'white' }}
            isBold={false}
          />
          <TableTitleCell
            title={fmNoUnit(data.PREPER_AMT_A)}
            fontColor="black"
            bgcolor={data.PREPER_AMT_A_CHANGE === 'true' ? COLOR.CHANGE : 'white'}
            textAlign="right"
            sx={{ bgcolor: 'white' }}
          />
          <TableTitleCell
            title={fmNoUnit(data.PREPER_AMT_B)}
            bgcolor={data.PREPER_AMT_B_CHANGE === 'true' ? COLOR.CHANGE : 'white'}
            textAlign="right"
            fontColor="black"
            sx={{ bgcolor: 'white' }}
          />
          <TableTitleCell
            title={data.PREPER_ACCAMT_C_MOD}
            bgcolor={data.PREPER_ACCAMT_C_CHANGE === 'true' ? COLOR.CHANGE : 'white'}
            textAlign="right"
            fontColor="black"
            sx={{ bgcolor: 'white' }}
          />
        </TableRow>
      </TableHead>
    )
  }
}
