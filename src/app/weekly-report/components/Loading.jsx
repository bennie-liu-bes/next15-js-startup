import Image from 'next/image'
import { motion } from 'framer-motion'

// import { VelocityScroll } from '@/components/magic-ui/scroll-based-velocity'

import { Box } from '@mui/material'
import Container from '@mui/material/Container'
export default function Loading() {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          width: 120,
          height: 120,
          alignItems: 'center',
          position: 'relative',
          display: 'inline-flex',
          justifyContent: 'center',
        }}
      >
        <Box
          component={motion.div}
          animate={{
            scale: [1, 1, 1],
            opacity: [1, 0.75, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          sx={{ display: 'inline-flex' }}
        >
          <Image src="/logo.png" alt="logo" height={64} width={64} priority />
        </Box>

        <Box
          component={motion.div}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.8, 0.3],
            borderRadius: ['25%', '50%', '25%'],
          }}
          transition={{
            ease: 'easeInOut',
            duration: 2,
            repeat: Infinity,
            repeatType: 'loop',
          }}
          sx={{
            position: 'absolute',
            width: 'calc(100% - 16px)',
            height: 'calc(100% - 16px)',
            border: `solid 2px grey`,
          }}
        />

        <Box
          component={motion.div}
          animate={{
            scale: [1.1, 0.9, 1.1],
            rotate: [360, 180, 0],
            opacity: [0.8, 0.3, 0.8],
            borderRadius: ['50%', '25%', '50%'],
          }}
          transition={{
            ease: 'easeInOut',
            duration: 2,
            repeat: Infinity,
            repeatType: 'loop',
          }}
          sx={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            border: `solid 6px grey`,
          }}
        />
      </Box>
      <Box sx={{ width: '100vw' }}>
        {/* <VelocityScroll
          text="翼起亞洲  飛揚亞洲"
          default_velocity={5}
          className="text-xl font-bold tracking-[-0.02em] text-black drop-shadow-sm dark:text-white md:text-xl md:leading-[5rem]"
        /> */}
      </Box>
    </Container>
  )
}
