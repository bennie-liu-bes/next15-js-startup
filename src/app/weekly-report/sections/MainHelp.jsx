import { Fragment } from 'react'
import { toTWDate } from '@/utils/fm'
import { COLOR, OFFSET } from '@/config-global'

import { red, grey } from '@mui/material/colors'
import NoteAltIcon from '@mui/icons-material/NoteAlt'
import CampaignIcon from '@mui/icons-material/Campaign'
import { TableRow, TableBody, TableCell } from '@mui/material'

import TableFooter from '../components/TableFooter'
import { useFontSize } from '../context/useFontSize'
import TableWrapper from '../components/TableWrapper'
import TableDataCell from '../components/TableDataCell'
import TableBodyNodata from '../components/TableBodyNodata'
import TableDataCellDiff from '../components/TableDataCellDiff'
export default function MainHelp({ data, is102B1A = false }) {
  const { fontSize } = useFontSize()

  return (
    <>
      <div
        id="main-help-section"
        style={{ position: 'relative', top: OFFSET, visibility: 'hidden' }}
      />
      <TableWrapper title={is102B1A ? '壹、需公司援助事項' : '需公司援助事項'} colSpan={2}>
        {data.length > 0 ? tableBody() : <TableBodyNodata colSpan={2} />}
      </TableWrapper>
    </>
  )

  function tableBody() {
    return (
      <TableBody sx={{ '& .MuiTypography-root': { fontSize: `${fontSize}rem` } }}>
        {data.map((item, index) => (
          <Fragment key={index}>
            <TableRow>
              <TableDataCellDiff
                icon={<CampaignIcon sx={{ color: red[400] }} />}
                title="請求協助事項："
                originalText={item.HELP_ITEM_PRE}
                modifiedText={item.HELP_ITEM}
                colSpan={2}
                isChanged={item.HELP_ITEM_CHANGE}
              />
            </TableRow>
            <TableRow>
              <TableDataCellDiff
                icon={<NoteAltIcon sx={{ color: grey[600] }} />}
                title="備註："
                originalText={item.REMARK_PRE}
                modifiedText={item.REMARK}
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
