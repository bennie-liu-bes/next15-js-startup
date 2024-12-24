'use client'
import Image from 'next/image'
import { Fragment } from 'react'
import { SIZE, COLOR, OFFSET } from '@/config-global'

import { TableRow, TableBody, TableCell, Typography } from '@mui/material'

import TableFooter from '../components/TableFooter'
import { useFontSize } from '../context/useFontSize'
import TableWrapper from '../components/TableWrapper'
import TableDataCell from '../components/TableDataCell'
import TableBodyNodata from '../components/TableBodyNodata'
export default function File({ data }) {
  const { fontSize } = useFontSize()
  return (
    <>
      <div id="file-section" style={{ position: 'relative', top: OFFSET, visibility: 'hidden' }} />
      <TableWrapper title="伍-2、施工現況">
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
                  🖼️ {index + 1}.{item.PIC_TYPE_CH}
                </Typography>
              </TableCell>
            </TableRow>
            {item.FILE_URL && (
              <TableRow sx={{ bgcolor: COLOR.BGCOLOR }}>
                {item.FILE_PATH ? (
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
                ) : (
                  <TableDataCell value={item.FILE_TEXT} />
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
