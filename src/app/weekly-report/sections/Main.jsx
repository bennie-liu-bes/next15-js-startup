import { fm, toTWDate } from '@/utils/fm'

import { grey } from '@mui/material/colors'
import NoteAltIcon from '@mui/icons-material/NoteAlt'
import { Box, TableRow, TableBody } from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'

import TableFooter from '../components/TableFooter'
import { useFontSize } from '../context/useFontSize'
import TableWrapper from '../components/TableWrapper'
import TableDataCell from '../components/TableDataCell'
import TableBodyNodata from '../components/TableBodyNodata'
export default function Main({ data }) {
  const { fontSize } = useFontSize()

  return (
    <Box sx={{ mb: 2 }}>
      <TableWrapper title={'基本資料'} colSpan={2}>
        {data ? tableBody() : <TableBodyNodata colSpan={2} />}
      </TableWrapper>
    </Box>
  )

  function tableBody() {
    return (
      <TableBody sx={{ '& .MuiTypography-root': { fontSize: `${fontSize}rem` } }}>
        <TableRow>
          <TableDataCell
            icon={<CalendarMonthIcon sx={{ color: '#2194D4' }} />}
            title={'實際開工日'}
            sx={{ width: '50%' }}
          />
          <TableDataCell
            value={toTWDate(data.START_DATE)}
            isChanged={data.START_DATE_CHANGE}
            borderRight={false}
            sx={{ width: '50%' }}
          />
        </TableRow>
        <TableRow>
          <TableDataCell
            icon={<CalendarMonthIcon sx={{ color: '#2194D4' }} />}
            title={'契約預計完工日'}
          />
          <TableDataCell
            value={toTWDate(data.ORIGINAL_END_DATE)}
            isChanged={data.ORIGINAL_END_DATE_CHANGE}
            borderRight={false}
          />
        </TableRow>
        <TableRow>
          <TableDataCell
            icon={<CalendarMonthIcon sx={{ color: '#2194D4' }} />}
            title={'核准展延完工期限'}
          />
          <TableDataCell
            value={toTWDate(data.END_DATE)}
            isChanged={data.END_DATE_CHANGE}
            borderRight={false}
          />
        </TableRow>
        <TableRow>
          <TableDataCell
            icon={<MonetizationOnIcon sx={{ color: '#F5C88C' }} />}
            title={'契約金額(含稅)'}
          />
          <TableDataCell
            value={fm(data.CNTR_ADD_NT)}
            isChanged={data.CNTR_ADD_NT_CHANGE}
            borderRight={false}
          />
        </TableRow>
        <TableRow>
          <TableDataCell
            icon={<MonetizationOnIcon sx={{ color: '#F5C88C' }} />}
            title={'契約變更後金額(含稅)'}
          />
          <TableDataCell
            value={fm(data.CUR_NT_ADD)}
            isChanged={data.CUR_NT_ADD_CHANGE}
            borderRight={false}
          />
        </TableRow>
        <TableRow>
          <TableDataCell icon={<NoteAltIcon sx={{ color: grey[600] }} />} title={'備註'} />
          <TableDataCell value={data.REMARK} isChanged={data.REMARK_CHANGE} borderRight={false} />
        </TableRow>
        <TableFooter wkDate={data.WK_DATA} colSpan={2} />
      </TableBody>
    )
  }
}
