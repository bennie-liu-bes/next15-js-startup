import { createTheme } from '@mui/material/styles'

import { typography } from './typography'

const theme = createTheme({
  components: {
    MuiTypography: typography.defaultProps.Typography,
  },
  // 其他主題設定...
})

export default theme
