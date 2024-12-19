'use client'
import { toTWDate } from '@/utils/fm'

import { Stack, Select, MenuItem, Typography, FormControl } from '@mui/material'
export default function DateDropDown({ selectedDate, onDateChange, wkWeeklyDate }) {
  if (!wkWeeklyDate || wkWeeklyDate.length === 0) return null

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Typography variant="body1" noWrap sx={{ display: { xs: 'none', sm: 'block' } }}>
        週報日期
      </Typography>
      <FormControl size="small">
        <Select
          id="date-select"
          labelId="date-select-label"
          value={selectedDate}
          onChange={onDateChange}
          sx={{
            backgroundColor: 'white',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(0, 0, 0, 0.23)',
            },
            height: '32px', // 調整高度
            '.MuiOutlinedInput-input': {
              padding: '4px 14px', // 調整內部padding
            },
          }}
        >
          {wkWeeklyDate.map((date, index) => (
            <MenuItem key={index} value={date.CALENDAR_DATE}>
              {toTWDate(date.CALENDAR_DATE)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  )
}
