import { fm, toTWDate } from '@/utils/fm'
import { SIZE, COLOR, OFFSET } from '@/config-global'

import { TableRow, TableBody, TableCell, Typography } from '@mui/material'

import TableFooter from '../components/TableFooter'
import TableWrapper from '../components/TableWrapper'
import TableDataCell from '../components/TableDataCell'
import TableBodyNodata from '../components/TableBodyNodata'

export default function Difference({ data }) {
  return (
    <>
      <div
        id="difference-section"
        style={{ position: 'relative', top: OFFSET, visibility: 'hidden' }}
      />
      <TableWrapper title="✨ 參-1、會計報表現金差異" colSpan={2}>
        {data ? tableBody() : <TableBodyNodata colSpan={2} />}
      </TableWrapper>
    </>
  )

  function tableBody() {
    return (
      <TableBody>
        <TableRow>
          <TableCell
            colSpan={2}
            sx={{
              bgcolor:
                (data.DF_DATE_LAST_CHANGE === 'true' ||
                  data.CASH_IN_CHANGE === 'true' ||
                  data.CASH_OUT_CHANGE === 'true') &&
                COLOR.CHANGE,
            }}
          >
            <Typography variant={SIZE.TEXT}>截至{toTWDate(data.DF_DATE_LAST)}</Typography>
            <Typography variant={SIZE.TEXT}>累計收入：{fm(data.CASH_IN)}</Typography>
            <Typography variant={SIZE.TEXT}>累計支出：{fm(data.CASH_OUT)}</Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableDataCell
            value={`${toTWDate(data.DF_DATE_BLAST)}\n${fm(data.CASH_BLAST)}`}
            isChanged={data.CASH_BLAST_CHANGE}
            textAlign="center"
            sx={{ bgcolor: COLOR.BGCOLOR }}
          />
          <TableDataCell
            value={`${toTWDate(data.DF_DATE_LAST)}\n${fm(data.CASH_LAST)}`}
            isChanged={data.CASH_LAST_CHANGE}
            textAlign="center"
            sx={{ bgcolor: COLOR.BGCOLOR }}
            borderRight={false}
          />
        </TableRow>
        <TableRow>
          <TableDataCell
            value={`📢 差異說明：\n${data.ILLUSTRATE}`}
            isChanged={data.ILLUSTRATE_CHANGE}
            colSpan={2}
          />
        </TableRow>
        <TableRow>
          <TableDataCell
            value={`📄 備註：\n${data.REMARK}`}
            isChanged={data.REMARK_CHANGE}
            colSpan={2}
          />
        </TableRow>
        <TableFooter wkDate={data.CALENDAR_DATE} colSpan={5} />
      </TableBody>
    )
  }

  // return (
  //   <TableContainer component={Paper} sx={{ borderRadius: BORDER_RADIUS }}>
  //     <Table sx={{ minWidth: 'md' }} size="small" aria-label="customized table">
  //       <TableTitle title="✨ 參-1、會計報表現金差異" colSpan={2} />
  //       <TableBody>
  //         <TableRow>
  //           <TableCell
  //             colSpan={2}
  //             sx={{
  //               bgcolor:
  //                 (data.DF_DATE_LAST_CHANGE === 'true' ||
  //                   data.CASH_IN_CHANGE === 'true' ||
  //                   data.CASH_OUT_CHANGE === 'true') &&
  //                 COLOR.CHANGE,
  //             }}
  //           >
  //             <Typography variant={SIZE.TEXT}>截至{toTWDate(data.DF_DATE_LAST)}</Typography>
  //             <Typography variant={SIZE.TEXT}>累計收入：{fm(data.CASH_IN)}</Typography>
  //             <Typography variant={SIZE.TEXT}>累計支出：{fm(data.CASH_OUT)}</Typography>
  //           </TableCell>
  //         </TableRow>
  //         <TableRow sx={{ bgcolor: COLOR.BGCOLOR }}>
  //           <TableCell align="center">
  //             <Typography variant={SIZE.TEXT}>{toTWDate(data.DF_DATE_BLAST)}</Typography>
  //           </TableCell>
  //           <TableCell align="center" sx={{ borderLeft: BORDER_STYLE }}>
  //             <Typography variant={SIZE.TEXT}>{toTWDate(data.DF_DATE_LAST)}</Typography>
  //           </TableCell>
  //         </TableRow>
  //         <TableRow>
  //           <TableCell align="center">
  //             <Typography variant={SIZE.TEXT}>{fm(data.CASH_BLAST)}</Typography>
  //           </TableCell>
  //           <TableCell align="center" sx={{ borderLeft: BORDER_STYLE }}>
  //             <Typography variant={SIZE.TEXT}>{fm(data.CASH_LAST)}</Typography>
  //           </TableCell>
  //         </TableRow>
  //         <TableRow>
  //           <TableCell colSpan={2} sx={{ bgcolor: data.REMARK_CHANGE === 'true' && COLOR.CHANGE }}>
  //             <Typography variant={SIZE.TEXT}>📄 備註：</Typography>
  //             <Typography variant={SIZE.TEXT} sx={{ whiteSpace: 'pre-wrap' }}>
  //               {data.REMARK}
  //             </Typography>
  //           </TableCell>
  //         </TableRow>
  //         <TableRow>
  //           <TableCell
  //             colSpan={2}
  //             sx={{ bgcolor: data.ILLUSTRATE_CHANGE === 'true' && COLOR.CHANGE }}
  //           >
  //             <Typography variant={SIZE.TEXT}>📢 差異說明：</Typography>
  //             <Typography variant={SIZE.TEXT} sx={{ whiteSpace: 'pre-wrap', pl: 4 }}>
  //               {data.ILLUSTRATE}
  //             </Typography>
  //           </TableCell>
  //         </TableRow>
  //         <TableFooter wkDate={data.CALENDAR_DATE} colSpan={4} />
  //       </TableBody>
  //     </Table>
  //   </TableContainer>
  // )
}
