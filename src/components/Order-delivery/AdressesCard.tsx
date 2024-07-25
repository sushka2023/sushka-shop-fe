import { Card, CardHeader, Avatar, CardContent } from '@mui/material'
import { Typography } from '../../components/UI/Typography'
import { NovaPoshtaDataResponse } from '../../types'
import { cardCheckedStyle, cardHeaderStyle, cardStyle } from './style'
import logoNP from '../../icons/logoNP.svg'

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
        avatar={<Avatar sx={{ backgroundColor: 'white' }} src={logoNP} />}
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
          {option.address_warehouse},
        </Typography>
        <Typography variant="body1" color={getAddressCardColor(option.id)}>
          {option.city}
        </Typography>
      </CardContent>
    </Card>
  )
}

export { AdressesCard }
