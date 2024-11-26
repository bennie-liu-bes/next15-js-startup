import { Fragment } from 'react'
import { COLOR, OFFSET } from '@/config-global'

import { TableRow, TableHead, TableBody } from '@mui/material'

import TableFooter from '../components/TableFooter'
import TableWrapper from '../components/TableWrapper'
import TableDataCell from '../components/TableDataCell'
import TableTitleCell from '../components/TableTitleCell'
import TableBodyNodata from '../components/TableBodyNodata'
export default function Todo({ data }) {
  return (
    <>
      <div id="todo-section" style={{ position: 'relative', top: OFFSET, visibility: 'hidden' }} />
      <TableWrapper title="✨ 柒-1(A)、應辦事項-困難解決需求" colSpan={3}>
        {tableHead()}
        {data.length > 0 ? tableBody() : <TableBodyNodata colSpan={3} />}
      </TableWrapper>
    </>
  )

  function tableBody() {
    return (
      <TableBody>
        {data.map((item, index) => (
          <Fragment key={index}>
            <TableRow sx={{ bgcolor: index % 2 === 1 && COLOR.BGCOLOR }}>
              <TableDataCell value={index + 1} rowSpan={3} textAlign="center" />
              <TableDataCell value={item.TODO_NUM} isChanged={data.TODO_NUM_CHANGE} />
              <TableDataCell
                value={item.TODO_REASON}
                isChanged={data.TODO_REASON_CHANGE}
                borderRight={false}
              />
            </TableRow>
            <TableRow sx={{ bgcolor: index % 2 === 1 && COLOR.BGCOLOR }}>
              <TableDataCell
                colSpan={2}
                value={`📢 辦理情形：\n${item.TODO_STATUS}`}
                isChanged={item.TODO_STATUS_CHANGE}
                borderRight={false}
              />
            </TableRow>
            <TableRow sx={{ bgcolor: index % 2 === 1 && COLOR.BGCOLOR }}>
              <TableDataCell
                colSpan={2}
                value={`📄 備註：\n${item.REMARK}`}
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
      <TableHead sx={{ bgcolor: COLOR.HEADER }}>
        <TableRow>
          <TableTitleCell title="項次" width="50px" rowSpan={3} textAlign="center" />
          <TableTitleCell title="編號" minWidth="100px" />
          <TableTitleCell title="事由" minWidth="100px" borderRight={false} />
        </TableRow>
        <TableRow>
          <TableTitleCell title="辦理情形" colSpan={2} borderRight={false} />
        </TableRow>
        <TableRow>
          <TableTitleCell title="備註" colSpan={2} borderRight={false} />
        </TableRow>
      </TableHead>
    )
  }

  // return (
  //   <TableContainer component={Paper} sx={{ borderRadius: BORDER_RADIUS }}>
  //     <Table sx={{ minWidth: 'md' }} size="small" aria-label="customized table">
  //       <TableTitle title="✨ 柒-1(a)、應辦事項-困難解決需求" colSpan={3} />
  //       <TableHead sx={{ bgcolor: COLOR.HEADER }}>
  //         <TableRow>
  //           <TableCell rowSpan={3} sx={{ borderRight: BORDER_STYLE, minWidth: '80px' }}>
  //             <Typography variant={SIZE.TITLE} fontWeight="bold" color="white">
  //               項次
  //             </Typography>
  //           </TableCell>
  //           <TableCell sx={{ borderRight: BORDER_STYLE, minWidth: '80px' }}>
  //             <Typography variant={SIZE.TITLE} fontWeight="bold" color="white">
  //               編號
  //             </Typography>
  //           </TableCell>
  //           <TableCell sx={{ borderRight: BORDER_STYLE, minWidth: '100px' }}>
  //             <Typography variant={SIZE.TITLE} fontWeight="bold" color="white">
  //               事由
  //             </Typography>
  //           </TableCell>
  //         </TableRow>
  //         <TableRow>
  //           <TableCell colSpan={2} sx={{ borderRight: BORDER_STYLE, minWidth: '180px' }}>
  //             <Typography variant={SIZE.TITLE} fontWeight="bold" color="white">
  //               辦理情形
  //             </Typography>
  //           </TableCell>
  //         </TableRow>
  //         <TableRow>
  //           <TableCell colSpan={2} sx={{ borderRight: BORDER_STYLE, minWidth: '180px' }}>
  //             <Typography variant={SIZE.TITLE} fontWeight="bold" color="white">
  //               備註
  //             </Typography>
  //           </TableCell>
  //         </TableRow>
  //       </TableHead>
  //       <TableBody>
  //         {data.map((item, index) => (
  //           <Fragment key={index}>
  //             <TableRow>
  //               <TableCell rowSpan={3} sx={{ borderRight: BORDER_STYLE }}>
  //                 <Typography variant={SIZE.TEXT}>{index + 1}</Typography>
  //               </TableCell>
  //               <TableCell
  //                 sx={{
  //                   borderRight: BORDER_STYLE,
  //                   bgcolor: item.TODO_NUM_CHANGE === 'true' && COLOR.CHANGE,
  //                 }}
  //               >
  //                 <Typography variant={SIZE.TEXT}>{item.TODO_NUM}</Typography>
  //               </TableCell>
  //               <TableCell
  //                 sx={{
  //                   borderRight: BORDER_STYLE,
  //                   bgcolor: item.TODO_REASON_CHANGE === 'true' && COLOR.CHANGE,
  //                 }}
  //               >
  //                 <Typography variant={SIZE.TEXT}>{item.TODO_REASON}</Typography>
  //               </TableCell>
  //             </TableRow>
  //             <TableRow>
  //               <TableCell
  //                 colSpan={2}
  //                 sx={{
  //                   whiteSpace: 'pre-wrap',
  //                   borderRight: BORDER_STYLE,
  //                   bgcolor: item.TODO_STATUS_CHANGE === 'true' && COLOR.CHANGE,
  //                 }}
  //               >
  //                 <Typography variant={SIZE.TEXT}>📢 辦理情形：</Typography>
  //                 <Typography variant={SIZE.TEXT}>{item.TODO_STATUS}</Typography>
  //               </TableCell>
  //             </TableRow>
  //             <TableRow>
  //               <TableCell
  //                 colSpan={2}
  //                 sx={{
  //                   whiteSpace: 'pre-wrap',
  //                   borderRight: BORDER_STYLE,
  //                   bgcolor: item.REMARK_CHANGE === 'true' && COLOR.CHANGE,
  //                 }}
  //               >
  //                 <Typography variant={SIZE.TEXT}>📄 備註：</Typography>
  //                 <Typography variant={SIZE.TEXT}>{item.REMARK}</Typography>
  //               </TableCell>
  //             </TableRow>
  //           </Fragment>
  //         ))}
  //         <TableFooter wkDate={data[0].CALENDAR_DATE} colSpan={6} />
  //       </TableBody>
  //     </Table>
  //   </TableContainer>
  // )
}
