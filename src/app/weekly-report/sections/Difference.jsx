import { fm, toTWDate } from '@/utils/fm'
import { SIZE, COLOR, OFFSET } from '@/config-global'

import DragHandleRoundedIcon from '@mui/icons-material/DragHandleRounded'
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded'
import { Box, Stack, Divider, TableRow, TableBody, TableCell, Typography } from '@mui/material'

import TableFooter from '../components/TableFooter'
import { useFontSize } from '../context/useFontSize'
import TableWrapper from '../components/TableWrapper'
import TableDataCell from '../components/TableDataCell'
import TableBodyNodata from '../components/TableBodyNodata'
import TableDataCellDiff from '../components/TableDataCellDiff'

export default function Difference({ data }) {
  const { fontSize } = useFontSize()
  const COLOR_ = '#ef5350'
  return (
    <>
      <div
        id="difference-section"
        style={{ position: 'relative', top: OFFSET, visibility: 'hidden' }}
      />
      <TableWrapper title="參-1、會計報表現金差異" colSpan={2}>
        {data ? tableBody() : <TableBodyNodata colSpan={2} />}
      </TableWrapper>
    </>
  )

  function tableBody() {
    return (
      <TableBody sx={{ '& .MuiTypography-root': { fontSize: `${fontSize}rem` } }}>
        <TableRow>
          <TableDataCell
            value={`截至 ${toTWDate(data.DF_DATE_BLAST)}\n${fm(data.CASH_BLAST)}`}
            isChanged={data.CASH_BLAST_CHANGE}
            textAlign="center"
            sx={{ bgcolor: COLOR.BGCOLOR, width: '50%', verticalAlign: 'top' }}
          />
          <TableCell
            size="small"
            sx={{
              whiteSpace: 'pre-wrap',
              textAlign: 'center',
              bgcolor: COLOR.BGCOLOR,
              verticalAlign: 'top',
            }}
          >
            <Typography variant={SIZE.TEXT} gutterBottom>
              截至 {toTWDate(data.DF_DATE_LAST)}
            </Typography>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Stack direction="column" spacing={0} sx={{ textAlign: 'right' }}>
                <Typography variant={SIZE.TEXT}>累計收入：</Typography>
                <Typography variant={SIZE.TEXT}>
                  <HorizontalRuleRoundedIcon sx={{ color: COLOR_ }} /> 累計支出：
                </Typography>
                <Divider color="secondary" sx={{ borderBottomWidth: 2, bgcolor: COLOR_ }} />
                <Typography variant={SIZE.TEXT}>
                  <DragHandleRoundedIcon sx={{ color: COLOR_ }} /> 收支差異：
                </Typography>
              </Stack>
              <Stack direction="column" spacing={0} sx={{ textAlign: 'right' }}>
                <Typography variant={SIZE.TEXT}>{fm(data.CASH_IN)}</Typography>
                <Typography variant={SIZE.TEXT}>{fm(data.CASH_OUT)}</Typography>
                <Divider sx={{ borderBottomWidth: 2, bgcolor: COLOR_ }} />
                <Typography variant={SIZE.TEXT}>{fm(data.CASH_LAST)}</Typography>
              </Stack>
            </Box>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableDataCellDiff
            title="📢 差異說明："
            originalText={data.ILLUSTRATE_PRE}
            modifiedText={data.ILLUSTRATE}
            isChanged={data.ILLUSTRATE_CHANGE}
            colSpan={2}
          />
        </TableRow>
        <TableRow>
          <TableDataCellDiff
            title="📄 備註："
            originalText={data.REMARK_PRE}
            modifiedText={data.REMARK}
            isChanged={data.REMARK_CHANGE}
            colSpan={2}
          />
        </TableRow>
        <TableFooter wkDate={data.CALENDAR_DATE} colSpan={5} />
      </TableBody>
    )
  }
}
