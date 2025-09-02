import { ICCC_URL } from '@/config-global'

import { Alert, Button, Box, Typography, Paper } from '@mui/material'

export default function Error({ message, debugInfo }) {
  return (
    <>
      <Alert severity="error">{message}</Alert>

      {/* 顯示 debugInfo - 暫時隱藏 */}
      {/* {debugInfo && (
        <Box sx={{ mt: 2, mb: 2 }}>
          <Paper elevation={1} sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
            <Typography variant="h6" gutterBottom color="error">
              驗證資訊 (除錯用)
            </Typography>
            <Typography
              variant="body2"
              component="pre"
              sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}
            >
              {JSON.stringify(debugInfo, null, 2)}
            </Typography>
          </Paper>
        </Box>
      )} */}

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
