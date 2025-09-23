'use client'

import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { ICCC_URL } from '@/config-global'

import Stack from '@mui/material/Stack'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

// 使用 dynamic import 並設定 ssr: false 來避免 hydration 問題
const NavBarContent = dynamic(() => Promise.resolve(NavBarContentComponent), {
  ssr: false,
  loading: () => (
    <AppBar position="sticky" color="default">
      <Toolbar variant="dense" sx={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ width: 40, height: 40, backgroundColor: '#f0f0f0', borderRadius: 4 }} />
        <div style={{ marginLeft: 16, flexGrow: 1 }}>
          <div style={{ width: 200, height: 20, backgroundColor: '#f0f0f0', borderRadius: 4 }} />
        </div>
      </Toolbar>
    </AppBar>
  ),
})

function NavBarContentComponent() {
  return (
    <AppBar position="sticky" color="default">
      <Toolbar variant="dense" sx={{ display: 'flex', alignItems: 'center' }}>
        <Link href={ICCC_URL}>
          <Image
            src="/logo.png"
            alt="logo"
            height={40}
            width={40}
            style={{ minWidth: 40, minHeight: 40 }}
          />
        </Link>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            flexGrow: 1,
            alignItems: 'end',
            display: 'flex',
            ml: 2,
            overflow: 'hidden',
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            color="inherit"
            sx={{ lineHeight: 1, whiteSpace: 'nowrap' }}
          >
            工程工務處
          </Typography>
          <Typography variant="h5" color="inherit" sx={{ lineHeight: 1, whiteSpace: 'nowrap' }}>
            保固管控
          </Typography>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default function NavBar() {
  return <NavBarContent />
}
