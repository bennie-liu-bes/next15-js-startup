import { Fragment } from 'react'
import { toTWDate } from '@/utils/fm'
import { COLOR } from '@/config-global'

import { TableRow, TableBody, TableCell } from '@mui/material'

import TableFooter from '../components/TableFooter'
import TableWrapper from '../components/TableWrapper'
import TableDataCell from '../components/TableDataCell'
import TableBodyNodata from '../components/TableBodyNodata'
export default function MainHelp({ data }) {
  return (
    <TableWrapper title="✨ 需公司援助事項" colSpan={2}>
      {data.length > 0 ? tableBody() : <TableBodyNodata colSpan={2} />}
    </TableWrapper>
  )

  function tableBody() {
    return (
      <TableBody>
        {data.map((item, index) => (
          <Fragment key={index}>
            <TableRow>
              <TableDataCell
                value={`📢 請求協助事項：\n${item.HELP_ITEM}`}
                colSpan={2}
                isChanged={item.HELP_ITEM_CHANGE}
                borderRight={false}
              />
            </TableRow>
            <TableRow>
              <TableDataCell
                value={`📄 備註：\n${item.REMARK}`}
                colSpan={2}
                isChanged={item.REMARK_CHANGE}
                borderRight={false}
              />
            </TableRow>
            <TableRow>
              <TableDataCell
                value={`${toTWDate(item.HELP_DATE)}\n日期`}
                isChanged={item.HELP_DATE_CHANGE}
                textAlign="center"
                sx={{ width: '50%' }}
              />
              <TableDataCell
                value={`${item.CO_DEPT}\n協辦單位`}
                isChanged={item.CO_DEPT_CHANGE}
                textAlign="center"
                sx={{ width: '50%' }}
                borderRight={false}
              />
            </TableRow>
            {index !== data.length - 1 && (
              <TableRow>
                <TableCell colSpan={2} sx={{ height: '20px', bgcolor: COLOR.BGCOLOR }} />
              </TableRow>
            )}
          </Fragment>
        ))}
        <TableFooter wkDate={data[0].CALENDAR_DATE} colSpan={2} />
      </TableBody>
    )
  }
}
