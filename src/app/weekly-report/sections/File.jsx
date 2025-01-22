'use client'
import Image from 'next/image'
import { Fragment } from 'react'
import { SIZE, COLOR, OFFSET } from '@/config-global'

import { Tooltip, TableRow, TableBody, TableCell, Typography } from '@mui/material'

import TableFooter from '../components/TableFooter'
import { useFontSize } from '../context/useFontSize'
import TableWrapper from '../components/TableWrapper'
import TableDataCell from '../components/TableDataCell'
import TableBodyNodata from '../components/TableBodyNodata'
export default function File({ data, is102B1A = false }) {
  const { fontSize } = useFontSize()
  return (
    <>
      <div id="file-section" style={{ position: 'relative', top: OFFSET, visibility: 'hidden' }} />
      <TableWrapper title={is102B1A ? '參、施工現況' : '伍-2、施工現況'} colSpan={6}>
        {data.length > 0 ? tableBody() : <TableBodyNodata />}
      </TableWrapper>
    </>
  )

  function tableBody() {
    return (
      <TableBody sx={{ '& .MuiTypography-root': { fontSize: `${fontSize}rem` } }}>
        {data.map((item, index) => (
          <Fragment key={index}>
            <TableRow sx={{ bgcolor: '#BDE3FF' }}>
              <TableCell>
                <Typography variant={SIZE.TEXT}>
                  {/* 如果FILE_TYPE是txt，則顯示📋，是jpg或是png則顯示🖼️，是pdf則顯示📃 */}
                  {item.FILE_TYPE === 'txt' ? (
                    <Tooltip title="文字" placement="top" arrow>
                      📋
                    </Tooltip>
                  ) : item.FILE_TYPE === 'jpg' || item.FILE_TYPE === 'png' ? (
                    <Tooltip title="圖片" placement="top" arrow>
                      🖼️
                    </Tooltip>
                  ) : item.FILE_TYPE === 'pdf' ? (
                    <Tooltip title="PDF" placement="top" arrow>
                      📕
                    </Tooltip>
                  ) : (
                    ''
                  )}
                  {index + 1}.{item.PIC_TYPE_CH}
                  {item.REMARK && ` - ${item.REMARK}`}
                </Typography>
              </TableCell>
            </TableRow>
            {item.FILE_URL && (
              <TableRow sx={{ bgcolor: COLOR.BGCOLOR }}>
                {item.FILE_TYPE === 'jpg' || item.FILE_TYPE === 'png' ? (
                  <TableCell>
                    <Image
                      src={item.FILE_URL}
                      alt={item.PIC_TYPE_CH}
                      width={2400}
                      height={1600}
                      style={{
                        objectFit: 'contain',
                        border: '1px solid #e0e0e0', // 加入淺灰色邊框
                        borderRadius: '8px',
                      }}
                      className="w-full object-contain"
                    />{' '}
                  </TableCell>
                ) : item.FILE_TYPE === 'txt' ? (
                  <TableDataCell value={item.FILE_TEXT} />
                ) : item.FILE_TYPE === 'pdf' ? (
                  <TableDataCell value="顯示PDF" />
                ) : (
                  <TableDataCell value="無內容" />
                )}
              </TableRow>
            )}
          </Fragment>
        ))}
        <TableFooter wkDate={data[0].CALENDAR_DATE} />
      </TableBody>
    )
  }
}
