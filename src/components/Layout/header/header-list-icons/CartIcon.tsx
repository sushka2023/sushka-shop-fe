import { Link } from 'react-router-dom'
import { ListItem, useTheme } from '@mui/material'

import BasketCountIcon from '../../../basket-count-icon/BasketCountIcon'

type CartIconProps = {
  isActive: boolean
}

export const CartIcon = ({ isActive }: CartIconProps) => {
  const theme = useTheme()
  return (
    <ListItem
      sx={{
        pl: '0px',
        pr: '0px',
        [theme.breakpoints.down('sm')]: {
          display: isActive ? 'none' : 'block'
        }
      }}
    >
      <Link to="cart">
        <BasketCountIcon />
      </Link>
    </ListItem>
  )
}
