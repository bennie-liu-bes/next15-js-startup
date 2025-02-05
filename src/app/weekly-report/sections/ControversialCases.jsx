import { Fragment } from 'react'
import { COLOR, OFFSET } from '@/config-global'

import Chip from '@mui/material/Chip'
import { TableRow, TableHead, TableBody } from '@mui/material'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'

import TableFooter from '../components/TableFooter'
import { useFontSize } from '../context/useFontSize'
import TableWrapper from '../components/TableWrapper'
import TableDataCell from '../components/TableDataCell'
import TableTitleCell from '../components/TableTitleCell'
import TableBodyNodata from '../components/TableBodyNodata'

export default function ControversialCases({ data }) {
  const { fontSize } = useFontSize()

  return (
    <>
      <div
        id="controversial-cases-section"
        style={{ position: 'relative', top: OFFSET, visibility: 'hidden' }}
      />
      <TableWrapper title="柒-4、爭議案件(含可能發生及衍生)" colSpan={7}>
        {tableHead()}
        {data.length > 0 ? tableBody() : <TableBodyNodata colSpan={7} />}
      </TableWrapper>
    </>
  )

  function tableBody() {
    return (
      <TableBody sx={{ '& .MuiTypography-root': { fontSize: `${fontSize}rem` } }}>
        {data.map((item, index) => (
          <Fragment key={index}>
            <TableRow sx={{ bgcolor: index % 2 === 1 && COLOR.BGCOLOR }}>
              <TableDataCell value={index + 1} rowSpan={3} textAlign="center" />
              {item.C_TYPE_CH === '爭議中' ? (
                <TableDataCell
                  value={
                    <Chip
                      label={item.C_TYPE_CH}
                      icon={<PriorityHighIcon />}
                      color="error"
                      variant="outlined"
                      size="large"
                      sx={{ '& .MuiChip-label': { fontSize: '1.2rem' } }}
                    />
                  }
                  rowSpan={3}
                />
              ) : (
                <TableDataCell value={item.C_TYPE_CH} rowSpan={3} />
              )}
              <TableDataCell
                value={item.C_ITEMS}
                rowSpan={3}
                isChanged={item.C_ITEMS_CHANGE}
                sx={{ color: COLOR.ALERTCOLOR }}
              />
              <TableDataCell
                value={item.REASON}
                isChanged={item.REASON_CHANGE}
                sx={{ color: COLOR.ALERTCOLOR }}
              />
              <TableDataCell
                value={item.C_AMOUNT}
                isChanged={item.C_AMOUNT_CHANGE}
                sx={{ color: COLOR.ALERTCOLOR }}
              />
            </TableRow>
            <TableRow sx={{ bgcolor: index % 2 === 1 && COLOR.BGCOLOR }}>
              <TableDataCell
                colSpan={4}
                value={`📢 辦況說明：\n${item.INSTRUCTIONS}`}
                isChanged={item.INSTRUCTIONS_CHANGE}
              />
            </TableRow>
            <TableRow sx={{ bgcolor: index % 2 === 1 && COLOR.BGCOLOR }}>
              <TableDataCell
                colSpan={4}
                value={`📄 備註：\n${item.REMARK}`}
                isChanged={item.REMARK_CHANGE}
              />
            </TableRow>
          </Fragment>
        ))}
        <TableFooter wkDate={data[0].CALENDAR_DATE} colSpan={7} />
      </TableBody>
    )
  }

  function tableHead() {
    return (
      <TableHead
        sx={{ bgcolor: COLOR.HEADER, '& .MuiTypography-root': { fontSize: `${fontSize}rem` } }}
      >
        <TableRow>
          <TableTitleCell title="項次" width="80px" rowSpan={3} textAlign="center" />
          <TableTitleCell title="狀態" minWidth="120px" />
          <TableTitleCell title={'爭議項目\n(包含業主、廠商及其他關係人)'} minWidth="320px" />
          <TableTitleCell title={'原由及說明\n(包含人事時地物)'} minWidth="200px" />
          <TableTitleCell title={'爭議標的\n(工期或金額)'} minWidth="200px" borderRight={false} />
        </TableRow>
      </TableHead>
    )
  }
}
