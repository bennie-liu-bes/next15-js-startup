import { SIZE, COLOR, BORDER_STYLE } from '@/config-global.js'

import { Stack, Tooltip, TableCell, Typography } from '@mui/material'

export default function TableDataCell({
  icon,
  title,
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
      title={
        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
          {tooltip}
        </Typography>
      }
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
          borderRight: borderRight && BORDER_STYLE,
          bgcolor: isChanged === 'true' && COLOR.CHANGE,
          ...sx,
        }}
      >
        <Stack direction="column">
          <Stack direction="row" spacing={1} alignItems="center">
            {icon && icon}
            <Typography variant={SIZE.TEXT}>{title}</Typography>
          </Stack>
          <Typography
            variant={SIZE.TEXT}
            sx={{
              textAlign,
              color: Number(value?.toString().replace(/,/g, '')) < 0 && COLOR.ALERTRED,
            }}
          >
            {value}
          </Typography>
        </Stack>
      </TableCell>
    )
  }
}
