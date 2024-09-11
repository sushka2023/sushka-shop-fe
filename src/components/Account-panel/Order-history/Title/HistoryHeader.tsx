import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Dispatch, FC, SetStateAction, useEffect, useRef } from 'react'
import { SelectedOrder } from '../Order/Orders'
import { stBoxHeader, stBtnBack, stBtnContact } from '../style'

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
    if (isSmallScreen && orderId && contactButtonRef.current) {
      contactButtonRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [orderId])

  return (
    <Box sx={stBoxHeader(orderId, theme)}>
      {!isSmallScreen && <Typography variant="h3">Ваші замовлення</Typography>}
      {isSmallScreen && orderId && (
        <Button onClick={handleBack} sx={stBtnBack}>
          <ArrowBackIcon />
          Назад
        </Button>
      )}

      <Button ref={contactButtonRef} sx={stBtnContact}>
        Зв’яжіться з нами
        <CreateIcon sx={{ fontSize: 20, ml: 1 }} />
      </Button>
    </Box>
  )
}
