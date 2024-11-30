'use client'

import { ICCC_URL } from '@/config-global'

import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
export default function Home() {
  return (
    <>
      <Alert severity="error">{'頁面不存在'}</Alert>
      <Button
        href={ICCC_URL}
        variant="contained"
        size="large"
        color="error"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        返回 影音即時指揮中心 - 智慧決策平台
      </Button>
    </>
  )
}
