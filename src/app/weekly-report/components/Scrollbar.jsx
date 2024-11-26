import { Box, styled } from '@mui/material'

const ScrollBar = styled(Box)(({ theme }) => {
  const scrollThumbColor = theme.palette.mode !== 'dark' ? '#babac0' : '#babac0'
  const scrollThumbBorder = theme.palette.mode !== 'dark' ? '5px solid #fff' : '5px solid #000'
  const scrollThumbHoverColor = theme.palette.mode !== 'dark' ? '#a0a0a5' : '#a0a0a5'
  const scrollThumbHoverBorder = theme.palette.mode !== 'dark' ? '4px solid #fff' : '4px solid #000'

  return {
    '&::-webkit-scrollbar': {
      backgroundColor: theme.palette.background.default,
      width: '16px',
      height: '16px',
    },
    '&::-webkit-scrollbar-button': { display: 'none' },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: scrollThumbColor,
      border: scrollThumbBorder,
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: theme.palette.background.default,
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: scrollThumbHoverColor,
      border: scrollThumbHoverBorder,
    },
    '&::-webkit-scrollbar-track:hover': {
      borderRadius: '16px',
    },
  }
})

export default ScrollBar
