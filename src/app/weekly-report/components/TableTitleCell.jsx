import { SIZE, BORDER_STYLE } from '@/config-global.js'

import { TableCell, Typography } from '@mui/material'
export default function TableTitleCell({
  title,
  rowSpan = 1,
  colSpan = 1,
  textAlign = 'left',
  borderRight = true,
  width = 'auto',
  minWidth = 'auto',
  maxWidth = 'none',
  fontColor = 'white',
  isBold = true,
  sx,
}) {
  return (
    <TableCell
      variant="head"
      size="small"
      rowSpan={rowSpan}
      colSpan={colSpan}
      sx={{
        boxSizing: 'border-box',
        whiteSpace: 'pre-wrap',
        textAlign: textAlign,
        borderRight: borderRight && BORDER_STYLE,
        '&.MuiTableCell-root': {
          width: width,
          minWidth: minWidth,
          maxWidth: maxWidth,
        },
        ...sx,
      }}
    >
      <Typography
        variant={SIZE.TITLE}
        fontWeight={isBold ? 'bold' : 'normal'}
        color={fontColor}
        sx={{
          width: '100%',
        }}
      >
        {title}
      </Typography>
    </TableCell>
  )
}
