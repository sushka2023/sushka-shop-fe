import { Box } from '@mui/material'
import { FC } from 'react'
import { Typography } from '../../../UI/Typography'

type Props = {
  products: any
  lastElementRef: (node: HTMLDivElement | null) => void
}

export const PaperSearchInfo: FC<Props> = ({ products, lastElementRef }) => {
  if (!products.length) return null

  return (
    <Box
      sx={{
        width: 300,
        height: 500,
        bgcolor: '#fff',
        position: 'absolute',
        mt: 2,
        zIndex: 100,
        boxShadow: 3,
        borderRadius: 2,
        overflow: 'hidden'
      }}
    >
      <Box
        sx={{
          maxHeight: '100%',
          overflowY: 'auto',
          padding: 0
        }}
      >
        {products.map((elem: any, index: number) => (
          <Box
            key={index}
            ref={products.length === index + 1 ? lastElementRef : null}
            sx={{
              display: 'flex',
              alignItems: 'center',
              m: '15px 0',
              padding: '10px',
              borderBottom: '1px solid #ddd'
            }}
          >
            {elem.images.length > 0 && (
              <img
                src={elem.images[0].image_url}
                alt={elem.name}
                style={{ width: 104, height: 'auto', borderRadius: 8 }}
              />
            )}
            <Typography variant="h4" fontSize={17} sx={{ ml: 2 }}>
              {elem.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
