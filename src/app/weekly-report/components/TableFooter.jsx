import { toTWDate } from '@/utils/fm'

import { TableRow, TableCell, Typography } from '@mui/material'
export default function TableFooter({ wkDate, colSpan }) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} sx={{ textAlign: 'right' }}>
        <Typography variant="body1">📅 週報日期：{toTWDate(wkDate)}</Typography>
      </TableCell>
    </TableRow>
  )
}
