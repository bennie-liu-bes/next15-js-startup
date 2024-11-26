import { COLOR } from '@/config-global'

import { TableRow, TableHead, TableCell, Typography } from '@mui/material'
export default function TableTitle({ title, colSpan }) {
  return (
    <TableHead sx={{ bgcolor: COLOR.HEADER }}>
      <TableRow>
        <TableCell colSpan={colSpan}>
          <Typography variant="h6" fontWeight="bold" color="white">
            {title}
          </Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  )
}
