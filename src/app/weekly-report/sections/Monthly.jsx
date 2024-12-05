import { diffWords } from 'diff'
import { fm2, fmNoUnit, toTWDate } from '@/utils/fm'
import { SIZE, COLOR, OFFSET } from '@/config-global'

import { red, grey } from '@mui/material/colors'
import NoteAltIcon from '@mui/icons-material/NoteAlt'
import CampaignIcon from '@mui/icons-material/Campaign'
import { Box, Stack, TableRow, TableHead, TableBody, TableCell, Typography } from '@mui/material'

import TableFooter from '../components/TableFooter'
import { useFontSize } from '../context/useFontSize'
import TableWrapper from '../components/TableWrapper'
import TableDataCell from '../components/TableDataCell'
import TableTitleCell from '../components/TableTitleCell'
import TableBodyNodata from '../components/TableBodyNodata'
import TableDataCellDiff from '../components/TableDataCellDiff'
export default function Monthly({ data }) {
  const { fontSize } = useFontSize()

  return (
    <>
      <div
        id="monthly-section"
        style={{ position: 'relative', top: OFFSET, visibility: 'hidden' }}
      />
      <TableWrapper title="貳、月進度差異值(單位：％，營收及計價進度計算不含物調款)" colSpan={4}>
        {data && tableHead()}
        {data ? tableBody() : <TableBodyNodata colSpan={4} />}
      </TableWrapper>
    </>
  )

  function tableBody() {
    return (
      <TableBody sx={{ '& .MuiTypography-root': { fontSize: `${fontSize}rem` } }}>
        <TableRow>
          <TableDataCell value="預定累計" />
          <TableDataCell
            value={fm2(data.EXP_PERCENT)}
            isChanged={data.EXP_PERCENT_CHANGE}
            textAlign="right"
          />
          <TableDataCell value={''} sx={{ bgcolor: COLOR.BGCOLOR }} />
          <TableDataCell value={''} sx={{ bgcolor: COLOR.BGCOLOR }} borderRight={false} />
        </TableRow>
        <TableRow>
          <TableDataCell value="實際累計" />
          <TableDataCell
            value={fm2(data.ACT_SUM)}
            isChanged={data.ACT_SUM_CHANGE}
            textAlign="right"
          />
          <TableDataCell
            value={fm2(data.REV_SUM)}
            isChanged={data.REV_SUM_CHANGE}
            textAlign="right"
          />
          <TableDataCell
            value={fm2(data.VAL_SUM)}
            isChanged={data.VAL_SUM_CHANGE}
            textAlign="right"
            borderRight={false}
          />
        </TableRow>
        <TableRow>
          <TableDataCell value="差異" />
          <TableDataCell
            value={fm2(data.ACT_SUM - data.EXP_PERCENT)}
            isChanged={data.ACT_SUM_CHANGE || data.EXP_PERCENT_CHANGE}
            textAlign="right"
          />
          <TableDataCell
            colSpan={2}
            value={fm2(data.VAL_SUM - data.REV_SUM)}
            isChanged={data.VAL_SUM_CHANGE || data.REV_SUM_CHANGE}
            textAlign="center"
            borderRight={false}
          />
        </TableRow>
        <TableRow>
          <TableCell
            colSpan={4}
            sx={{ bgcolor: data.REMARK1_CHANGE === 'true' && COLOR.CHANGE, whiteSpace: 'pre-wrap' }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <CampaignIcon sx={{ color: red[400] }} />
              <Typography variant={SIZE.TITLE}>差異說明：</Typography>
            </Stack>
            <Typography variant={SIZE.TEXT}>
              🎯 計價進度-營收進度差異說明(至{toTWDate(data.YEAR_MONTHEND)})&nbsp;=&nbsp;
              {fm2(data.VAL_SUM - data.REV_SUM)}％， 金額：{fmNoUnit(data.TOT_NOPAY)}仟元(未稅)
            </Typography>
            <Box sx={{ pl: 4 }}>
              {diffWords(data.REMARK1_PRE || '', data.REMARK1 || '').map((part, index) => (
                <Typography
                  key={index}
                  component="span"
                  variant={SIZE.TEXT}
                  style={{
                    color: part.added ? 'black' : part.removed ? 'red' : 'black',
                    textDecoration: part.removed
                      ? 'line-through'
                      : part.added
                        ? 'underline solid #ab47bc 3px'
                        : 'none',
                    display: part.removed && 'none',
                  }}
                >
                  {part.value}
                </Typography>
              ))}
            </Box>
            {/* <Typography variant={SIZE.TEXT} sx={{ whiteSpace: 'pre-wrap', pl: 4 }}>
                {data.REMARK1}
              </Typography> */}
            <Typography variant={SIZE.TEXT}>
              🎯 日報進度-營收進度差異說明(至{toTWDate(data.YEAR_MONTHEND)})&nbsp;= &nbsp;
              {fm2(data.ACT_SUM)}％&nbsp;-&nbsp;{fm2(data.REV_SUM)}％&nbsp;=&nbsp;
              {fm2(data.ACT_SUM - data.REV_SUM)}％
            </Typography>
            <Box sx={{ pl: 4 }}>
              {diffWords(data.REMARK2_PRE || '', data.REMARK2 || '').map((part, index) => (
                <Typography
                  key={index}
                  component="span"
                  variant={SIZE.TEXT}
                  style={{
                    color: part.added ? 'black' : part.removed ? 'red' : 'black',
                    textDecoration: part.removed
                      ? 'line-through'
                      : part.added
                        ? 'underline solid #ab47bc 3px'
                        : 'none',
                    display: part.removed && 'none',
                  }}
                >
                  {part.value}
                </Typography>
              ))}
            </Box>
            {/* <Typography variant={SIZE.TEXT} sx={{ whiteSpace: 'pre-wrap', pl: 4 }}>
              {data.REMARK2}
            </Typography> */}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableDataCellDiff
            icon={<NoteAltIcon sx={{ color: grey[600] }} />}
            title="備註："
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
          <TableTitleCell title={''} minWidth="120px" />
          <TableTitleCell
            textAlign="right"
            title={`截至${toTWDate(data.YEAR_MONTHEND)}累計日報進度`}
            minWidth="180px"
          />
          <TableTitleCell
            textAlign="right"
            title={`截至${toTWDate(data.YEAR_MONTHEND)}累計營收進度`}
            minWidth="180px"
          />
          <TableTitleCell
            textAlign="right"
            title={`截至${toTWDate(data.LAST_GRAND_DATE)}累計計價進度`}
            minWidth="180px"
            borderRight={false}
          />
        </TableRow>
      </TableHead>
    )
  }
}
