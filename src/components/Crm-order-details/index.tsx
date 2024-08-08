import { Box, List, ListItem, Typography } from '@mui/material'
import { orderDetailsIconStyle } from '../../pages/crm-edit-order-page/style'
import { OrderDetailsType } from '../../pages/crm-edit-order-page/types'

type Props = {
  orderDetails?: OrderDetailsType[]
  title: string
  children?: React.ReactNode
  icon: React.ReactNode
}

const CrmOrderDetails: React.FC<Props> = ({
  orderDetails,
  title,
  children,
  icon
}) => {
  return (
    <Box
      sx={{ display: 'flex', gap: '20px', width: '100%', marginBottom: '40px' }}
    >
      <Box sx={orderDetailsIconStyle}>{icon}</Box>
      <Box display="flex" flexDirection="column" gap="15px">
        <Typography fontSize={18} fontWeight={600} color="#000">
          {title}
        </Typography>
        {orderDetails ? (
          <List
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              padding: 0
            }}
          >
            {orderDetails.map(({ tag, value }) => (
              <ListItem
                key={tag}
                sx={{
                  padding: 0,
                  display: 'flex',
                  gap: '5px',
                  alignItems: 'flex-start'
                }}
              >
                <Typography color="illustrations.darker">{tag}</Typography>
                <Typography color="#000">{value}</Typography>
              </ListItem>
            ))}
          </List>
        ) : (
          children
        )}
      </Box>
    </Box>
  )
}

export { CrmOrderDetails }
