import { BORDER_RADIUS } from '@/config-global.js'

import { Table, Paper, TableContainer } from '@mui/material'

import TableTitle from './TableTitle'

export default function TableWrapper({ title, colSpan, children }) {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: BORDER_RADIUS }}>
      <Table sx={{ minWidth: 'md' }} size="small" aria-label="customized table">
        <TableTitle title={title} colSpan={colSpan} />
        {children}
      </Table>
    </TableContainer>
  )
}
