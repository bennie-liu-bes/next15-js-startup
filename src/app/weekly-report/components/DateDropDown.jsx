'use client'
import { toTWDate, getCurrentDateWithWeekNumber } from '@/utils/fm'

import { Stack, Select, MenuItem, Typography, FormControl } from '@mui/material'

export default function DateDropDown({ selectedDate, onDateChange, wkWeeklyDate }) {
  if (!wkWeeklyDate || wkWeeklyDate.length === 0) return null

  const targetDate = getCurrentDateWithWeekNumber(wkWeeklyDate)

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Typography variant="body1" noWrap sx={{ display: { xs: 'none', sm: 'block' } }}>
        週報日期
      </Typography>
      <FormControl size="small" sx={{ position: 'relative' }}>
        <Select
          id="date-select"
          labelId="date-select-label"
          value={selectedDate}
          onChange={onDateChange}
          sx={{
            backgroundColor: 'white',
            height: '32px',
            position: 'relative',
            zIndex: 1,
            '.MuiOutlinedInput-input': {
              padding: '4px 14px',
            },
          }}
        >
          {wkWeeklyDate.map((date, index) => (
            <MenuItem key={index} value={date.CALENDAR_DATE}>
              {date.CALENDAR_DATE === targetDate
                ? toTWDate(date.CALENDAR_DATE) + ' (本週)'
                : toTWDate(date.CALENDAR_DATE)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  )
}
