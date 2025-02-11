import { SIZE, COLOR, BORDER_STYLE } from '@/config-global.js'

import { Stack, Tooltip, TableCell, Typography } from '@mui/material'

import { useFontSize } from '../context/useFontSize'
export default function TableDataCellDiff2({
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
  const { bottomLine, bgColor } = useFontSize()
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
        {isChanged === 'true' ? (
          <>
            {/* <Typography
              variant={SIZE.TEXT}
              style={{
                color: 'red',
                textDecoration: 'line-through',
              }}
            >
              {originalText}
            </Typography> */}
            <Typography
              variant={SIZE.TEXT}
              style={{
                display: 'inline-block',
                textDecorationSkipInk: 'none',
                textDecoration: bottomLine ? 'underline solid #ab47bc 3px' : 'none',
                backgroundColor: bgColor ? COLOR.BGCOLOR : 'transparent',
              }}
            >
              {modifiedText}
            </Typography>
          </>
        ) : (
          <Typography variant={SIZE.TEXT}>{modifiedText}</Typography>
        )}
      </TableCell>
    )
  }
}
