import { Box, Grid, Typography } from '@mui/material'
import { FC, Fragment } from 'react'
import { ProductResponse } from '../../types'
import styles from './CrmCategoriesBlock.module.scss'

type Props = {
  product: ProductResponse | undefined
}

export const CrmCategoriesBlockView: FC<Props> = ({ product }) => {
  if (!product) return null
  return (
    <Fragment>
      <Typography variant="body1" fontSize={14} className={styles.body1View}>
        Категорія товару
      </Typography>
      <Box mt={1.3} className={styles.boxCategoryNameView}>
        {product.product_category.name}
      </Box>
      <Typography
        variant="body1"
        fontSize={14}
        className={styles.body1SabCategoryView}
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
        {product.sub_categories!.map(
          (elem: { name: string }, index: number) => (
            <Grid item sm={4} md={3} key={index}>
              <Box className={styles.boxCategoryNameView}>{elem.name}</Box>
            </Grid>
          )
        )}
      </Grid>
    </Fragment>
  )
}
