import { toTWDate3 } from '@/utils/fm'
import { COLOR } from '@/config-global'
import { useRef, useEffect } from 'react'
import { BORDER_RADIUS } from '@/config-global.js'

import { Table, Paper, TableContainer } from '@mui/material'

import TableTitle from './TableTitle'

export default function TableWrapper({ title, colSpan, children, sx, scrollToRight = false }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (containerRef.current) {
      const scrollContainer = containerRef.current

      if (scrollToRight) {
        scrollContainer.scrollLeft = scrollContainer.scrollWidth
      } else {
        const ymNow = toTWDate3(new Date().toISOString().slice(0, 7).replace('-', ''))
        const targetCell = scrollContainer.querySelector(`[data-month="${ymNow}"]`)

        if (targetCell) {
          const containerWidth = scrollContainer.clientWidth
          const targetPosition = targetCell.offsetLeft
          const scrollTo = targetPosition - containerWidth + 160
          scrollContainer.scrollLeft = scrollTo
        } else {
          scrollContainer.scrollLeft = scrollContainer.scrollWidth
        }
      }
    }
  }, [scrollToRight])

  return (
    <TableContainer
      ref={containerRef}
      component={Paper}
      sx={{
        borderRadius: BORDER_RADIUS,
        border: '1px solid #2C3E50',
        scrollBehavior: 'smooth',
        position: 'relative',
        overflow: 'auto',
        '& .sticky-column': {
          position: 'sticky',
          left: 0,
          backgroundColor: COLOR.BGCOLOR,
          zIndex: 2,
          isolation: 'isolate',
          boxShadow: '6px 0 5px -5px rgba(0,0,0,0.1)',
          '&.header': {
            zIndex: 3,
          },
        },
        '& .MuiTableCell-root.sticky-column': {
          position: 'sticky',
          left: 0,
          backgroundColor: COLOR.BGCOLOR,
          zIndex: 2,
        },
        '& .MuiTableCell-head.sticky-column': {
          zIndex: 3,
        },
        '@media (prefers-color-scheme: dark)': {
          '& .sticky-column': {
            backgroundColor: COLOR.BGCOLOR,
            boxShadow: '6px 0 5px -5px rgba(255,255,255,0.1)',
          },
        },
        ...sx,
      }}
    >
      <Table sx={{ minWidth: 'md' }} size="small" aria-label="customized table">
        {title && <TableTitle title={title} colSpan={colSpan} />}
        {children}
      </Table>
    </TableContainer>
  )
}
