import { Box, Grid, Typography } from '@mui/material'
import { FC, Fragment } from 'react'

type Props = {
  product: any
}
export const CrmCategoriesBlockView: FC<Props> = ({ product }) => {
  return (
    <Fragment>
      <Typography
        variant="body1"
        sx={{
          color: '#64748b',
          fontSize: 14,
          fontWeight: 500,
          mt: 2
        }}
      >
        Категорія товару
      </Typography>
      <Box
        sx={{
          maxWidth: 170,
          bgcolor: '#f7f7f7',
          color: '#567343',
          borderRadius: '0.5rem',
          padding: '0.75rem 1rem',
          fontFamily: 'Open Sans',
          fontWeight: 400,
          border: '1px solid',
          borderColor: 'rgba(100, 116, 139, 0.2)',
          mt: 1
        }}
      >
        Фріпси
      </Box>
      <Typography
        pt={4}
        variant="body1"
        sx={{ color: '#64748b', fontSize: 14, fontWeight: 500 }}
      >
        Саб-категорія товару
      </Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 2 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        pt={1}
        maxWidth={1000}
      >
        {product &&
          product.sub_categories.map(
            (elem: { name: string }, index: number) => (
              <Grid item sm={4} md={3} key={index}>
                <Box
                  sx={{
                    maxWidth: 170,
                    bgcolor: '#f7f7f7',
                    color: '#567343',
                    borderRadius: '0.5rem',
                    padding: '0.75rem 1rem',
                    fontFamily: 'Open Sans',
                    fontWeight: 400,
                    border: '1px solid',
                    borderColor: 'rgba(100, 116, 139, 0.2)'
                  }}
                >
                  {elem.name}
                </Box>
              </Grid>
            )
          )}
      </Grid>
    </Fragment>
  )
}
