import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { OrdersCRMResponse, OrdersStatuses } from '../../types'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import PersonIcon from '@mui/icons-material/Person'
import BagIcon from '../../icons/bag.svg?react'
import ClipBoardIcon from '../../icons/clipboard.svg?react'
import TruckIcon from '../../icons/truck-fast.svg?react'
import NotificationIcon from '../../icons/notification.svg?react'
import {
  btnStyle,
  containedBtnStyle,
  multilineStyle,
  selectStyle
} from './style'
import { getOrderDetails, orderStatusArray } from './utils'
import { fetchOrder } from './operations'
import { ORDER_STATUS } from '../crm-orders-page/constants'
import { CrmOrderDetails } from '../../components/Crm-order-details'
import { OrderDetailsKey } from './types'

const CrmEditOrderPage = () => {
  const [status, setStatus] = useState(OrdersStatuses.NEW)
  const [order, setOrder] = useState<OrdersCRMResponse | null>(null)
  const { params } = useParams()

  useEffect(() => {
    params && fetchOrder(params, setStatus, setOrder)
  }, [params])

  const handleChange = (event: SelectChangeEvent) =>
    setStatus(event.target.value as OrdersStatuses)

  return (
    <Box p="30px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h3" color="illustrations.darker">
          Деталі замовлення
        </Typography>
        <FormControl sx={{ flexDirection: 'row', gap: '20px' }}>
          <Select
            sx={selectStyle}
            IconComponent={KeyboardArrowDownRoundedIcon}
            value=""
            onChange={handleChange}
            displayEmpty
            renderValue={() => 'Змінити статус'}
          >
            {orderStatusArray.map(({ status, text, style }) => (
              <MenuItem
                key={status}
                sx={{ ...style, borderRadius: '10px', marginBottom: '10px' }}
                value={status}
              >
                {text}
              </MenuItem>
            ))}
          </Select>
          <Button
            variant="contained"
            sx={{ ...btnStyle, ...containedBtnStyle }}
          >
            Зберегти
          </Button>
        </FormControl>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        gap="10px"
        color="illustrations.darker"
        mt="15px"
      >
        <Typography fontWeight={600}>
          ID Замовлення:
          <Typography
            fontWeight={600}
            fontSize={22}
            component="span"
            color="accent.darker"
          >
            #{order?.id}
          </Typography>
        </Typography>
        <Typography fontWeight={600}>
          {order?.created_at.split('T')[0]}
        </Typography>
        <Box
          sx={{
            width: 'fit-content',
            padding: '5px 10px',
            borderRadius: '10px',
            ...ORDER_STATUS[status].style
          }}
        >
          <Typography fontWeight={600}>{ORDER_STATUS[status].text}</Typography>
        </Box>
      </Box>

      <Box mt="40px" display="grid" gridTemplateColumns="repeat(3, 1fr)">
        <CrmOrderDetails
          orderDetails={getOrderDetails(order, OrderDetailsKey.CLIENT_INFO)}
          title="Клієнт"
          icon={
            <PersonIcon
              sx={{ color: 'accent.darker', width: '35px', height: '35px' }}
            />
          }
        />
        <CrmOrderDetails
          orderDetails={getOrderDetails(order, OrderDetailsKey.DETAILS_INFO)}
          title="Деталі замовлення"
          icon={<BagIcon />}
        />
        <CrmOrderDetails title="Нотатки" icon={<ClipBoardIcon />}>
          <TextField
            defaultValue={order?.notes_admin}
            multiline
            rows={6}
            sx={multilineStyle}
          />
        </CrmOrderDetails>
        <CrmOrderDetails
          orderDetails={getOrderDetails(order, OrderDetailsKey.DELIVERY_INFO)}
          title="Доставка"
          icon={<TruckIcon />}
        />
        <CrmOrderDetails
          title="Коментар до замовлення"
          icon={<NotificationIcon />}
        >
          <Box>{order?.comment}</Box>
        </CrmOrderDetails>
      </Box>
    </Box>
  )
}

export default CrmEditOrderPage
