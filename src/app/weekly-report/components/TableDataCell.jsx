import { SIZE, COLOR, BORDER_STYLE } from '@/config-global.js'

import { Tooltip, TableCell, Typography } from '@mui/material'

export default function TableDataCell({
  value,
  colSpan = 1,
  rowSpan = 1,
  textAlign = 'left',
  borderRight = true,
  isChanged,
  tooltip,
  sx,
}) {
  return tooltip ? (
    <Tooltip
      title={<Typography variant="body1">{tooltip}</Typography>}
      placement="top"
      arrow
      followCursor
    >
      {tableCell()}
    </Tooltip>
  ) : (
    tableCell()
  )

  function tableCell() {
    return (
      <TableCell
        size="small"
        colSpan={colSpan}
        rowSpan={rowSpan}
        sx={{
          whiteSpace: 'pre-wrap',
          textAlign: textAlign,
          borderRight: borderRight && BORDER_STYLE,
          bgcolor: isChanged === 'true' && COLOR.CHANGE,
          ...sx,
        }}
      >
        <Typography variant={SIZE.TEXT}>{value}</Typography>
      </TableCell>
    )
  }
}
