import { toTWDate } from '@/utils/fm'

import { TableRow, TableCell, Typography } from '@mui/material'
export default function TableFooter({ wkDate, colSpan, show = false }) {
  if (!show) {
    return null
  }
  return (
    <TableRow>
      <TableCell colSpan={colSpan} sx={{ textAlign: 'right' }}>
        <Typography variant="body1" sx={{ pr: !wkDate || wkDate === '' ? 9 : 0 }}>
          📅 週報日期：{wkDate && toTWDate(wkDate)}
        </Typography>
      </TableCell>
    </TableRow>
  )
}
