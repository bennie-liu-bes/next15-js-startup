import { diffWords } from 'diff'
import { SIZE, COLOR, BORDER_STYLE } from '@/config-global.js'

import { Stack, Tooltip, TableCell, Typography } from '@mui/material'
export default function TableDataCellDiff({
  icon,
  title,
  originalText,
  modifiedText,
  colSpan = 1,
  rowSpan = 1,
  textAlign = 'left',
  borderRight = false,
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
          textAlign: textAlign,
          borderRight: borderRight && BORDER_STYLE,
          bgcolor: isChanged === 'true' && COLOR.CHANGE,
          ...sx,
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          {icon && icon}
          <Typography variant={SIZE.TEXT}>{title}</Typography>
        </Stack>
        {diffWords(originalText || '', modifiedText || '').map((part, index) => (
          <Typography
            component="span"
            key={index}
            variant={SIZE.TEXT}
            style={{
              color: part.added ? 'black' : part.removed ? 'red' : 'black',
              textDecoration: part.removed
                ? 'line-through'
                : part.added
                  ? 'underline solid #ab47bc 3px'
                  : 'none',
              display: part.removed && 'none',
            }}
          >
            {part.value}
          </Typography>
        ))}
      </TableCell>
    )
  }
}