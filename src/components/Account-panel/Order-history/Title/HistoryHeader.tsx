import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Dispatch, FC, SetStateAction, useEffect, useRef } from 'react'
import { SelectedOrder } from '../Order/Orders'

type Props = {
  orderId: SelectedOrder | null
  setSelectedOrderId: Dispatch<SetStateAction<SelectedOrder | null>>
}

export const HistoryHeader: FC<Props> = ({ orderId, setSelectedOrderId }) => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const contactButtonRef = useRef<HTMLButtonElement | null>(null)

  const handleBack = () => {
    setSelectedOrderId(null)
  }

  useEffect(() => {
    if (orderId && contactButtonRef.current) {
      contactButtonRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [orderId])

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        [theme.breakpoints.down('sm')]: {
          justifyContent: orderId ? 'space-between' : 'flex-end',
          pt: 3
        }
      }}
    >
      {!isSmallScreen && <Typography variant="h3">Ваші замовлення</Typography>}
      {isSmallScreen && orderId && (
        <Button
          onClick={handleBack}
          sx={{
            fontWeight: 600,
            p: '5px 10px'
          }}
        >
          <ArrowBackIcon />
          Назад
        </Button>
      )}

      <Button
        ref={contactButtonRef}
        sx={{
          'padding': '10px 20px',
          'borderRadius': 6,
          'backgroundColor': '#FFFFFF',
          'color': '#64748B',
          'border': '#567343',
          'fontSize': 14,
          'fontWeight': 700,
          '&:hover': {
            backgroundColor: '#64748B',
            color: '#FFFFFF',
            border: '#FFFFFF'
          }
        }}
      >
        Зв’яжіться з нами
        <CreateIcon sx={{ fontSize: 20, ml: 1 }} />
      </Button>
    </Box>
  )
}
