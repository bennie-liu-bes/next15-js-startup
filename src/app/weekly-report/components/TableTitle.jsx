import { COLOR } from '@/config-global'

import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import { Box, TableRow, TableHead, TableCell, Typography } from '@mui/material'

export default function TableTitle({ title, colSpan }) {
  return (
    <TableHead sx={{ bgcolor: COLOR.HEADER }}>
      <TableRow>
        <TableCell colSpan={colSpan}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AutoAwesomeRoundedIcon sx={{ color: 'white' }} />
            <Typography variant="h6" fontWeight="bold" color="white">
              {title}
            </Typography>
          </Box>
        </TableCell>
      </TableRow>
    </TableHead>
  )
}
