import { SIZE } from '@/config-global.js'

import { TableRow, TableCell, TableBody, Typography } from '@mui/material'

import TableFooter from './TableFooter'

export default function TableBodyNodata({ colSpan }) {
  return (
    <TableBody>
      <TableRow>
        <TableCell colSpan={colSpan}>
          <Typography variant={SIZE.TEXT}>無資料</Typography>
        </TableCell>
      </TableRow>
      <TableFooter wkDate={'-/-/-'} colSpan={colSpan} />
    </TableBody>
  )
}
