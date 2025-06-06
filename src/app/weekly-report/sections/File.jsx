'use client'
import Image from 'next/image'
import { X } from 'lucide-react'
import { Fragment, useState } from 'react'
import { SIZE, COLOR, OFFSET } from '@/config-global'

import {
  Dialog,
  DialogTitle,
  DialogPortal,
  DialogContent,
  DialogOverlay,
} from '@/components/ui/dialog'

import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Tooltip, TableRow, TableBody, TableCell, Typography } from '@mui/material'

import TableFooter from '../components/TableFooter'
import { useFontSize } from '../context/useFontSize'
import TableWrapper from '../components/TableWrapper'
import TableDataCell from '../components/TableDataCell'
import TableBodyNodata from '../components/TableBodyNodata'

export default function File({ data, is102B1A = false }) {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.down('sm'))
  const { fontSize } = useFontSize()

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  const handleImageClick = imageData => {
    setSelectedImage(imageData)
    setLightboxOpen(true)
  }

  return (
    <>
      <div id="file-section" style={{ position: 'relative', top: OFFSET, visibility: 'hidden' }} />
      <TableWrapper title={is102B1A ? '肆、施工現況' : '伍-2、施工現況'} colSpan={6}>
        {data.length > 0 ? tableBody() : <TableBodyNodata />}
      </TableWrapper>

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogPortal>
          <DialogOverlay className="z-[9999] bg-black/90 backdrop-blur-sm" />
          <DialogContent
            className="z-[9999] flex h-screen max-h-none w-screen max-w-none items-center justify-center border-none bg-transparent p-0"
            onPointerDownOutside={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute right-4 top-4 z-[10000] rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20"
            >
              <X className="size-6 text-white" />
            </button>

            <DialogTitle className="sr-only">
              {selectedImage ? `圖片：${selectedImage.PIC_TYPE_CH}` : '圖片檢視器'}
            </DialogTitle>

            {selectedImage && (
              <div className="relative flex size-full items-center justify-center p-8">
                <Image
                  src={selectedImage.FILE_URL}
                  alt={selectedImage.PIC_TYPE_CH}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
            )}
          </DialogContent>
        </DialogPortal>
      </Dialog>
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
                  ) : item.FILE_TYPE === 'pdf' ||
                    item.FILE_TYPE === 'doc' ||
                    item.FILE_TYPE === 'docx' ? (
                    <Tooltip title="文件" placement="top" arrow>
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
                    <div
                      onClick={() => handleImageClick(item)}
                      className="cursor-pointer transition-opacity hover:opacity-90"
                    >
                      <Image
                        src={item.FILE_URL}
                        alt={item.PIC_TYPE_CH}
                        width={2400}
                        height={1600}
                        style={{
                          objectFit: 'contain',
                          border: '1px solid #e0e0e0',
                          borderRadius: '8px',
                        }}
                        className="w-full object-contain"
                      />
                    </div>
                  </TableCell>
                ) : item.FILE_TYPE === 'txt' ? (
                  <TableDataCell value={item.FILE_TEXT} />
                ) : item.FILE_TYPE === 'pdf' ? (
                  <TableCell sx={{ p: 0 }}>
                    <iframe
                      src={`${item.FILE_URL}#view=FitH`}
                      style={{
                        width: '100%',
                        height: isXs ? '100%' : '835px',
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                      }}
                      title={item.FILE_NAME.replace('.pdf', '')}
                    />
                  </TableCell>
                ) : item.FILE_TYPE === 'doc' || item.FILE_TYPE === 'docx' ? (
                  <TableCell sx={{ p: 0 }}>
                    <iframe
                      src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(item.FILE_URL)}&wdStartOn=1&wdEmbedCode=0&wdAllowInteractivity=False&wdPrint=1&wdDownloadButton=1&wdFitPage=True`}
                      style={{
                        width: '100%',
                        height: isXs ? '400px' : '835px',
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                      }}
                      title={item.FILE_NAME.replace('.doc', '')}
                      width="100%"
                    />
                  </TableCell>
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
