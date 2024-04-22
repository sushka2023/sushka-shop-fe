import { Card, CardContent, Divider, Grid } from '@mui/material'
import OrderPrice from './OrderPrice'
import { Typography } from '../Typography'
import OrderList from './OrderList'
import { BasketItemsResponse } from '../../types'
import { SUM, TARIFF, DELIVERY } from '../../pages/order-page/constants'
import { cardStyle, cardContentStyle, dividerStyle } from './style'

type Props = {
  orderList: BasketItemsResponse[]
}

const OrderCard: React.FC<Props> = ({ orderList }) => {
  const totalPrice = orderList.reduce(
    (total, order) => total + order.quantity * order.product.prices[0].price,
    0
  )
  const formatter = new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: 'UAH',
    currencyDisplay: 'symbol'
  })

  const formattedTotalPrice = formatter.format(totalPrice).replace('грн', '₴')

  return (
    <Grid item xs={3}>
      <Card sx={cardStyle}>
        <Typography
          variant="h3"
          fontFamily="Comfortaa"
          fontWeight="500"
          fontSize="32px"
          pt={'20px'}
          pl={'20px'}
        >
          Ваше замовлення
        </Typography>
        <CardContent sx={cardContentStyle}>
          <OrderList orderList={orderList} />
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
