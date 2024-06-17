import { Card, CardHeader, Avatar, CardContent } from '@mui/material'
import { Typography } from '../../components/UI/Typography'
import { NovaPoshtaDataResponse } from '../../types'
import { cardCheckedStyle, cardHeaderStyle, cardStyle } from './style'

type Props = {
  option: NovaPoshtaDataResponse
  selectedAdressId: number
}

const AdressesCard: React.FC<Props> = ({ option, selectedAdressId }) => {
  const getAddressCardColor = (id: number) =>
    id === selectedAdressId ? 'white' : 'secondary.darker'

  return (
    <Card sx={option.id !== selectedAdressId ? cardStyle : cardCheckedStyle}>
      <CardHeader
        avatar={<Avatar>NP</Avatar>}
        title={
          <Typography color={getAddressCardColor(option.id)}>
            Нова Пошта
          </Typography>
        }
        subheader={
          <Typography variant="body1" color={getAddressCardColor(option.id)}>
            Відділення
          </Typography>
        }
        sx={cardHeaderStyle}
      />
      <CardContent>
        <Typography variant="body1" color={getAddressCardColor(option.id)}>
          Відділення №{option.address_warehouse},
        </Typography>
        <Typography variant="body1" color={getAddressCardColor(option.id)}>
          {option.city}
        </Typography>
      </CardContent>
    </Card>
  )
}

export { AdressesCard }
