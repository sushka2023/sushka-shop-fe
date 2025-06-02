import { Box, CircularProgress } from '@mui/material'
import { ProductResponse } from '../../../../types'
import { Typography } from '../../../UI/Typography'
import { Link } from 'react-router-dom'
import { elementImageStyle, elementTextStyle, listElementStyle } from './style'

type Props = {
  data: ProductResponse[] | null
  error: string | null
  isLoading: boolean
}

const SearchResult = ({ data, error, isLoading }: Props) => {
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" marginTop={2}>
        <CircularProgress size={25} />
      </Box>
    )
  }

  if (error) {
    return (
      <Typography variant="body2" textAlign="center" marginTop={1}>
        {error}
      </Typography>
    )
  }

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      {data?.map(({ id, product_category_id, images, name }) => (
        <Box
          key={id}
          component={Link}
          to={`/catalog/${product_category_id}/${id}/details`}
          sx={listElementStyle}
        >
          <Box
            component="img"
            src={images[0]?.image_url}
            alt="product item"
            sx={elementImageStyle}
          />
          <Typography variant="body1" sx={elementTextStyle}>
            {name}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}

export { SearchResult }
