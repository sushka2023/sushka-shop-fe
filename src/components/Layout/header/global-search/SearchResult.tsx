import { Box } from '@mui/material'
import { ProductResponse } from '../../../../types'
import { Typography } from '../../../UI/Typography'
import { Link } from 'react-router-dom'

type Props = {
  data: ProductResponse[] | null
  error: string | null
  isLoading: boolean
}

const SearchResult = ({ data, error, isLoading }: Props) => {
  if (isLoading) return <Box>loading...</Box>

  if (error) {
    return (
      <Typography variant="body2" textAlign="center" marginTop={1}>
        {error}
      </Typography>
    )
  }

  return (
    <Box>
      {data?.map(({ id, product_category_id, images, name }) => (
        <Box
          key={id}
          component={Link}
          to={`/catalog/${product_category_id}/${id}/details`}
          sx={{
            'display': 'flex',
            'alignItems': 'center',
            'width': '220px',
            'color': 'secondary.darker',
            '&:hover': {
              color: 'secondary.main'
            }
          }}
        >
          <Box
            component="img"
            src={images[0]?.image_url}
            alt="product item"
            sx={{
              width: '60px',
              height: '60px',
              objectFit: 'contain'
            }}
          />
          <Typography
            variant="body1"
            sx={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              WebkitLineClamp: 1,
              fontWeight: 500,
              color: 'currentcolor'
            }}
          >
            {name}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}

export { SearchResult }
