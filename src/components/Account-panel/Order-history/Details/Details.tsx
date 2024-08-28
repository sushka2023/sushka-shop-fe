import { Box } from '@mui/material'
import { Typography } from '../../../UI/Typography'
import { FC } from 'react'
import { Details } from '../Title/HistoryPage'
import { translatePostType } from '../../../../utils/order-history/translate-post'
import { renderAddress } from '../../../../utils/order-history/render-address'
import { formatPrice } from '../../../../utils/format-price/formatPrice'
import { SelectedOrder } from '../Order/Orders'
import { stP1, stP1des, stP2, stSpan } from '../style'

type Props = {
  details: Details | null
  orderId: SelectedOrder | null
}

export const DetailsPaper: FC<Props> = ({ details, orderId }) => {
  if (!orderId || !details) return null

  const { post_type, selected_nova_poshta, price_order, phone_number } = details

  return (
    <Box
      sx={{
        gridColumn: { xs: 'span 12', md: 'span 8' }
      }}
    >
      <Box
        sx={{
          mb: 3,
          bgcolor: 'background.default',
          borderRadius: 2,
          height: '100%',
          p: 3
        }}
      >
        <Box borderBottom="1.5px solid #FEEEE1" mb={2} pb={5}>
          <Typography variant="body1" sx={stP1}>
            Деталі замовлення
          </Typography>
          <Box display="flex" justifyContent="space-between" gap={1}>
            <Typography variant="body2" sx={stP2}>
              Номер телефону
            </Typography>
            <Typography variant="body2" sx={stP1des}>
              {phone_number}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" gap={1}>
            <Typography variant="body2" sx={stP2}>
              Спосіб доставки
            </Typography>
            <Typography variant="body2" sx={stP1des}>
              {translatePostType(post_type)}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" gap={1}>
            <Typography variant="body2" sx={stP2}>
              Адреса доставки
            </Typography>
            {renderAddress(post_type, selected_nova_poshta)}
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2" sx={stP1}>
            Сума
          </Typography>
          <Typography
            variant="body2"
            sx={{ ...stP1, alignItems: 'end' }}
            display="flex"
          >
            {formatPrice(price_order)}
            <Typography component="span" sx={stSpan}>
              ₴
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
