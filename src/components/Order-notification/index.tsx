import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { UserResponse } from '../../types'
import { ModalCustom } from '../Modal-custom-btn/ModalCustomWindow'
import AcceptIcon from '../../icons/crmcheckbox.svg?react'
import CrossIcon from '../../icons/cross.svg?react'
import { Typography } from '../UI/Typography'
import {
  ACCESS_NOTIFICATION_TEXT,
  ERROR_NOTIFICATION_HEADER,
  ERROR_NOTIFICATION_TEXT
} from '../../pages/order-page/constants'
import { Fragment } from 'react/jsx-runtime'

type Props = {
  isError: string
  user: UserResponse | null
  isNotificationModal: boolean
  setIsNotificationModal: React.Dispatch<React.SetStateAction<boolean>>
  setIsError: React.Dispatch<React.SetStateAction<string>>
  orderNumber: number | null
}

const OrderNotification: React.FC<Props> = ({
  isError,
  setIsError,
  user,
  isNotificationModal,
  setIsNotificationModal,
  orderNumber
}) => {
  const navigate = useNavigate()

  const closeModalNotification = () => {
    if (!isError) {
      setIsError('')
      user ? navigate('/account') : navigate('/')
    }
    return setIsError('')
  }

  return (
    <ModalCustom
      openModal={isNotificationModal}
      setOpenModal={setIsNotificationModal}
      callback={closeModalNotification}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          marginBottom: '30px',
          backgroundColor: !isError ? 'primary.darker' : 'error.darker'
        }}
      >
        {isError ? (
          <CrossIcon style={{ width: '30px', height: '30px', fill: 'white' }} />
        ) : (
          <AcceptIcon
            style={{ width: '30px', height: '30px', fill: 'white' }}
          />
        )}
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        gap="10px"
      >
        {!isError ? (
          <Fragment>
            <Typography>{`Ваше замовлення №${orderNumber} оформлене`}</Typography>
            <Typography variant="body1">{ACCESS_NOTIFICATION_TEXT}</Typography>
          </Fragment>
        ) : (
          <Fragment>
            <Typography>{ERROR_NOTIFICATION_HEADER}</Typography>
            <Typography variant="body1">{ERROR_NOTIFICATION_TEXT}</Typography>
          </Fragment>
        )}
      </Box>
    </ModalCustom>
  )
}

export { OrderNotification }
