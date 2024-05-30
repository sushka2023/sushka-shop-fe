import { Card, CardContent, Divider, Grid } from '@mui/material'
import OrderPrice from './OrderPrice'
import { useContext } from 'react'
import { Typography } from '../../components/UI/Typography'
import OrderList from './OrderList'
import { SUM, TARIFF, DELIVERY } from '../../pages/order-page/constants'
import { cardStyle, cardContentStyle, dividerStyle } from './style'
import { OrderContext } from '../../pages/order-page'
import { calculateTotal, formatter } from '../../helpers/formatterTotalPrice'

const OrderCard = () => {
  const { orderList } = useContext(OrderContext)!

  const totalPrice = calculateTotal(orderList)

  const formattedTotalPrice = formatter.format(totalPrice)

  return (
    <Grid item xs={3}>
      <Card sx={cardStyle}>
        <Typography
          variant="h3"
          fontFamily="Comfortaa"
          fontWeight="500"
          fontSize="32px"
          pt="20px"
          pl="20px"
        >
          Ваше замовлення
        </Typography>
        <CardContent sx={cardContentStyle}>
          <OrderList />
          <Divider sx={dividerStyle} />
          <OrderPrice label={DELIVERY} content={TARIFF} />
          <Divider sx={dividerStyle} />
          <OrderPrice label={SUM} content={formattedTotalPrice} />
        </CardContent>
      </Card>
    </Grid>
  )
}

export default OrderCard
