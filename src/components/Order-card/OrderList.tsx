import { useContext } from 'react'
import { OrderContext } from '../../pages/order-page'
import { CardMedia, List, ListItem, Stack, Box } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { Typography } from '../../components/UI/Typography'
import { listStyle, listItemStyle, closeIconStyle } from './style'
import axiosInstance from '../../axios/settings'

const OrderList = () => {
  const { orderList, setOrderList } = useContext(OrderContext)!

  const removeProduct = async (id: number) => {
    await axiosInstance.delete(`api/basket_items/remove`, {
      data: {
        id
      }
    })
    return setOrderList(orderList.filter((orderItem) => orderItem.id !== id))
  }

  return (
    <List sx={listStyle}>
      {orderList?.map((order, index) => (
        <ListItem key={index} sx={listItemStyle}>
          <Box display="flex" gap="20px">
            <Box>
              <CardMedia
                component="img"
                height="80"
                width="80"
                image={order.product.images[0].image_url}
                alt={order.product.name}
              />
            </Box>
            <Stack width="100%">
              <Box>
                <Typography fontSize="22px">{order.product.name}</Typography>
                <Typography fontSize="16px">
                  {order.product.prices[0].weight} г
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mt="10px">
                <Typography fontWeight="400" fontSize="16px">
                  {order.quantity} шт
                </Typography>
                <Typography>{order.product.prices[0].price}₴</Typography>
              </Box>
            </Stack>
          </Box>
          <CloseIcon
            sx={closeIconStyle}
            onClick={() => removeProduct(order.id)}
          />
        </ListItem>
      ))}
    </List>
  )
}

export default OrderList
