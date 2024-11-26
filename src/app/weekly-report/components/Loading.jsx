import Container from '@mui/material/Container'
import CircularProgress from '@mui/material/CircularProgress'

export default function Loading() {
  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <CircularProgress />
    </Container>
  )
}
