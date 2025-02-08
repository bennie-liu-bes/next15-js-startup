import { Fragment } from 'react'
import { fm2, toTWDate } from '@/utils/fm'
import NumberFlow from '@number-flow/react'
import { COLOR, OFFSET } from '@/config-global'

import { red, grey } from '@mui/material/colors'
import NoteAltIcon from '@mui/icons-material/NoteAlt'
import CampaignIcon from '@mui/icons-material/Campaign'
import { TableRow, TableHead, TableBody } from '@mui/material'

import TableFooter from '../components/TableFooter'
import { useFontSize } from '../context/useFontSize'
import TableWrapper from '../components/TableWrapper'
import TableDataCell from '../components/TableDataCell'
import TableTitleCell from '../components/TableTitleCell'
import TableBodyNodata from '../components/TableBodyNodata'
import TableDataCellDiff from '../components/TableDataCellDiff'
export default function Weekly({ data, data2 }) {
  const { fontSize } = useFontSize()

  return (
    <>
      <div
        id="weekly-section"
        style={{ position: 'relative', top: OFFSET, visibility: 'hidden' }}
      />
      <TableWrapper title="壹、週進度(單位：％)" colSpan={5}>
        {data && tableHead()}
        {data ? tableBody() : <TableBodyNodata colSpan={5} />}
      </TableWrapper>
    </>
  )

  function tableBody() {
    return (
      <TableBody sx={{ '& .MuiTypography-root': { fontSize: `${fontSize}rem` } }}>
        <TableRow>
          <TableDataCell value="預定累計" />
          <TableDataCell
            value={
              <NumberFlow format={{ minimumFractionDigits: 2 }} value={fm2(data.EXP_PERCENT1)} />
            }
            textAlign="right"
          />
          <TableDataCell
            value={
              <NumberFlow format={{ minimumFractionDigits: 2 }} value={fm2(data.EXP_PERCENT2)} />
            }
            textAlign="right"
          />
          <TableDataCell
            value={
              <NumberFlow format={{ minimumFractionDigits: 2 }} value={fm2(data.EXP_PERCENT3)} />
            }
            textAlign="right"
          />
          <TableDataCell
            value={
              <NumberFlow format={{ minimumFractionDigits: 2 }} value={fm2(data.EXP_PERCENT4)} />
            }
            textAlign="right"
            isChanged={'true'}
            borderRight={false}
          />
        </TableRow>
        <TableRow>
          <TableDataCell value="實際累計" />
          <TableDataCell
            value={<NumberFlow format={{ minimumFractionDigits: 2 }} value={fm2(data.ACT_SUM1)} />}
            textAlign="right"
          />
          <TableDataCell
            value={<NumberFlow format={{ minimumFractionDigits: 2 }} value={fm2(data.ACT_SUM2)} />}
            textAlign="right"
          />
          <TableDataCell
            value={<NumberFlow format={{ minimumFractionDigits: 2 }} value={fm2(data.ACT_SUM3)} />}
            textAlign="right"
          />
          <TableDataCell
            value={<NumberFlow format={{ minimumFractionDigits: 2 }} value={fm2(data.ACT_SUM4)} />}
            textAlign="right"
            isChanged={'true'}
            borderRight={false}
          />
        </TableRow>
        <TableRow>
          <TableDataCell value="差異" />
          <TableDataCell
            value={
              <NumberFlow
                format={{ minimumFractionDigits: 2 }}
                value={fm2(data.ACT_SUM1 - data.EXP_PERCENT1)}
              />
            }
            textAlign="right"
            sx={{ color: data.ACT_SUM1 - data.EXP_PERCENT1 < 0 && COLOR.ALERTRED }}
          />
          <TableDataCell
            value={
              <NumberFlow
                format={{ minimumFractionDigits: 2 }}
                value={fm2(data.ACT_SUM2 - data.EXP_PERCENT2)}
              />
            }
            textAlign="right"
            sx={{ color: data.ACT_SUM2 - data.EXP_PERCENT2 < 0 && COLOR.ALERTRED }}
          />
          <TableDataCell
            value={
              <NumberFlow
                format={{ minimumFractionDigits: 2 }}
                value={fm2(data.ACT_SUM3 - data.EXP_PERCENT3)}
              />
            }
            textAlign="right"
            sx={{ color: data.ACT_SUM3 - data.EXP_PERCENT3 < 0 && COLOR.ALERTRED }}
          />
          <TableDataCell
            value={
              <NumberFlow
                format={{ minimumFractionDigits: 2 }}
                value={fm2(data.ACT_SUM4 - data.EXP_PERCENT4)}
              />
            }
            textAlign="right"
            isChanged={'true'}
            borderRight={false}
            sx={{ color: data.ACT_SUM4 - data.EXP_PERCENT4 < 0 && COLOR.ALERTRED }}
          />
        </TableRow>
        <TableRow>
          <TableDataCellDiff
            icon={<CampaignIcon sx={{ color: red[400] }} />}
            title="差異說明："
            originalText={data.REMARK_D_PRE}
            modifiedText={data.REMARK_D}
            colSpan={5}
            isChanged={data.REMARK_D_CHANGE}
          />
        </TableRow>
        <TableRow>
          <TableDataCellDiff
            icon={<NoteAltIcon sx={{ color: grey[600] }} />}
            title="備註："
            originalText={data.REMARK_PRE}
            modifiedText={data.REMARK}
            colSpan={5}
            isChanged={data.REMARK_CHANGE}
          />
        </TableRow>
        {data2 &&
          data2.map((item, index) => {
            return (
              <Fragment key={index}>
                <TableRow sx={{ bgcolor: COLOR.HEADER }}>
                  <TableTitleCell
                    title={`其他週進度：${item.WEEKLY_TITLE}`}
                    borderRight={false}
                    colSpan={5}
                  />
                </TableRow>
                <TableRow sx={{ bgcolor: COLOR.HEADER }}>
                  <TableTitleCell title="日期" />
                  <TableTitleCell title={toTWDate(item.WORK_DATE1)} textAlign="right" />
                  <TableTitleCell title={toTWDate(item.WORK_DATE2)} textAlign="right" />
                  <TableTitleCell title={toTWDate(item.WORK_DATE3)} textAlign="right" />
                  <TableTitleCell
                    title={toTWDate(item.WORK_DATE4)}
                    textAlign="right"
                    borderRight={false}
                  />
                </TableRow>
                <TableRow>
                  <TableDataCell value="預定累計" />
                  <TableDataCell value={fm2(item.EXP_PERCENT1)} textAlign="right" />
                  <TableDataCell value={fm2(item.EXP_PERCENT2)} textAlign="right" />
                  <TableDataCell value={fm2(item.EXP_PERCENT3)} textAlign="right" />
                  <TableDataCell
                    value={fm2(item.EXP_PERCENT4)}
                    textAlign="right"
                    borderRight={false}
                  />
                </TableRow>
                <TableRow>
                  <TableDataCell value="實際累計" />
                  <TableDataCell value={fm2(item.ACT_SUM1)} textAlign="right" />
                  <TableDataCell value={fm2(item.ACT_SUM2)} textAlign="right" />
                  <TableDataCell value={fm2(item.ACT_SUM3)} textAlign="right" />
                  <TableDataCell value={fm2(item.ACT_SUM4)} textAlign="right" borderRight={false} />
                </TableRow>
                <TableRow>
                  <TableDataCell value="差異" />
                  <TableDataCell value={fm2(item.ACT_SUM1 - item.EXP_PERCENT1)} textAlign="right" />
                  <TableDataCell value={fm2(item.ACT_SUM2 - item.EXP_PERCENT2)} textAlign="right" />
                  <TableDataCell value={fm2(item.ACT_SUM3 - item.EXP_PERCENT3)} textAlign="right" />
                  <TableDataCell
                    value={fm2(item.ACT_SUM4 - item.EXP_PERCENT4)}
                    textAlign="right"
                    borderRight={false}
                  />
                </TableRow>
                <TableRow>
                  <TableDataCell
                    icon={<CampaignIcon sx={{ color: red[400] }} />}
                    title="差異說明："
                    value={item.REMARK_D}
                    colSpan={5}
                  />
                </TableRow>
                <TableRow>
                  <TableDataCell
                    icon={<NoteAltIcon sx={{ color: grey[600] }} />}
                    title="備註："
                    value={item.REMARK}
                    colSpan={5}
                  />
                </TableRow>
              </Fragment>
            )
          })}
        <TableFooter wkDate={data.CALENDAR_DATE} colSpan={5} />
      </TableBody>
    )
  }

  function tableHead() {
    return (
      <TableHead
        sx={{ bgcolor: COLOR.HEADER, '& .MuiTypography-root': { fontSize: `${fontSize}rem` } }}
      >
        <TableRow>
          <TableTitleCell title="日期" minWidth="120px" />
          <TableTitleCell
            title={toTWDate(data.WORK_DATE1)}
            sx={{ minWidth: '160px' }}
            textAlign="right"
          />
          <TableTitleCell
            title={toTWDate(data.WORK_DATE2)}
            sx={{ minWidth: '160px' }}
            textAlign="right"
          />
          <TableTitleCell
            title={toTWDate(data.WORK_DATE3)}
            sx={{ minWidth: '160px' }}
            textAlign="right"
          />
          <TableTitleCell
            title={toTWDate(data.WORK_DATE4)}
            sx={{ minWidth: '160px' }}
            textAlign="right"
            borderRight={false}
          />
        </TableRow>
      </TableHead>
    )
  }
}
