import { Stack } from '@mui/material'
import { SUM } from '../../pages/order-page/constants'
import { Typography } from '../../components/UI/Typography'

type Props = {
  label: string
  content?: string
}

const OrderPrice: React.FC<Props> = ({ content, label }) => {
  const fontSize = label === SUM ? '32px' : '18px'

  return (
    <Stack
      alignItems="center"
      flexDirection="row"
      justifyContent="space-between"
      p={2}
      pl={0}
    >
      <Typography>{label}</Typography>
      <Typography fontSize={fontSize}>{content}</Typography>
    </Stack>
  )
}

export default OrderPrice
